import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-3.jpg";
import useSWR from "swr";
import { Menu } from "../lib/models";
import Loading from "../components/loading";
import { Alert } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

export default function cafePage() {
  const { data: cafe, error } = useSWR<Menu[]>("/menu");

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center bg-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <h1 className="text-5xl mb-2">24/7 café</h1>
          <h2>café Order List</h2>
        </section>

        <section className="container mx-auto py-8">
          <div className="flex justify-between">
            <h1>รายการสั่งซื้อ</h1>
          </div>

          {!cafe && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}
          {!!cafe && (
            <>
              <div className="w-full"></div>
              <table className="table w-full border-collapse text-center table-xs table-pin-rows">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Count</th>
                    <th>Menu</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {cafe.map((menuItem) => (
                    <tr key={menuItem.id}>
                      <td>{menuItem.id}</td>
                      <td>{menuItem.count}</td>
                      <td>{menuItem.name}</td>
                      <td>{menuItem.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>
      </Layout>
    </>
  );
}
