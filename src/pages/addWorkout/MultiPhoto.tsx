import React, { useState } from 'react';
import { API_URL } from '../../config';

const PhotoUploader: React.FC = () => {
  const userToken = sessionStorage.getItem('userToken')

  const [numPhotos, setNumPhotos] = useState<number>(1);
  const [numSubs, setNumSubs] = useState<number>(8)
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);

  // TODO: add input for num subs,  test  api  call

  const handleNumPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    setNumPhotos(num);
    setSelectedPhotos([]);
  };

  const handleNumSubsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10)
    setNumSubs(num)  
  }

  const handlePhotoSelection = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selected = Array.from(files);
      setSelectedPhotos((prevSelected) => {
        // Replace the file at the corresponding index with the newly selected file
        const updatedSelected = [...prevSelected];
        updatedSelected[index] = selected[0];
        return updatedSelected;
      });
    }
  };

  const logFormData = (formData: FormData) => {
    const formDataArray = Array.from(formData.entries());
    for (const [key, value] of formDataArray) {
      console.log(`Key: ${key}, Value:`, value);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    selectedPhotos.forEach((photo, index) => {
        formData.append(`photo${index + 1}`, photo);
    });
    console.log(selectedPhotos)
    logFormData(formData)  

    try {
      // post data to API
      const url = API_URL+`/ergImage?numSubs=${numSubs}`
      const postInfo = {
          method: "POST",
          headers: {'Authorization': `Bearer ${userToken}`},
          body: formData
          }
      const response = await fetch(url, postInfo)

      if (response.ok) {
        // Handle success
        console.log('Upload successful', response.json());
      } else {
        // Handle error
        console.error('Upload failed');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };

  return (
    <div>
      <label>
        Number of Photos to Upload:
        <input
          type="number"
          min="1"
          value={numPhotos}
          onChange={handleNumPhotosChange}
        />
      </label>
      <br />
      <label>
        Number of SubWorkouts:
        <input
          type="number"
          min="1"
          value={numSubs}
          onChange={handleNumSubsChange}
        />
      </label>

      <div>
        {Array.from({ length: numPhotos }).map((_, index) => (
          <div key={index}>
            <label>Upload Photo {index + 1}:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoSelection(e, index)}
            />
            {selectedPhotos[index] && (
              <img
                src={URL.createObjectURL(selectedPhotos[index])}
                alt={`Selected Photo ${index + 1}`}
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
            )}
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PhotoUploader;
