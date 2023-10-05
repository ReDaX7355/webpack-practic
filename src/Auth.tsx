import React, { useState } from 'react';

import { useForm, SubmitHandler,  } from 'react-hook-form';

interface SignInForm {
  login: string;
  password: string;
}

const Auth = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInForm>();

  const [registration, setRegistration] = useState(false);

  const onSubmit: SubmitHandler<SignInForm> = (data) => {console.log(data)};

  return (
    <div className="max-w-lg mx-auto border border-gray-100 p-12 rounded shadow-[0_10px_30px_-5px_rgba(0,0,0,0.2)]">
      <h3 className="text-center text-xl font-bold">
        {registration ? 'Регистрация' : 'Вход'}
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-5 flex flex-col gap-7"
      >
        <fieldset className="flex flex-col">
          
          <input
            className="border-2 border-secondary py-1 px-3 rounded focus:outline-2 outline-primary transition-all "
            {...register('login', {
              required: {
                value: true,
                message: 'Заполните поле "Логин"',
              },
            })}
            placeholder="Логин"
            aria-invalid={errors.login ? 'true' : 'false'}
          />
          {errors.login?.type === 'required' && (
            <p role="alert" className="text-sm text-danger mt-1">
              {errors.login.message}
            </p>
          )}
          
          <input
            className="border-2 border-secondary py-1 px-3 rounded focus:outline-2 outline-primary mt-4"
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'Заполните поле "Пароль"',
              },
            })}
            placeholder="Пароль"
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password?.type === 'required' && (
            <p role="alert" className="text-sm text-danger mt-1">
              {errors.password.message}
            </p>
          )}
        </fieldset>
        <fieldset className="flex justify-between items-center">
          <input
            type="submit"
            value={registration ? 'Зарегистрироваться' : 'Войти'}
            className="bg-primary text-white px-5 py-1.5 rounded transition hover:bg-agree "
          />
          <p
            className=" text-primary cursor-pointer hover:text-agree select-none hover:underline"
            onClick={() => setRegistration((prev) => !registration)}
          >
            {registration ? 'Вход' : 'Регистрация'}
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Auth;
