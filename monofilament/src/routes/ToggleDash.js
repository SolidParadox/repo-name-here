import { useState, useEffect } from 'react';
import DBI from '../components/DBI'

export default function ToggleDash () {
  const [photoInfo, setPhotoInfo] = useState([]);
  const [isAdmin, setIsAdmin] = useState( false );
  const [delta, setDelta] = useState ( true );

  useEffect(() => {
    if ( delta == false ) return;
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
    setDelta ( false );
    fetchPhoto();
  }, [ delta ])
  
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
  
  const requestDeletion = id => {
    setDelta ( true );
    return fetch('http://localhost:3005/entries/' + id, {
      method: 'DELETE',
    }).then(response => response.json())
  };
  
  const requestChangeVisibility = async (id, newVis) => {

    try {
      const response = await fetch(`http://localhost:3005/entries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ public: newVis })
      });

      // Check if the response status is OK
      if (!response.ok) {
        // Log or handle non-200 responses
        console.error('HTTP error', response.status, response.statusText);
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setDelta ( true );
      return data;
    } catch (error) {
      // Handle errors (e.g., network issues, JSON parsing issues)
      console.error('Fetch error:', error);
      throw error;
    }
  };

  return ( 
    <div className="relative w-semi h-semi mx-semi bg-middle text-hard p-10 overflow-scroll">
      { photoInfo.length > 0 ? (  
        photoInfo.map ( ( data, index ) => (
          <div key={index} className="">
            { data.name }
            <DBI entryId={data.id} /> 
            { isAdmin &&
            <div>
              <button onClick={ () => { requestDeletion ( data.id ); } }> DELETE </button>
              <button onClick={ () => { requestChangeVisibility ( data.id, !data.public ); } }> SWITCH TO : { data.public ? "PRIVATE" : "PUBLIC" } </button>
            </div> }
          </div>
        )) 
        ) : ( 
        <div> Loading... </div>  
        )
      }
    </div> 
  );
};
