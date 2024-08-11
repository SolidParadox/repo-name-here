import logo from './logo.svg';
import './globals.css';
import { motion } from "framer-motion";

import ImageCard from './components/ImageCard'
import SIV from './components/SIV'

function App() {
  return (
    <div className="m-0 flex-col content-stretch no-scrollbar snap-y snap-mandatory overflow-scroll w-dvw h-dvh">
      <div className="duration-300 relative snap-center w-semi h-[20dvw] md:h-full mx-semi text-soft py-10 px-0 text-[11dvw] font-custom">
        <div className="my-2 md:my-20 w-1/2 leading-[10dvw]">
          <motion.div
            initial = {{ y:200, opacity: 0.2,  color:"#000000" }}
            animate = {{ y:0,  opacity: 1, color:"#FFFFFF" }}  
            whileInView = {{ y:-50 }}
            transition={{duration: 0.5, type: "spring", stiffness: 200 }}
          >
         EL PORTOFOLIO 
          </motion.div>
        </div>
        <div className="absolute hidden md:inline bottom-2 left-0 w-full py-2 mx-auto">
          <div className="bg-accent text-sm text-center text-soft font-sans mx-auto w-max px-5 py-2">
            Scroll Down
          </div>
        </div>
      </div> 
      <div className="duration-300 snap-center snap-always my-[2dvh] mx-auto overflow-y-scroll w-dvw lg:w-1/2 h-semi min-h-semi">
          <div className="rounded-xl bg-middle text-hard text-2xl p-2 min-h-dvh">
            <SIV> 
             <div> Here be photos </div>
            </SIV>
          </div>
      </div>
      <div className="snap-end mx-semi p-0 w-semi">
        <div className="mb-5 bg-soft text-hard px-10 py-2 w-semi">
          Footer - Made by <a href="https://github.com/SolidParadox"> Paradox </a>
        </div>
      </div>
    </div>
  );
}

export default App;
