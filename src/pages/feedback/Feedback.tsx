import React, { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import { API_URL } from '../../config';


export async function action({request}:{request: Request}){
    // POST feedback to db
    const userToken = sessionStorage.getItem('userToken')
    const formData = await request.formData()
    const formDataObj = Object.fromEntries(formData.entries())
    console.log('FORM DATA OBJ',  formDataObj)
    const url = API_URL+'/feedback'
    const postData = {
        method:  'POST',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObj)
    }
    return fetch(url, postData)
            .then(resp  =>  resp.json())
            .then(data => {
                console.log(data)
                if(data.status_code ===
                    200){
                        return redirect('/feedback/success')
                    }else{
                        return null
                    }
            })
}

export default function Feedback(){

  const [selectedCategory, setSelectedCategory] = useState<string>('issue');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.id);
  };

  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl my-6 text-black text-center md:text-5xl md:mt-10'>
        Feedback
      </h1>
      <Form method='post' className='flex flex-col ml-8 mt-10 gap-4 md:ml-40'>
        
        <div className='flex gap-4'>
            <label className='profile-edit-btn weight'
            style={{backgroundColor: selectedCategory === 'issue' ? "#DDE691" : ""}}>
                <input 
                    type='radio'
                    name='feedbackCategory'
                    id="issue"
                    value="issue"
                    defaultChecked={selectedCategory === 'issue'?true:false}
                    onChange = {handleCategoryChange}
                />
                Report Issue
            </label>
            <label className='profile-edit-btn weight'
            style={{backgroundColor: selectedCategory === 'suggestion' ? "#DDE691" : ""}}>
                <input 
                    type='radio'
                    name='feedbackCategory'
                    id="suggestion"
                    value="suggestion"
                    defaultChecked={selectedCategory === 'suggestion'?true:false}
                    onChange = {handleCategoryChange}
                />
                Suggestion
            </label>
            <label className='profile-edit-btn weight'
            style={{backgroundColor: selectedCategory === 'other' ? "#DDE691" : ""}}>
                <input 
                    type='radio'
                    name='feedbackCategory'
                    id="other"
                    value="other"
                    defaultChecked={selectedCategory === 'other'?true:false}
                    onChange = {handleCategoryChange}
                />
                Other
            </label>
        </div>
        <label>
            Comment:
            <br  />
            <textarea 
                id='feedback-comment' 
                name='comment'
                className='editable-input comment'>
            </textarea> 
        </label>
        <button type='submit' className='btn self-start'>Submit</button>
      </Form>
    </div>
  );
};

