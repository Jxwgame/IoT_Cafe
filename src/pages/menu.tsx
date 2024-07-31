import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/coffee-bg.jpg";
import useSWR from "swr";
import { Menu } from "../lib/models";
import Loading from "../components/loading";
import { Alert, Button } from "@mantine/core";
import { IconAlertTriangleFilled, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function menuPage() {
  const { data: menu, error } = useSWR<Menu[]>("/menu");

  return (
    <>
      <Layout>
        <section
          className="h-[800px] w-full text-white bg-cover bg-zinc-500 bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <h1 className="text-5xl mb-2">1O8 café</h1>
          <h2>café for cool man</h2>
        </section>

        <section className="container mx-auto py-8">
          <div className="flex justify-between">
            <h1>รายการเครื่องดื่ม</h1>

            <Button
              component={Link}
              leftSection={<IconPlus />}
              to="/menu/create"
              size="xs"
              variant="primary"
              className="flex items-center space-x-2"
            >
              เพิ่มเมนู
            </Button>
          </div>

          {!menu && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {menu?.map((menus) => (
              <div
                className="border border-solid border-neutral-200"
                key={menus.id}
              >
                <img
                  src={menus.image_url}
                  alt={menus.title}
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {menus.title}
                  </h2>
                  <p className="text-xs text-neutral-500">
                    ราคา {menus.price}฿
                  </p>
                </div>

                <div className="flex justify-end px-4 pb-2">
                  <Button
                    component={Link}
                    to={`/menu/${menus.id}`}
                    size="xs"
                    variant="default"
                  >
                    ดูรายละเอียด
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
