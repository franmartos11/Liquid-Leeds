import Image from "next/image";
import Footer from "./Components/Footer/Footer";
import Nav from "./Components/Nav/Nav";
import Form from "./Components/Form/Form";

export default function Home() {
  return (
    <div>
      <Nav></Nav>
      
      <div className=" flex align-middle justify-center">
        <p>home</p>
        <div className="m-[4rem]">

        
        <Form service={"test"}></Form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
