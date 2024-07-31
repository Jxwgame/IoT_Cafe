import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-3.jpg";
import useSWR from "swr";
import { Order, Menu } from "../lib/models";
import Loading from "../components/loading";
import { Alert } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

export default function OrderPage() {
  const { data: orders, error: ordersError } = useSWR<Order[]>("/orders");
  const { data: menus, error: menusError } = useSWR<Menu[]>("/menu");

  // Handle loading states
  if (!orders || !menus) return <Loading />;
  if (ordersError || menusError)
    return (
      <Alert
        color="red"
        title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
        icon={<IconAlertTriangleFilled />}
      >
        {ordersError?.message || menusError?.message}
      </Alert>
    );

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-black-500 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
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

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-center text-black font-bold text-md">
                  <th>Order ID</th>
                  <th>Menu</th>
                  <th>Count</th>
                  <th>Total Price</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {orders.map((order) => {
                  // Find the menu associated with the order
                  const menu = menus.find((menu) => menu.title === order.menu);
                  const price = menu ? menu.price : 0;
                  const totalPrice = order.total * price;

                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.menu}</td>
                      <td>{order.total}</td>
                      <td>{totalPrice}฿</td>
                      <td>{order.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </Layout>
    </>
  );
}
