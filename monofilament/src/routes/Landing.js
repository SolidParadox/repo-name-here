import { motion } from "framer-motion";

import SIV from '../components/SIV'

import Tapestry from '../components/Tapestry'
import Carpet from '../components/Carpet'

import { useState, useEffect } from 'react';

function Landing() {
  const [isAdmin, setIsAdmin] = useState( false );
  useEffect ( () => {
    fetch('http://localhost:3005/auth')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      setIsAdmin(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, [] );
  
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
          <a href="#photoAnchor" className="duration-300 mx-5 bg-accent text-sm text-center text-soft font-sans mx-auto w-max px-5 py-2 hover:px-8 hover:py-3">
            Scroll Down
          </a>
          { isAdmin && <a href="/toggle" className="duration-300 mx-5 bg-accent text-sm text-center text-soft font-sans mx-auto w-max px-5 py-2 hover:px-8 hover:py-3">
            Toggle Panel
          </a> }
          { isAdmin && <a href="/dash" className="duration-300 mx-5 bg-accent text-sm text-center text-soft font-sans mx-auto w-max px-5 py-2 hover:px-8 hover:py-3">
            New Entry
          </a> }
        </div>
      </div> 
      <div className="duration-300 snap-center snap-always my-[2dvh] mx-auto overflow-y-scroll overflow-x-hidden w-dvw lg:w-1/2 h-max min-h-semi">
          <div id="photoAnchor" className="rounded-xl bg-middle text-hard text-2xl p-2 min-h-dvh">
            <SIV> 
             <div> Here be photos </div>
            </SIV>
            <Carpet />
            <Tapestry />
          </div>
      </div>
      <div className="snap-end pb-2 m-0 p-0 w-screen mx-auto">
        <div className="mb-5 bg-soft text-hard px-10 py-2 mx-auto w-semi">
          Footer - Made by <a href="https://github.com/SolidParadox"> Paradox </a>
        </div>
      </div>
    </div>
  );
}

export default Landing;
