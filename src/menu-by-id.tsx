import { Alert, Button, Container, Divider, TextInput } from "@mantine/core";
import Layout from "../components/layout";
import { Link, useParams } from "react-router-dom";
import { Menu } from "../lib/models";
import { Order } from "../lib/models";
import useSWR from "swr";
import Loading from "../components/loading";
import {
  IconAlertTriangleFilled,
  IconBasket,
  IconEdit,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

export default function MenuByIdPage() {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const orderCreateForm = useForm({
    initialValues: {
      menu: "",
      count: 1,
      note: "",
    },

    validate: {
      count: isNotEmpty("กรุณาระบุจำนวน"),
    },
  });

  const { data: menu, isLoading, error } = useSWR<Menu>(`/menu/${menuId}`);

  useEffect(() => {
    if (menu) {
      orderCreateForm.setFieldValue("menu", menu.title);
    }
  }, [menu, orderCreateForm]);

  const handleClick = () => {
    const modal = document.getElementById("my_modal_4") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleSubmit = async (values: typeof orderCreateForm.values) => {
    try {
      setIsProcessing(true);
      const response = await axios.post<Order>(`/orders`, values);
      notifications.show({
        title: "สั่งซื้อสำเร็จ",
        message: "สั่งซื้อเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/orders/${response.data.id}`);
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
      navigate(`/menu`);
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
                  src={menu.image_url}
                  alt={menu.title}
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="col-span-2 px-4 space-y-2 py-4">
                  <h1>{menu.title}</h1>
                  <p className="indent-4"></p>

                  <h3>ราคาเมนู </h3>
                  <span className="indent-4 text-3xl text-red">
                    {menu.price}฿
                  </span>
                </div>
              </div>

              <Divider className="mt-4" />

              <Button
                color="orange"
                size="md"
                component={Link}
                to={`/menu/${menu.id}/edit`}
                className="mt-4 mx-4"
                leftSection={<IconEdit />}
              >
                แก้ไขเมนู
              </Button>
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
                <div className="modal-box w-11/12 max-w-xl flex flex-col items-center justify-center">
                  <h3 className="font-bold text-xl mb-4">แบบฟอร์มสั่งซื้อ</h3>
                  <form
                    onSubmit={orderCreateForm.onSubmit(handleSubmit)}
                    className="flex flex-col gap-4 items-center justify-center"
                  >
                    <div className="mb-4">
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">เมนูการสั่งซื้อ</span>
                        </div>
                        <TextInput
                          type="text"
                          placeholder=""
                          className="input input-bordered w-full max-w-xs"
                          {...orderCreateForm.getInputProps("menu")}
                          value={menu.title}
                          readOnly
                        />
                        <div className="label"></div>
                      </label>
                    </div>

                    <div className="mb-4">
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">จำนวน</span>
                        </div>
                        <TextInput
                          {...orderCreateForm.getInputProps("total")}
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
                        <TextInput
                          {...orderCreateForm.getInputProps("note")}
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                        <div className="label"></div>
                      </label>
                    </div>

                    <div className="modal-action flex gap-2">
                      <form method="dialog" className="flex-grow">
                        <button className="btn btn-sm">Close</button>
                      </form>
                      <Button type="submit" loading={isProcessing} size="xs">
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              </dialog>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}
