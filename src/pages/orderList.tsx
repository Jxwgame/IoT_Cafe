import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-1.jpg";
import useSWR from "swr";
import { Order } from "../lib/models";
import Loading from "../components/loading";
import { Alert } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
// import { Link } from "react-router-dom";

export default function orderPage() {
  const { data: order, error } = useSWR<Order[]>("/orders");

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <h1 className="text-5xl mb-2">24/7 café</h1>
          <h2>café for cool man</h2>
        </section>

        <section className="container mx-auto py-8">
          <div className="flex justify-between">
            <h1>รายการคำสั่งซื้อ</h1>
          </div>

          {!order && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          <div className="overflow-x-auto">
            {order?.map((orders) => (
              <table className="table w-full flex justify-center align-center">
                <thead>
                  <tr className="text-center">
                    <th>Order ID</th>
                    <th>Menu</th>
                    <th>Count</th>
                    <th>Total Price</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <th>{orders.id}</th>
                    <td>{orders.menu}</td>
                    <td>{orders.total}</td>
                    <td>{orders.total}</td>
                    <td>{orders.note}</td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
