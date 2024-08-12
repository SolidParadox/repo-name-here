import React, { useState, useEffect } from 'react';
import InputModule from '../components/InputModule';
import Notice from '../components/Notice';

function Dash() {
  // Should make stuff to make this into a modifiable form
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [link, setLink] = useState('');
  const [photo, setPhoto] = useState(null);
  
  const [error, setError] = useState ('');
  
  const [target, setTarget] = useState('');
  const [patch, setPatch] = useState(false);
  
  const [availableIds, setAvailableIds] = useState(["NEW"]);
  
  const handleNameChange = (e) => { setError ( '' ); setName(e.target.value); }
  const handleDescChange = (e) => { setError ( '' ); setDesc(e.target.value); }
  const handlePublicChange = (e) => { setError ( '' ); setIsPublic(e.target.checked); }
  const handleLinkChange = (e) => { setError ( '' ); setLink(e.target.value); }
  const handlePhotoChange = (e) => { setError ( '' ); setPhoto(e.target.files[0]); }
  
  const handleTargetChange = (e) => { setError ( '' ); setTarget(e.target.value); }
  
  useEffect(() => {
    if ( error === '' ) {
      return;
    }
    const timeoutId = setTimeout(() => {
      setError ( '' );
    }, 3000 );
    return () => { clearTimeout(timeoutId); }
  }, [ error ]);

  useEffect( () => {
    fetch('http://localhost:3005/entries')
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error('Network response was not ok'));
        }
        return response.json();
      })
      .then(result => {
        var worm = [ "NEW" ];
        for ( var i in result ) {
          worm.push ( result[ i ].id );
        }
        setAvailableIds ( worm );
      });
  }, [] );

  useEffect( () => {
      if ( !target ) return;
      if ( target === "NEW" ) { 
        setPatch ( false ); 
        
        setName ( "" );
        setDesc ( "" );
        setIsPublic ( false );
        setLink ( "" );
        setPhoto ( null );        
        return; 
      }
      fetch('http://localhost:3005/entries/' + target)
      .then(response => {
        if (!response.ok) {
          setError("NO SUCH ENTRY");
          setPatch ( false );
          return Promise.reject(new Error('Network response was not ok'));
        }
        return response.json(); // Parse JSON data from the response
      })
      .then(result => {
        setPatch( true );

        setError("ENTRY EXISTS");
        setName ( result.name );
        setDesc ( result.description );
        setIsPublic ( result.public );
        setLink ( result.link );
        setPhoto ( null );
      });
  }, [target] );
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setError("NAME REQUIRED");
      return;
    }

    const reader = new FileReader();
    
    const submitFunction = base64Photo => {
      const payload = {
        name,
        description: desc,
        public: isPublic, // Ensure this is a boolean
        link,
        photo: base64Photo // Ensure this is a Base64 encoded string
      };
      
      const fetchUrl = 'http://localhost:3005/entries' + ( patch ? "/" + target : "" );
      
      console.log ( target + " <- TARGET -> " + fetchUrl ); 
      
      fetch( fetchUrl, {
        method: patch ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          console.log ( "RES -> " + JSON.stringify ( response ) );
          setError("NETWORK ERROR");
          return Promise.reject(new Error('Network response was not ok'));
        }
        return response.json(); // Parse JSON data from the response
      })
      .then(result => {
        // Handle successful result if needed
        setError( ( patch ? 'PATCH ' : 'ADDITION ' ) + " SUCCESSFUL");
        setTarget ( "NEW" );
      })
      .catch(error => {
        // Handle errors (e.g., network issues, JSON parsing issues)
        setError("DATABASE ERROR");
      });
    }
    
    reader.onloadend = () => {
      const base64Photo = reader.result.split(',')[1]; // Remove the data URL prefix

      if (!base64Photo) {
        setError("PHOTO MISSING");
        return;
      }
      
      submitFunction ( base64Photo );

    };

    if (photo) {
      reader.readAsDataURL(photo); // Convert file to Base64
    } else {
      if ( patch ) {
        submitFunction ( '' );
      }
      setError("PHOTO REQUIRED");
    }
  };

  return (
    <div className="relative w-semi h-semi mx-semi bg-middle text-hard p-10 overflow-scroll">
      
      <h1 className="text-8xl mb-20"> { patch ? "Update entry " + target : "New entry form" } </h1>
      
      <div className="relative w-full bg-soft p-2 border-2 border-accent pt-8 pb-2 mt-5">
        <label htmlFor="target">Target Id</label>
        <select id="target" value={target} onChange={handleTargetChange}>
          {availableIds.map(id => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      
      <form onSubmit={handleSubmit}>
     
        <InputModule label="Name" type="text" id="name" value={name} onChange={handleNameChange} />
        
        <InputModule label="Is Public" type="checkbox" id="public" value={isPublic} onChange={handlePublicChange} />

        <InputModule label="Author Link" type="url" id="link" value={link} onChange={handleLinkChange} />

        <InputModule label="Photo" type="file" id="photo" onChange={handlePhotoChange} />
        
        <div className="relative w-full bg-soft p-2 border-2 border-accent pt-8 pb-2 mt-5">
          <label className="absolute -top-2 bg-hard text-soft rounded-lg pl-2 pr-10 py-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={desc}
            onChange={handleDescChange}
            rows="4"  
            cols="50"
          />
        </div>

        <button className="mx-auto p-2 border-2 border-accent m-2" type="submit">Submit</button>
        
      </form>
      
      <Notice message={error} /> 
      
    </div>
  );
}

export default Dash;
