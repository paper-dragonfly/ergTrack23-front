import React, {useState, useEffect} from 'react'
import {Form, useLocation, Link, redirect} from 'react-router-dom'
import { TypeProfileInfo, TypeUserInfo, TypeProfileEdit, TypeProfileLoaded } from '../utils/interfaces'
import { API_URL } from '../config'

export async function action({request}:{request: Request}){
    //update db data  
    // debugger
    const userToken = sessionStorage.getItem('userToken')
    const formData = await request.formData()
    const formDataObj = Object.fromEntries(formData.entries())
    const url = API_URL+'/user'
    const patchData = {
        method:  'PATCH',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObj)
    }
    return fetch(url, patchData)
            .then(resp  =>  resp.json())
            .then(data => {
                console.log(data)
                return redirect('/profile')
            })
}

export default function ProfileEdit(){
    const { state }  = useLocation() 
    const userInfo = state.userInfo as TypeUserInfo 
    const userToken = state.userToken
    // create form with input fields 
    // mostly text input except for classes which should be dropdown/radio
    //onSubmit: call setUserInfo, send UPDATE to API  (frm parent pg?), use useEffect to update fields 
        //userInfo state should livee in Profile parent page 
    
    // function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{
    //     const {name, value} = e.target
    //     setUserInfo((oldInfo) =>{
    //         return{
    //         ...oldInfo,
    //         [name]:value
    //         }
    //     })
    // }

    // function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    //     e.preventDefault() //prevent immediate submittion 
        
    // }
    const [selectedGender, setSelectedGender] = useState('')
    const [selectedClass, setSelectedClass] = useState('')
    const [selectedPara, setSelectedPara] = useState('')

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const genderOption = e.target.id
        setSelectedGender(genderOption)
    }

    function handleClass(e: React.ChangeEvent<HTMLInputElement>){
        const classOption = e.target.id
        setSelectedClass(classOption)
    }

    function handlePara(e: React.ChangeEvent<HTMLInputElement>){
        const paraOption = e.target.id
        setSelectedPara(paraOption)
    }

    return(
        <div>
           <Form method='post'
           className='flex flex-col ml-8 mt-10 gap-4 md:ml-40'>
                <label >
                    Name:
                    <input 
                        className='editable-input'
                        type='text'
                        name='user_name'
                        defaultValue={userInfo.user_name}
                    />
                </label>
                <label>
                    Email:
                    <input 
                        className='editable-input email'
                        type='text'
                        name='email'
                        defaultValue={userInfo.email}
                    />
                </label>
                <label>
                    Age:
                    <input 
                        className='editable-input'
                        type='text'
                        name='age'
                        defaultValue={userInfo.age? userInfo.age: ""}
                    />
                </label>
                <legend>Sex:</legend>
                <div className='flex gap-6'>
                    <label className='profile-edit-btn'
                    style={{backgroundColor: selectedGender === 'female' ? "#DDE691" : ""}}
                    >
                        <input 
                            id='female'
                            type='radio'
                            name='sex'
                            value='female'
                            defaultChecked={userInfo.sex==='female'?true:false}
                            onChange = {handleChange}
                        />
                        Female
                    </label>
                    <label className='profile-edit-btn'
                    style={{backgroundColor: selectedGender === 'male' ? "#DDE691" : ""}}>
                        <input 
                            id = 'male'
                            type='radio'
                            name='sex'
                            value='male'
                            defaultChecked={userInfo.sex==='male'?true:false}
                            onChange = {handleChange}
                        />
                        Male
                    </label>
                    <label className='profile-edit-btn'
                    style={{backgroundColor: selectedGender === 'gender-none' ? "#DDE691" : ""}}>
                        <input 
                            id='gender-none'
                            type='radio'
                            name='sex'
                            value=''
                            defaultChecked={!userInfo.sex?true:false}
                            onChange = {handleChange}
                        />
                        None
                    </label>
                    
                </div>
                <label>
                    Country:
                    <input 
                        className='editable-input'
                        type='text'
                        name='country'
                        defaultValue={userInfo.country? userInfo.country: ""}
                    />
                </label>
                <legend>Weight Class:</legend>
                <div className='flex gap-6 flex-wrap'>
                    <label className='profile-edit-btn weight'
                     style={{backgroundColor: selectedClass === 'light-women' ? "#DDE691" : ""}}>
                        <input 
                            type='radio'
                            name='weight_class'
                            id="light-women"
                            value="light-women"
                            defaultChecked={userInfo.weight_class==='light-women'?true:false}
                            onChange = {handleClass}
                            />
                        Lightweight Women
                    </label>
                    <label className='profile-edit-btn weight'
                    style={{backgroundColor: selectedClass === 'open-women' ? "#DDE691" : ""}}>
                        <input 
                            type='radio'
                            name='weight_class'
                            id="open-women"
                            value="open-women"
                            defaultChecked={userInfo.weight_class==='open-women'?true:false}
                            onChange = {handleClass}
                        />
                        Open Women
                    </label>
                    <label className='profile-edit-btn weight'
                    style={{backgroundColor: selectedClass === 'light-men' ? "#DDE691" : ""}}>
                        <input 
                            type='radio'
                            name='weight_class'
                            id="light-men"
                            value="light-men"
                            defaultChecked={userInfo.weight_class==='light-men'?true:false}
                            onChange = {handleClass}
                        />
                        Lightweight Men
                    </label>
                    <label className='profile-edit-btn weight'
                    style={{backgroundColor: selectedClass === 'heavy-men' ? "#DDE691" : ""}}>
                        <input 
                            type='radio'
                            name='weight_class'
                            id="heavy-men"
                            value="heavy-men"
                            defaultChecked={userInfo.weight_class==='heavy-men'?true:false}
                            onChange = {handleClass}
                        />
                        Heavy Men
                    </label>
                    <label className='profile-edit-btn weight'
                    style={{backgroundColor: selectedClass === 'none' ? "#DDE691" : ""}}>
                        <input 
                            type='radio'
                            name='weight_class'
                            id="none"
                            value=""
                            defaultChecked={!userInfo.weight_class?true:false}
                            onChange = {handleClass}
                        />
                        None
                    </label>
                </div>
                <legend>Para Classification</legend>
                <a href='https://www.paralympic.org/rowing/classification' target='_blank'
                className="underline"
                >Info on Para Classifications</a>
                <div className='flex gap-6 flex-wrap'>
                    <label className='profile-edit-btn'
                     style={{backgroundColor: selectedPara === 'na' ? "#DDE691" : ""}}>
                        <input 
                            type='radio'
                            name='para_class'
                            id="na"
                            value=""
                            defaultChecked = {!userInfo.para_class?true:false}
                            onChange = {handlePara}
                        />
                        N/A
                    </label>
                    <label className='profile-edit-btn'
                     style={{backgroundColor: selectedPara === 'pr3' ? "#DDE691" : ""}}>
                        <input 
                            type='radio'
                            name='para_class'
                            id="pr3"
                            value="pr3"
                            defaultChecked = {userInfo.para_class==='pr3'?true:false}
                            onChange={handlePara}
                        />
                        PR3
                    </label>
                    <label className='profile-edit-btn'
                     style={{backgroundColor: selectedPara === 'pr2' ? "#DDE691" : ""}}>
                        <input 
                            type='radio'
                            name='para_class'
                            id="pr2"
                            value="pr2"
                            defaultChecked = {userInfo.para_class==='pr2'?true:false}
                            onChange={handlePara}
                        />
                        PR2
                    </label>
                    <label className='profile-edit-btn'
                     style={{backgroundColor: selectedPara === 'pr1' ? "#DDE691" : ""}}>
                        <input 
                            type='radio'
                            name='para_class'
                            id="pr1"
                            value="pr1"
                            defaultChecked = {userInfo.para_class==='pr1'?true:false}
                            onChange={handlePara}
                        />
                        PR1
                    </label>
                </div>
                <button type='submit' className='btn coral self-start my-10'>Update</button>
            </Form> 
        </div>
    )
}
