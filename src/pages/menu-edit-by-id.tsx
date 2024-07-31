import useSWR from "swr";
import { Menu } from "../lib/models";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout";
import {
  Alert,
  Button,
  Container,
  Divider,
  NumberInput,
  TextInput,
} from "@mantine/core";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconTrash } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

export default function MenuEditById() {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const { data: menu, isLoading, error } = useSWR<Menu>(`/menu/${menuId}`);
  const [isSetInitialValues, setIsSetInitialValues] = useState(false);

  const menuEditForm = useForm({
    initialValues: {
      title: "",
      price: 1,
      image_url: "",
    },

    validate: {
      title: isNotEmpty("กรุณาระบุชื่อเมนู"),
      price: isNotEmpty("กรุณาระบุราคาของเมนู"),
      image_url: isNotEmpty("กรุณาใส่รูปภาพ"),
    },
  });

  // const handleAddCategory = () => {
  //   if (newCatagories && !catagories.includes(newCatagories)) {
  //     const addCate = { ...catagories, newCatagories };
  //     setCatagories(addCate);
  //     bookEditForm.setFieldValue("category", addCate);
  //     setNewCategory("");
  //   }
  // };

  // const handleRemoveCategory = (categoryToRemove: string) => {
  //   const updatedCategories = catagories.filter(
  //     (category) => category !== categoryToRemove
  //   );
  //   setCatagories(updatedCategories);
  //   bookEditForm.setFieldValue("category", updatedCategories);
  // };

  const handleSubmit = async (values: typeof menuEditForm.values) => {
    try {
      setIsProcessing(true);
      await axios.patch(`/menu/${menuId}`, values);
      notifications.show({
        title: "แก้ไขข้อมูลเมนูสำเร็จ",
        message: "ข้อมูลเมนูได้รับการแก้ไขเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/menu/${menuId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          notifications.show({
            title: "ไม่พบข้อมูลเมฯู",
            message: "ไม่พบข้อมูลเมนูที่ต้องการแก้ไข",
            color: "red",
          });
        } else if (error.response?.status === 422) {
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

  const handleDelete = async () => {
    try {
      setIsProcessing(true);
      await axios.delete(`/menu/${menuId}`);
      notifications.show({
        title: "ลบเมนูสำเร็จ",
        message: "ลบเมนูนี้ออกจากระบบเรียบร้อยแล้ว",
        color: "red",
      });
      navigate("/menu");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          notifications.show({
            title: "ไม่พบข้อมูลเมนู",
            message: "ไม่พบข้อมูลเมนูที่ต้องการลบ",
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

  useEffect(() => {
    if (!isSetInitialValues && menu) {
      menuEditForm.setInitialValues(menu);
      menuEditForm.setValues(menu);
      setIsSetInitialValues(true);
    }
  }, [menu, menuEditForm, isSetInitialValues]);

  return (
    <>
      <Layout>
        <Container className="mt-8">
          <h1 className="text-xl">แก้ไขเมนู</h1>

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
              <form
                onSubmit={menuEditForm.onSubmit(handleSubmit)}
                className="space-y-8"
              >
                <TextInput
                  label="ชื่อเมนู"
                  placeholder="ชื่อเมนู"
                  {...menuEditForm.getInputProps("title")}
                />

                <NumberInput
                  label="ราคาของเมนู"
                  placeholder="ราคา"
                  min={1}
                  {...menuEditForm.getInputProps("price")}
                />

                <TextInput
                  label="URL_Image"
                  placeholder="url_image"
                  {...menuEditForm.getInputProps("image_url")}
                />

                <Divider />

                <div className="flex justify-between">
                  <Button
                    color="red"
                    leftSection={<IconTrash />}
                    size="xs"
                    onClick={() => {
                      modals.openConfirmModal({
                        title: "คุณต้องการลบเมนูเล่มนี้ใช่หรือไม่",
                        children: (
                          <span className="text-xs">
                            เมื่อคุณดำนเนินการลบเมนูเล่มนี้แล้ว
                            จะไม่สามารถย้อนกลับได้
                          </span>
                        ),
                        labels: { confirm: "ลบ", cancel: "ยกเลิก" },
                        onConfirm: () => {
                          handleDelete();
                        },
                        confirmProps: {
                          color: "red",
                        },
                      });
                    }}
                  >
                    ลบเมนูนี้
                  </Button>

                  <Button
                    type="submit"
                    size="xs"
                    loading={isLoading || isProcessing}
                  >
                    บันทึกข้อมูล
                  </Button>
                </div>
              </form>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}
