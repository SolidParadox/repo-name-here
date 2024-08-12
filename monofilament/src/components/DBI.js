import { useState, useEffect } from 'react';

const DBI = ({ entryId, className }) => {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`http://localhost:3005/entries/${entryId}/photo`);
        if (response.ok) {
          const photoData = await response.text(); // Receive the Base64 string
          setPhotoUrl(photoData);
        } else {
          console.error('Error fetching photo');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPhoto();
  }, [entryId]);

  return (
    <div className={className}>
      {photoUrl && <img src={photoUrl} alt="Photo" />} {/* Use the Base64 data URL */}
      {!photoUrl && <div className> Loading... </div>} {/* Use the Base64 data URL */}
    </div>
  );
};

export default DBI;
