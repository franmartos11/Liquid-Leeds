import Image from "next/image";
import Footer from "./Components/Footer/Footer";
import Nav from "./Components/Nav/Nav";
import Form from "./Components/Form/Form";
import FormStepper from "./Components/Form/FormStepper";

export default function Home() {
    return (
        <div>
            <Nav></Nav>

            <div className=" bg-white flex align-middle justify-center">
                
                <div className="m-[4rem]">
                    <FormStepper></FormStepper>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
