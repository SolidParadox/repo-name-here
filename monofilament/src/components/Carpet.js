import { useState, useEffect } from 'react';
import DBI from './DBI'
import SIV from './SIV'

export default function Carpet () {
  const [photoInfo, setPhotoInfo] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`http://localhost:3005/entries`);
        if (response.ok) {
          const photoData = await response.text(); // Receive the Base64 string
          setPhotoInfo( JSON.parse ( photoData ) );
        } else {
          console.error('Error fetching photo data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchPhoto();
  }, [ ])

  return ( 
      <div className="relative w-auto h-max mx-auto bg-middle text-hard p-10">
      { photoInfo.length > 0 ? (  
        photoInfo.map ( ( data, index ) => (
          <div key={index} className="relative h-fit min-h-32 w-full rounded-sm my-2 mx-auto flex flex-row items-center justify-center">
            <div className="duration-300 w-1/5 rounded-lg hover:w-2/5 m-0 p-0">
              <SIV className="hover:z-[50] m-0 p-0">
                <DBI className="m-0 p-0" entryId={data.id} /> 
              </SIV>
            </div>
            <SIV className="z-20 text-hard grow text-xl">
              <div className="p-2"> { data.name } </div>
              <hr className="my-2 bg-accent" />
              <a className="text-center mx-auto text-base p-2" href={data.link}> { data.link } </a>
            </SIV>
          </div>
        )) 
        ) : ( 
        <div> Loading... </div>  
        )
      }
    </div> 
  );
};
