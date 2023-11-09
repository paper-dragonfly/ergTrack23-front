import React, { useState } from 'react'

import NavHeader from '../components/NavHeader'
import { API_URL } from '../config';   
import ExtractingPhotoData from '../components/ExtractingPhotoData';

export default function Sandbox() {
//   const [formData, setFormData] = useState(new FormData());
    interface userInfoType {
        name: string;
        age: string;
        image: File | null;
    }
    const [userInfo, setUserInfo] = useState<userInfoType>(
        {
            name: "kat",
            age: "22",
            image: null,
        }
    )

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, files } = event.target;

        if (type === "file" && files) {
            setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: files[0],
        }));
        } else {
            setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
        }
        console.log("in handleChange2", userInfo)
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // define a new form
        const formData = new FormData()

        // add data to form
        formData.append("name", userInfo.name )
        formData.append('age', userInfo.age)
        if(userInfo.image){
            formData.append('image', userInfo.image)
        }

        // confirm data has been added and that form is of type FormData
        console.log("my form data", formData, formData instanceof FormData)

        //POST to API
        const url = API_URL+'/sandbox'; 
        fetch(url, {
        method: 'POST',
        body: formData,
        })
        .then(response => response.json())
        .then(data => console.log('response data', data));
    }

  return (
    <div className='sandbox'>
        <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" name="name" onChange={handleChange} />
        </label>
        <br />
        <label>
            Age:
            <input type="text" name="age" onChange={handleChange} />
        </label>
        <br />
        <label>
            Image:
            <input type="file" name="image" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
        </form>
    </div>
  );
}

