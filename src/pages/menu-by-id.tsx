import { Alert, Button, Container, Divider, TextInput } from "@mantine/core";
import Layout from "../components/layout";
import { Link, useParams } from "react-router-dom";
import { Menu } from "../lib/modelsCafe";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconPackage } from "@tabler/icons-react";
import { useState } from "react";

export default function MenuById() {
  const { menuId } = useParams();
  const [numberValue, setNumberValue] = useState(0);
  const [note, setNote] = useState("");

  const { data: cafe, isLoading, error } = useSWR<Menu>(`/menu/${menuId}`);

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.currentTarget.value);
    setNumberValue(newValue);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setNote(newValue);
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

          {!!cafe && (
            <>
              <h1>{cafe.name}</h1>
              {/* <p className="italic text-neutral-500 mb-4">โดย {cafe.author}</p> */}
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <img
                  src="https://placehold.co/150x200"
                  alt={cafe.name}
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="col-span-2 px-4 space-y-2 py-4">
                  <h3>รายละเอียดเมนู</h3>
                  <p className="indent-4">{cafe.detail}</p>

                  <h3>ราคา</h3>
                  <p className="indent-4">
                    {/* TODO: เพิ่มเรื่องย่อ */}
                    {cafe.price}
                  </p>

                  {/* TODO: เพิ่มหมวดหมู่(s) */}
                  <div className="flex flex-wrap gap-2">
                    <h3>จำนวน</h3>
                    <TextInput
                      value={numberValue}
                      onChange={handleNumberChange}
                      placeholder="จำนวน"
                      required
                      type="number"
                    />
                  </div>

                  <h3>หมายเหตุ</h3>
                  <p className="indent-4">
                    <TextInput
                      value={note}
                      onChange={handleNoteChange}
                      placeholder="หวานน้อย"
                    />
                  </p>
                </div>
              </div>

              <Divider className="mt-4" />

              <Button
                color="orange"
                size="xs"
                component={Link}
                to={`/menu/${
                  cafe.id
                }/edit?count=${numberValue}&note=${encodeURIComponent(note)}`}
                className="mt-4"
                leftSection={<IconPackage />}
              >
                สั่งซื้อ
              </Button>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}
