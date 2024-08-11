import logo from '../logo.svg';
import { motion } from "framer-motion";

function Four04() {
  return (
    <div className="absolute flex w-dvw h-dvh bg-hard flex-col items-center justify-center m-0">
      <div className="text-soft py-10 px-5 text-[11dvw] font-custom text-center"> 
        404 
      </div>
      <div className="font-sans text-[3dvw] w-max -mt-10"> You shouldn't be here lol </div>
      <a className="border-2 border-accent text-[2dvw] p-2 hover:bg-accent hover:text-hard duration-300 mt-32 md:mt-10" href="/"> Go Back to civilization </a>
    </div>
  );
}

export default Four04;
