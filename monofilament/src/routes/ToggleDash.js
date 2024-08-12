import { useState, useEffect } from 'react';
import DBI from '../components/DBI'
import Notice from '../components/Notice'

export default function ToggleDash () {
  const [photoInfo, setPhotoInfo] = useState([]);
  const [isAdmin, setIsAdmin] = useState( false );
  const [delta, setDelta] = useState ( true );

  const [msg, setMsg] = useState ( '' );

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
        if ( data ) {
          setMsg ( 'You are admin' );
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [] );
  
  const requestDeletion = id => {
    setDelta ( true );
    return fetch('http://localhost:3005/entries/' + id, {
      method: 'DELETE',
    }).then( response => { 
      setMsg ( "Deletion completed ");
      return response.json();
    }).catch ( error => {
      setMsg ( "Deletion failed" );
    }); 
  };
  
 const requestChangeVisibility = (id, newVis) => {
  fetch(`http://localhost:3005/entries/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ public: newVis })
  })
    .then(response => {
      if (!response.ok) {
        console.error('HTTP error', response.status, response.statusText);
        setMsg("Change failed");
        return Promise.reject(new Error('Network response was not ok.'));
      }
      return response.json();
    })
    .then(data => {
      setDelta(true);
      setMsg("Change completed");
      return data;
    })
    .catch(error => {
      setMsg("Change failed");
      console.error('Fetch error:', error);
      throw error
    });
};

  return ( 
    <div className="relative w-semi h-semi mx-semi bg-middle text-hard p-10 overflow-scroll">
      <div className="text-4xl"> Toggle Board </div> 
      <div className="text-sm"> Don't tell no one, aight? </div> 
      { photoInfo.length > 0 ? (  
        photoInfo.map ( ( data, index ) => (
          <div key={index} className="border-4 border-accent rounded-lg">
            <div className="text-2xl mx-auto mb-5 mt-0 pl-5 border-b-4 border-accent rounded-none bg-accent text-soft"> { data.name } </div>
            <DBI className="w-4/5 mx-auto" entryId={data.id} /> 
            <div className="text-base"> { data.link } </div>
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
      <Notice message={msg} />
    </div> 
  );
};
