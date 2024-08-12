import { useState, useEffect } from 'react';
import { useAnimate } from "framer-motion"

export default function Notice ( { message } ) {
  const [state, setState] = useState ( false );
  const [scope, animate] = useAnimate();
  
  useEffect(() => {
    if ( !message ) {
      setState ( false );
      return;
    } else {
      setState ( true );
    }
  
    const timeoutId = setTimeout(() => {
      setState ( false );
    }, 3000 );

    return () => { setState ( false ); clearTimeout(timeoutId); }
  }, [ message ]);
  
  useEffect(() => {
    if ( state ) {
      animate ( scope.current, { y: 0, opacity: 1 }, { duration: 0.25 } );
    } else {
      animate ( scope.current, { y: 500, opacity: 0 }, { duration: 2 } );    
    }
  }, [ state ]);
  
  return ( 
    <div className="fixed bottom-8 left-0 w-dvw w-screen h-max m-0 p-0"> 
      <div ref={scope} className="border-0 opacity-0 w-max min-w-1/4 bg-hard text-soft text-xl flex mx-auto flex-col items-center justify-center p-2">
        { message }
      </div>
    </div> 
  );
};
