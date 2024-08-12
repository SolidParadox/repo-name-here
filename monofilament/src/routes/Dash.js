import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';

import { motion } from "framer-motion";
import InputModule from '../components/InputModule'

function Dash() {
  // Should make stuff to make this into a modifiable form
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [link, setLink] = useState('');
  const [photo, setPhoto] = useState(null);
  
  const [error, setError] = useState ('');
  
  const handleNameChange = (e) => { setError ( '' ); setName(e.target.value); }
  const handlePublicChange = (e) => { setError ( '' ); setIsPublic(e.target.checked); }
  const handleLinkChange = (e) => { setError ( '' ); setLink(e.target.value); }
  const handlePhotoChange = (e) => { setError ( '' ); setPhoto(e.target.files[0]); }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !link) {
      setError ( "NAME AND LINK REQUIRED");
      return;
    }
    
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Photo = reader.result.split(',')[1]; // Remove the data URL prefix

      // Ensure photo is defined as a string
      if (!base64Photo) {
        setError ( "PHOTO MISSING");
        return;
      }

      const payload = {
        name,
        public: isPublic, // Ensure this is a boolean
        link,
        photo: base64Photo // Ensure this is a Base64 encoded string
      };

      try {
        const response = await fetch('http://localhost:3005/entries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          setError ( "NETWORK ERROR");
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
      } catch (error) {
        setError ( "DATABASE ERROR");
      }
    };

    if (photo) {
      reader.readAsDataURL(photo); // Convert file to Base64
    } else {
        setError ( "PHOTO REQUIRED" );      
    }
  };

  return (
    <div className="relative w-semi h-semi mx-semi bg-middle text-hard p-10 overflow-hidden">
  
      <div className={`absolute left-0 m-0 w-dvw h-32 duration-300 ${ error == '' ? '-bottom-32 opacity-0' : 'bottom-0 opacity-1' }`}>
        <div className="mx-auto w-1/2 text-center text-xl h-16 bg-red-600 border-2 border-black rounded-lg"> {error} </div>
      </div>
          
      <h1> Add your photo here V4 </h1>
    
      <form onSubmit={handleSubmit}>
     
      <InputModule label="Name" type="text" id="name" value={name} onChange={handleNameChange} />
      
      <InputModule label="Is Public" type="checkbox" id="public" value={isPublic} onChange={handlePublicChange} />

      <InputModule label="Author Link" type="url" id="link" value={link} onChange={handleLinkChange} />

      <InputModule label="Photo" type="file" id="photo" onChange={handlePhotoChange} />

      <button className="mx-auto p-2 border-2 border-accent m-2" type="submit">Submit</button>
        
      </form>
      
    </div>
  );
}

export default Dash;
