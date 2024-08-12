import { useState, useEffect } from 'react';
import DBI from './DBI'
import SIV from './SIV'

export default function Tapestry () {
  const [photoInfo, setPhotoInfo] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`http://localhost:3005/entries`);
        if (response.ok) {
          const photoData = await response.text(); // Receive the Base64 string
          setPhotoInfo( JSON.parse ( photoData ) );
        } else {
          console.error('Error fetching photo');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchPhoto();
  }, [ ])

  return ( 
    <div className="relative w-auto h-max mx-auto bg-middle text-hard p-10 flex flex-row flex-wrap items-start">
      { photoInfo.length > 0 ? (  
        photoInfo.map ( ( data, index ) => (
          <div key={index} className="duration-300 group relative w-max min-w-64 min-h-64 rounded-sm my-10 mx-2 bg-accent">
            <SIV className="z-20 absolute text-soft -top-10 left-0 bg-hard w-3/4 text-4xl p-2">
              { data.name }
            </SIV>
            <SIV className="max-w-4/3">
              <DBI className="overflow-hidden rounded-lg" entryId={data.id} /> 
            </SIV>
            <div className="z-20 absolute -bottom-10 w-full">
              { data.link &&
              <SIV className="text-center mx-auto text-soft bg-hard text-base w-3/4 p-2">
                <a href={data.link}> { data.link } </a>
              </SIV>
              }
            </div>
            { data.description &&
            <div className="duration-300 absolute z-10 top-0 left-0 group-hover:opacity-75 opacity-0 h-full w-full text-soft bg-hard text-xl m-0 p-10">
              { data.description }
            </div>
            }
          </div>
        )) 
        ) : ( 
        <div> Loading... </div>  
        )
      }
    </div> 
  );
};
