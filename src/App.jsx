import { useState, useEffect } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import { dataValidation } from './api';
import { Toaster, toast } from 'sonner';

function App() {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, reset, setFocus } = useForm({
    mode: 'onChange', // Validación en cada cambio de input
  });

  async function onSubmit(data) {
    try {
      const response = await dataValidation(data);
      const json = await response.json();
      
      if (json?.data?.token) {
        localStorage.setItem('token', json.data.token);
        setFocus('email');
        toast.success('Logged');
        reset();
      } else {
        toast.warning('Log Failed');
      }
    } catch (error) {
      console.error('Error', error);
      toast.error('Error ' + error.message);
    }
  }

  return (
    <>
      <main className="w-full min-h-screen flex flex-col gap-4">
        <Toaster position="top-right" richColors />
        <p className="w-full bg-slate-600 text-white font-bold text-center p-2">Login Form</p>
        
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>Email</p>
          <input
            className="bg-white text-black w-full max-w-screen-sm p-2"
            type="email"
            placeholder="Ingresa tu correo electronico"
            {...register('email', {
              required: { value: true, message: 'Campo requerido' },
              minLength: { value: 3, message: 'Minimo 3 caracteres' },
              maxLength: { value: 50, message: 'Máximo 50 caracteres' },
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Correo Invalido' }
            })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          
          <p>Password</p>
          <input
            className="bg-white text-black w-full max-w-screen-sm p-2"
            type="password"
            placeholder="Ingresa password"
            {...register('password', {
              required: { value: true, message: 'Campo requerido' },
              minLength: { value: 3, message: 'Minimo 3 caracteres' },
              maxLength: { value: 50, message: 'Máximo 50 caracteres' },
            })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          
          <button
            type="submit"
            className="text-black px-3 rounded bg-white disabled:bg-stone-400"
            disabled={!isValid}
          >
            + Agregar +
          </button>
        </form>
      </main>
    </>
  );
}

export default App;