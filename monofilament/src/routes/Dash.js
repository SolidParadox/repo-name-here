import logo from '../logo.svg';
import React, { useState } from 'react';

import { motion } from "framer-motion";
import InputModule from '../components/InputModule'

function Dash() {
  // Should make stuff to make this into a modifiable form
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [link, setLink] = useState('');
  const [photo, setPhoto] = useState(null);
  
  const handleNameChange = (e) => setName(e.target.value);
  const handlePublicChange = (e) => setIsPublic(e.target.checked);
  const handleLinkChange = (e) => setLink(e.target.value);
  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);
  
    const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('public', isPublic);
    formData.append('link', link);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await fetch('http://localhost:3005', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Response:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <div className="w-semi h-semi mx-semi bg-middle text-hard p-10">
      <h1> Add your photo here </h1>
       <form onSubmit={handleSubmit}>
       
        <InputModule label="Name" type="text" id="name" value={name} onChange={handleNameChange} />
        
        <InputModule label="Is Public" type="checkbox" id="public" value={isPublic} onChange={handlePublicChange} />

        <InputModule label="Author Link" type="url" id="link" value={link} onChange={handleLinkChange} />

        <InputModule label="Photo" type="file" id="photo" onChange={handlePhotoChange} />

        <button className="p-2 border-2 border-accent m-2" type="submit">Submit</button>
        
      </form>
      
    </div>
  );
}

export default Dash;
