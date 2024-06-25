import { useState, useEffect } from 'react'
import './App.css'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { dataValidation } from './api'
import { Toaster, toast } from 'sonner'

function App() {
 

  const { register, handleSubmit, formState: { erros, isValid, isSubmitted}, reset, setFocus } = useForm();

  function onSumbit(data) {
    
      dataValidation(data)
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          if(json?.data?.token){
            localStorage.setItem('token', json.data.token)
            setFocus('email');
            toast.success('Logged')
            reset();
          }else{
            toast.warning('Log Failed')
          }
            
        })
        .catch((error) =>{
          console.error('Error', error);
          toast.error('Error ' + error.message)
          
        })
    } 
  return (
    <>

      <main className='w-full min-h-screen flex flex-col gap-4'>
        <Toaster position='top-right' richColors />
        <p className='w-full bg-slate-600 text-white font-bold text-center p-2'> Login Form </p>

        <form 
          className='flex flex-col gap-4 items-center'
          onSubmit={handleSubmit(onSumbit)}
        >
          <p className=''> Email </p>
          <input 
            className='bg-white  text-black w-full max-w-screen-sm p-2'
            type='text'
            placeholder='Ingresa tu correo electronico'
            required
            {...register('email', {
              required: { value: true, message: "Campo requerido" },
              minLength: { value: 3, message: "Minimo 3 caracteres" },
              maxLength: { value: 50, message: "Máximo  caracteres" },
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message: "Correo Invalido"}
            })}
          > </input>
          <p> Password </p>
          <input 
            className='bg-white text-black w-full max-w-screen-sm p-2'
            type='text'
            placeholder='Ingres password'
            required
            {...register('password', {
              required: { value: true, message: "Campo requerido" },
              minLength: { value: 3, message: "Minimo 3 caracteres" },
              maxLength: { value: 50, message: "Máximo  caracteres" },
            })}
          >
          </input>
          <button
            className="text-black px-3 rounded bg-white disabled:bg-stone-400" 
          >
            + Agregar +
          </button> 
        </form>
        
      </main>
    </>
  )
}

export default App
