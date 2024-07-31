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

      <section className="container mx-auto py-8 mb-16">
        <h1>เกี่ยวกับเรา</h1>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-left col-span-2">
            IoT Library & Cafe เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน
            และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเทคโนโลยี IoT โดยคาเฟ่ของเรานั้น
            ก่อตั้งขึ้นโดย ผศ.ดร. ปานวิทย์ ธุวะนุติ ซึ่งเป็นอาจารย์ในวิชา
            Internet of Things และนายกฤตณัฏฐ์ ศิริพรนพคุณ เป็นผู้ช่วยสอนในหัวข้อ
            FastAPI และ React ในวิชานี้
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
        การเปิดร้านกาแฟ เป็นหนึ่งในธุรกิจยอดฮิตที่คนรุ่นใหม่ปรารถนาจะเป็นเจ้าของแต่ตราบใดที่ยังไม่เข้ามาสู่ธุรกิจนี้ ตราบนั้นสิ่งที่ฟังดูโก้เก๋หรือโรแมนติกดี ก็ยังคงเป็นอย่างนั้น
        จนกว่าคุณจะได้ก้าวเข้ามาสัมผัสจริง เนื่องจากมีข้อมูลหลายอย่างต้องศึกษาอย่างรอบคอบก่อนการตัดสินใจ
        มิฉะนั้นต่อให้เป็นเพียงร้านกาแฟร้านเล็กๆ ก็สามารถล้มเหลวไม่เป็นท่าได้..คาเฟ่ในตัวเมืองเลย
        ที่เมื่อได้มาสัมผัสแล้ว จะไม่ได้มีเรื่องเล่าแค่เรื่องกาแฟอย่างแน่นอน 😍 รูปรสกลิ่น 😀รสไม่หวาน ไม่ติดเลี่ยน รสมือกำลังดีเลยจ้ะ
        เฮลเซนัทลาเต้ : หอมเบาๆ รสเข้มพอสำหรับคออ่อนกาแฟล่ะ ชาเขียว : ยังไม่ค่อยหอมชา แต่รสชาพอได้ หนักนมนำชานะ บวชเผือกฯ : หวานละมุน
        เนื้อสัมผัสดี ไม่เลี่ยน ทานเพลินจ้ะ ความคุ้มค่า 💸 ~ ราคาไม่โหดร้าย คุ้มค่ากับคุณภาพ และ ความเป็นธรรมชาติโดยรอบตัวร้าน
        ซึ่งสัตว์เลี้ยงของร้าน ไม่ได้ มีแค่เต่าตัวบิ๊กเบิ้มเท่านั้นนะ ข้างในมีทั้งกระต่าย, อิกัวนา, ไก่, แพะ, แกะ
        และอีกมากมาย <br />
        อ้างอิง : 
        https://www.wongnai.com/reviews
      </p>
    </div>
  </div>
</section>
    </Layout>
  );
}
