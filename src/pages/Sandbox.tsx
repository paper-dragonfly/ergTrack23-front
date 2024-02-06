import React, { useState } from 'react';

// Define an interface for storing image information
interface ImageInfo {
  dimensions: string;
  fileSize: string;
  imageUrl: string;
}

const ImageUpload: React.FC = () => {
  // State to store information about the original and resized images
  const [originalImageInfo, setOriginalImageInfo] = useState<ImageInfo | null>(null);
  const [resizedImageInfo, setResizedImageInfo] = useState<ImageInfo | null>(null);

  // Handle file input change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the file from the input
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // Set initial file size for the original image and the URL for display
      setOriginalImageInfo({
        dimensions: '',
        fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        imageUrl: URL.createObjectURL(file)
      });

      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          // Create an image element and set its source to the file data
          const imgElement = document.createElement('img');
          imgElement.src = event.target.result as string;
          imgElement.onload = () => {
            // Update the state with the original image dimensions
            setOriginalImageInfo(info => info ? { ...info, dimensions: `${imgElement.width} x ${imgElement.height}` } : null);
            // Call function to resize the image
            resizeImage(imgElement);
          };
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to resize the image
  const resizeImage = (imgElement: HTMLImageElement) => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const scaleSize = 0.25;  // Scale factor (25% of original size)
    canvas.width = imgElement.width * scaleSize;
    canvas.height = imgElement.height * scaleSize;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw the image on the canvas with the new dimensions
      ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
      // Convert the canvas content to a Blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Update the state with the resized image's dimensions, file size, and URL for display
          setResizedImageInfo({
            dimensions: `${canvas.width} x ${canvas.height}`,
            fileSize: (blob.size / 1024 / 1024).toFixed(2) + ' MB',
            imageUrl: URL.createObjectURL(blob)
          });
        }
      }, 'image/jpeg', 0.5);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {/* Display information and the original image */}
      {originalImageInfo && (
        <div>
          <p>Original Image - Dimensions: {originalImageInfo.dimensions}, Size: {originalImageInfo.fileSize}</p>
          <img src={originalImageInfo.imageUrl} alt="Original" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {/* Display information and the resized image */}
      {resizedImageInfo && (
        <div>
          <p>Resized Image - Dimensions: {resizedImageInfo.dimensions}, Size: {resizedImageInfo.fileSize}</p>
          <img src={resizedImageInfo.imageUrl} alt="Resized" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;









// import React, { useState } from 'react'

// import NavHeader from '../components/NavHeader'
// import { API_URL } from '../config';   
// import ExtractingPhotoData from '../components/ExtractingPhotoData';

// export default function Sandbox() {
// //   const [formData, setFormData] = useState(new FormData());
//     interface userInfoType {
//         name: string;
//         age: string;
//         image: File | null;
//     }
//     const [userInfo, setUserInfo] = useState<userInfoType>(
//         {
//             name: "kat",
//             age: "22",
//             image: null,
//         }
//     )

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, type, value, files } = event.target;

//         if (type === "file" && files) {
//             setUserInfo((prevUserInfo) => ({
//             ...prevUserInfo,
//             [name]: files[0],
//         }));
//         } else {
//             setUserInfo((prevUserInfo) => ({
//             ...prevUserInfo,
//             [name]: value,
//         }));
//         }
//         console.log("in handleChange2", userInfo)
//     };

//     function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//         event.preventDefault();

//         // define a new form
//         const formData = new FormData()

//         // add data to form
//         formData.append("name", userInfo.name )
//         formData.append('age', userInfo.age)
//         if(userInfo.image){
//             formData.append('image', userInfo.image)
//         }

//         // confirm data has been added and that form is of type FormData
//         console.log("my form data", formData, formData instanceof FormData)

//         //POST to API
//         const url = API_URL+'/sandbox'; 
//         fetch(url, {
//         method: 'POST',
//         body: formData,
//         })
//         .then(response => response.json())
//         .then(data => console.log('response data', data));
//     }

//   return (
//     <div className='sandbox'>
//         <form onSubmit={handleSubmit}>
//         <label>
//             Name:
//             <input type="text" name="name" onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//             Age:
//             <input type="text" name="age" onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//             Image:
//             <input type="file" name="image" onChange={handleChange} />
//         </label>
//         <br />
//         <button type="submit">Submit</button>
//         </form>
//     </div>
//   );
// }

