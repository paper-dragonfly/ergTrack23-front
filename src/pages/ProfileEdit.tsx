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


    return(
        <div>
           <Form method='post'>
                <label>
                    Name:
                    <input 
                        type='text'
                        name='user_name'
                        defaultValue={userInfo.user_name}
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type='text'
                        name='email'
                        defaultValue={userInfo.email}
                    />
                </label>
                <label>
                    Age:
                    <input 
                        type='text'
                        name='age'
                        defaultValue={userInfo.age? userInfo.age: ""}
                    />
                </label>
                <legend>Sex</legend>
                <div>
                    <label>
                        <input 
                            type='radio'
                            name='sex'
                            value='female'
                            defaultChecked={userInfo.sex==='female'?true:false}
                        />
                        Female
                    </label>
                    <label>
                        <input 
                            type='radio'
                            name='sex'
                            value='male'
                            defaultChecked={userInfo.sex==='male'?true:false}
                        />
                        Male
                    </label>
                    <label>
                        <input 
                            type='radio'
                            name='sex'
                            value=''
                            defaultChecked={!userInfo.sex?true:false}
                        />
                        None
                    </label>
                    
                </div>
                <label>
                    Country:
                    <input 
                        type='text'
                        name='country'
                        defaultValue={userInfo.country? userInfo.country: ""}
                    />
                </label>
                <legend>Weight Class</legend>
                <div>
                    <label>
                        <input 
                            type='radio'
                            name='weight_class'
                            id="light-women"
                            value="light-women"
                            defaultChecked={userInfo.weight_class==='light-women'?true:false}
                            />
                        Lightweight Women
                    </label>
                    <label>
                        <input 
                            type='radio'
                            name='weight_class'
                            id="open-women"
                            value="open-women"
                            defaultChecked={userInfo.weight_class==='open-women'?true:false}
                        />
                        Open Women
                    </label>
                    <label>
                        <input 
                            type='radio'
                            name='weight_class'
                            id="light-men"
                            value="light-men"
                            defaultChecked={userInfo.weight_class==='light-men'?true:false}
                        />
                        Lightweight Men
                    </label>
                    <label>
                        <input 
                            type='radio'
                            name='weight_class'
                            id="heavy-men"
                            value="heavy-men"
                            defaultChecked={userInfo.weight_class==='heavy-men'?true:false}
                        />
                        Heavy Men
                    </label>
                    <label>
                        <input 
                            type='radio'
                            name='weight_class'
                            id="none"
                            value=""
                            defaultChecked={!userInfo.weight_class?true:false}
                        />
                        None
                    </label>
                </div>
                <legend>Para Classification</legend>
                <a href='https://www.paralympic.org/rowing/classification' target='_blank'>Info on Para Classifications</a>
                <div>
                    <label>
                        <input 
                            type='radio'
                            name='para_class'
                            id="na"
                            value=""
                            defaultChecked = {!userInfo.para_class?true:false}
                        />
                        N/A
                    </label>
                    <label>
                        <input 
                            type='radio'
                            name='para_class'
                            id="pr3"
                            value="pr3"
                            defaultChecked = {userInfo.para_class==='pr3'?true:false}
                        />
                        PR3
                    </label>
                    <label>
                        <input 
                            type='radio'
                            name='para_class'
                            id="pr2"
                            value="pr2"
                            defaultChecked = {userInfo.para_class==='pr2'?true:false}
                        />
                        PR2
                    </label>
                    <label>
                        <input 
                            type='radio'
                            name='para_class'
                            id="pr1"
                            value="pr1"
                            defaultChecked = {userInfo.para_class==='pr1'?true:false}
                        />
                        PR1
                    </label>
                </div>
                <button type='submit'>Update</button>
            </Form> 
        </div>
    )
}
