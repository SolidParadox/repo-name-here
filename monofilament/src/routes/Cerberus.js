import React, { useState } from 'react';

import InputModule from '../components/InputModule';
import Notice from '../components/Notice';

function Cerberus() {
  const [key, setKey] = useState('');
  const [status, setStatus] = useState('');

  const handleChange = (e) => setKey(e.target.value);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    fetch('http://localhost:3005/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({apiKey:key})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        setStatus ( result ? "Sacrifice accepted" : "Begone, mortal" );
      })
      .catch(() => {
        setStatus ( "EEEEK, Error" );
      });
  };
  
  return (
    <div className="absolute flex w-dvw h-dvh bg-hard flex-col items-center justify-center m-0">
      <div className="text-soft py-10 px-5 text-[11dvw] font-custom text-center"> 
        API SACRIFICE
      </div>
      <form onSubmit={handleSubmit} className="w-max flex flex-col items-center justify-center">
        <InputModule label="API SACRIFICE" type="password" id="key" value={key} onChange={handleChange} />
        <button className="relative p-2 border-2 border-accent m-2" type="submit">Please the gods</button>
      </form>
      <button className={`duration-300 ${ status === '' ? 'opacity-0' : 'opacity-1' }`} onClick={ () => { window.location.href = "http://localhost:3005";  } }> Home </button>
      <Notice message={status} /> 
    </div>
  );
}

export default Cerberus;



  //~ <motion.div
    //~ className={className}
    //~ initial={{ y: 20, opacity: 0 }}
    //~ whileInView={{ y: 0, opacity: 1 }} 
    //~ transition={{duration: 1, type: "spring" }}
    //~ viewport={{ once: true }}
  //~ >
    //~ {children}
  //~ </motion.div>
