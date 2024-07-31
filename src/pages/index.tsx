import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/maxresdefault.jpg";

export default function HomePage() {
  return (
    <Layout>
      <section
        className="h-[900px] w-full text-white bg-cover bg-zinc-500 bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">ยินดีต้อนรับสู่ 1O8 Library & Cafe</h1>
        <h2>ร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน</h2>
      </section>

      <section className="container mx-auto py-8 mb-8">
        <h1>เกี่ยวกับเรา</h1>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-left col-span-2">
            เจ้าของร้าน 24/7 Library & Cafe
            ซึ่งเป็นสถานที่ที่ผมสร้างขึ้นมาเพื่อตอบสนองความรักในการดื่มกาแฟและการอ่านหนังสือของผมเอง
            ตั้งแต่วัยเด็ก ผมชอบใช้เวลาว่างในการอ่านหนังสือหลากหลายประเภท
            และมักจะหาที่เงียบๆ 24/7 Library & Cafe ไม่ได้เป็นเพียงแค่ร้านกาแฟ
            แต่เป็นพื้นที่สำหรับการเรียนรู้ การพักผ่อน และการสร้างสรรค์สิ่งใหม่ๆ
            ผมตั้งใจที่จะให้ลูกค้าทุกคนรู้สึกเหมือนอยู่บ้าน
            มีความสะดวกสบายและผ่อนคลายเมื่อมาที่นี่ เรามีหนังสือหลากหลายประเภท
            ทั้งนิยาย วรรณกรรม หนังสือเกี่ยวกับการพัฒนาตนเอง และวารสารต่างๆ
            ที่คัดสรรมาอย่างดี
          </p>

          <div>
            <img
              src="https://i.makeagif.com/media/2-27-2021/qAQTLI.gif"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <p className="text-right mt-8 mx-8">
          ปัจจุบันค่าเฟ่อยู่ในช่วงการดูแลของ นายธีรภัทร์ สังข์สี 65070108
        </p>
      </section>

      <section className="container mx-auto py-8 mb-24">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <img
              src="https://i.pinimg.com/originals/8a/c0/64/8ac0643083af56becf469929d8a7df72.gif"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="col-span-1">
            <h1 className="text-3xl text-center mb-4">24/7 Library & Cafe</h1>
            <p>
              ตั้งอยู่ในทำเลที่ดีเยี่ยม ให้บรรยากาศที่อบอุ่นและเป็นกันเอง
              การตกแต่งภายในร้านเน้นใช้วัสดุธรรมชาติ ไม้และหิน
              เพิ่มความรู้สึกผ่อนคลายและใกล้ชิดกับธรรมชาติ ชุมชนเมือง
              มีที่นั่งหลากหลายแบบทั้งในร่มและกลางแจ้ง
              ให้ลูกค้าได้เลือกนั่งตามความสะดวก
              <h2 className="mt-2 text-center">เมนูเครื่องดื่ม</h2>
              ร้านของเรามีเมนูกาแฟหลากหลาย
              ตั้งแต่กาแฟดำรสเข้มไปจนถึงลาเต้และคาปูชิโน่ที่หอมมัน
              นอกจากนี้ยังมีเครื่องดื่มอื่นๆ เช่น ชาเขียวมัทฉะ โกโก้
              และชาผลไม้สดชื่น สำหรับคนที่ไม่ดื่มกาแฟ
              เรายังมีสมูทตี้และน้ำผลไม้สดให้เลือกด้วย
              <h2 className="mt-2 text-center">มุมหนังสือ</h2>
              ร้านของเรามีมุมหนังสือที่จัดเตรียมไว้สำหรับคนรักการอ่าน
              คุณสามารถเลือกหนังสือที่หลากหลายได้ตั้งแต่นิยาย
              หนังสือเกี่ยวกับการพัฒนาตนเอง ไปจนถึงวารสารและนิตยสารต่างๆ
              มุมนี้เป็นพื้นที่ที่เหมาะสำหรับการผ่อนคลาย อ่านหนังสือ
              พร้อมกับจิบกาแฟหอมๆ
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
