import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import {DevTool} from '@hookform/devtools'
import Api from '../Api'

const Form = () => {
    const [message,setMessage] = useState('')
    const {register,handleSubmit,formState,control,reset} = useForm()
    const userForm = formState
    const {errors, isDirty, isValid} = userForm

    const location = useLocation()
    const navigate = useNavigate()
    const url = `http://localhost:8000/${location.pathname==='/'?'signup':'login'}`

    useEffect(() => {
        if(localStorage.getItem('token'))
        navigate('/dashboard')
    })

    const onSubmit = async (data) => {
        const formData = {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email:data.email,password:data.password})
        }

        const {resMsg,jsonData} = await Api(url,formData)

        if(resMsg){
            setMessage(resMsg)
            reset()
        }
        else{
            localStorage.setItem('token',JSON.stringify(jsonData))
            if(location.pathname==='/login')
                navigate('/dashboard')
            else
                navigate('/login')
        }  
    }
    return (
    <>  
        {message?<p>{message}</p>:''}
        <form className='form' action="" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='form-data'>
            <input type="text" id='email' placeholder='email' {...register("email",{pattern:{value:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,message:'Invalid email address'}})} autoComplete='off'/>
            <p className='error'>{errors.email?.message}</p>
            <input type="password" id='password' placeholder='password' {...register("password",{pattern:{value:/^.{8,15}$/,message:'Password must be atleast 8 characters'}})}/>
            <p className='error'>{errors.password?.message}</p>
            </div>
            <div className='form-action'>
            <input type="submit" value={location.pathname==='/login'?'Login':'Sign up'} />
            {location.pathname==='/login'?<p><a href="/">Don't have account?Sign up</a></p>:<p><a href={location.pathname==='/login'?'/':'/login'}>Already have account?Log in</a></p>}
            </div>
            <DevTool control = {control}/>
        </form>
    </>
  )
}

export default Form