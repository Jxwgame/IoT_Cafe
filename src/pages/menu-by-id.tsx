import { Alert, Button, Container, Divider } from "@mantine/core";
import Layout from "../components/layout";
import { useParams } from "react-router-dom";
import { Menu } from "../lib/models";
import { Order } from "../lib/models";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconBasket } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

export default function MenuByIdPage() {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const orderCreateForm = useForm({
    initialValues: {
      count: 1,
      note: "-",
    },

    validate: {
      count: isNotEmpty("กรุณาระบุจำนวน"),
    },
  });

  const { data: menu, isLoading, error } = useSWR<Menu>(`/menu/${menuId}`);

  const handleClick = () => {
    const modal = document.getElementById("my_modal_4") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleSubmit = async (values: typeof orderCreateForm.values) => {
    try {
      setIsProcessing(true);
      const response = await axios.post<Order>(`/order`, values);
      notifications.show({
        title: "สั่งซื้อสำเร็จ",
        message: "สั่งซื้อเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/order/${response.data.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          notifications.show({
            title: "ข้อมูลไม่ถูกต้อง",
            message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาดบางอย่าง",
          message:
            "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Layout>
        <Container className="mt-4">
          {/* You can use isLoading instead of !book */}
          {isLoading && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          {!!menu && (
            <>
              <h1>{menu.title}</h1>
              {/* <p className="italic text-neutral-500 mb-4">โดย {menu.author}</p> */}
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <img
                  src="https://placehold.co/150x200"
                  alt={menu.title}
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="col-span-2 px-4 space-y-2 py-4">
                  <h1>{menu.title}</h1>
                  <p className="indent-4">
                    {/* TODO: เพิ่มรายละเอียดหนังสือ */}
                  </p>

                  <h3>ราคาเมนู</h3>
                  <p className="indent-4">
                    {/* TODO: เพิ่มเรื่องย่อ */}
                    {menu.price}฿
                  </p>
                </div>
              </div>

              <Divider className="mt-4" />

              <Button
                color="blue"
                size="md"
                onClick={handleClick}
                className="mt-4"
                leftSection={<IconBasket />}
              >
                ทำการสั่งซื้อ
              </Button>
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                  <h3 className="font-bold text-lg">แบบฟอร์มสั่งซื้อ</h3>
                  <form
                    onSubmit={orderCreateForm.onSubmit(handleSubmit)}
                    className="flex justify-center align-center"
                  >
                    <div className="mb-4">
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text text-xl">{menu.title}</span>
                      </div>
                      {/* <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        /> */}
                      <div className="label"></div>
                    </label>
                    </div>

                    <div className="mb-4">
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">จำนวน</span>
                        </div>
                        <input
                          {...orderCreateForm.getInputProps("count")}
                          type="number"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                          />
                        <div className="label"></div>
                      </label>
                      </div>

                    <div className="mb-6">
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">หมายเหตุ</span>
                        </div>
                        <input
                          {...orderCreateForm.getInputProps("note")}
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                          />
                        <div className="label"></div>
                      </label>
                    </div>
                  </form>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn btn-xs">Close</button>
                      <Button type="submit" loading={isProcessing} size="xs">
                        Submit
                      </Button>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}
