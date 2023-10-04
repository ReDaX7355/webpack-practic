import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

interface SignInForm {
  login: string;
  password: string;
}

const Auth = () => {
  const { register, handleSubmit } = useForm<SignInForm>();

  const onSubmit: SubmitHandler<SignInForm> = (data) => console.log(data);

  return (
    <div className="max-w-lg mx-auto border border-gray-300 p-5">
      <h3 className="text-center text-lg font-bold">Auth</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="my-5">
        <fieldset className="flex flex-col max-w-sm">
          <input
            className="border-md border-primary"
            {...register('login', { pattern: /^[A-Za-z]+$/i })}
          />
          <input
            {...register('password', {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
          />
        </fieldset>
        <fieldset>
          <input type="submit" value="Войти" />
          <p className="underline text-primary">Регистрация</p>
        </fieldset>
      </form>
    </div>
  );
};

export default Auth;
