import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import {
  Button,
  Container,
  Divider,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Menu } from "../lib/models";

export default function MenuCreatePage() {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const menuCreateForm = useForm({
    initialValues: {
      title: "",
      price: 0,
    },

    validate: {
      title: isNotEmpty("กรุณาระบุชื่อเมนู"),
      price: isNotEmpty("กรุณาระบุราคาของเมนู"),
    },
  });

  // const handleAddCategory = () => {
  //   const updatedCat = [...catagories, newCatagories];
  //   setCatagories(updatedCat);
  //   bookCreateForm.setFieldValue("category", updatedCat);
  //   setNewCategory("");
  // };

  const handleSubmit = async (values: typeof menuCreateForm.values) => {
    try {
      setIsProcessing(true);
      const response = await axios.post<Menu>(`/menu`, values);
      notifications.show({
        title: "เพิ่มข้อมูลเมนูสำเร็จ",
        message: "ข้อมูลเมนูได้รับการเพิ่มเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/menu/${response.data.id}`);
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
        <Container className="mt-8">
          <h1 className="text-xl">เพิ่มเมนูในระบบ</h1>

          <form
            onSubmit={menuCreateForm.onSubmit(handleSubmit)}
            className="space-y-8"
          >
            <TextInput
              label="ชื่อเมนู"
              placeholder="ชื่อเมนู"
              {...menuCreateForm.getInputProps("title")}
            />

            <NumberInput
              label="ราคาของเมนู"
              placeholder="ราคา"
              min={1}
              {...menuCreateForm.getInputProps("price")}
            />

            <Textarea
              label="URL_Image"
              placeholder="url_image"
              {...menuCreateForm.getInputProps("image")}
            />

            <Divider />

            <Button type="submit" loading={isProcessing}>
              เพิ่มรายการ
            </Button>
          </form>
        </Container>
      </Layout>
    </>
  );
}
