import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';

import { motion } from "framer-motion";
import InputModule from '../components/InputModule';
import Notice from '../components/Notice';

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
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !link) {
      setError("NAME AND LINK REQUIRED");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Photo = reader.result.split(',')[1]; // Remove the data URL prefix

      // Ensure photo is defined as a string
      if (!base64Photo) {
        setError("PHOTO MISSING");
        return;
      }

      const payload = {
        name,
        public: isPublic, // Ensure this is a boolean
        link,
        photo: base64Photo // Ensure this is a Base64 encoded string
      };

      fetch('http://localhost:3005/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            setError("NETWORK ERROR");
            return Promise.reject(new Error('Network response was not ok'));
          }
          return response.json(); // Parse JSON data from the response
        })
        .then(result => {
          // Handle successful result if needed
          console.log ("ADDITION");
          setError("ADDITION SUCCESSFUL");
        })
        .catch(error => {
          // Handle errors (e.g., network issues, JSON parsing issues)
          setError("DATABASE ERROR");
          console.error('Fetch error:', error);
        });
    };

    if (photo) {
      reader.readAsDataURL(photo); // Convert file to Base64
    } else {
      setError("PHOTO REQUIRED");
    }
  };

  return (
    <div className="relative w-semi h-semi mx-semi bg-middle text-hard p-10 overflow-scroll">
  
      <h1> Add your photo here V4 </h1>
    
      <form onSubmit={handleSubmit}>
     
      <InputModule label="Name" type="text" id="name" value={name} onChange={handleNameChange} />
      
      <InputModule label="Is Public" type="checkbox" id="public" value={isPublic} onChange={handlePublicChange} />

      <InputModule label="Author Link" type="url" id="link" value={link} onChange={handleLinkChange} />

      <InputModule label="Photo" type="file" id="photo" onChange={handlePhotoChange} />

      <button className="mx-auto p-2 border-2 border-accent m-2" type="submit">Submit</button>
        
      </form>
      
      <Notice message={error} /> 
      
    </div>
  );
}

export default Dash;
