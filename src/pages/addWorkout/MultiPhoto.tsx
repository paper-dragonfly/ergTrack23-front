import React, { useState } from 'react';
import { API_URL } from '../../config';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const PhotoUploader: React.FC = () => {
  const [numPhotos, setNumPhotos] = useState<number>(1);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);

  const handleNumPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    setNumPhotos(num);
    setSelectedPhotos([]);
  };

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

    // try {
    //   const url = API_URL+'/ergIamge'
    //   const response = await fetch(url, {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     // Handle success
    //     console.log('Upload successful');
    //   } else {
    //     // Handle error
    //     console.error('Upload failed');
    //   }
    // } catch (error) {
    //   // Handle network error
    //   console.error('Network error:', error);
    // }
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
