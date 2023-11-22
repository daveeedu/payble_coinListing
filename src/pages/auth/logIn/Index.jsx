import React, { useState } from 'react'
import { ILogo } from '../../../utils/icons.utils'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import { userLogin, userForgotPassword } from '../../../utils/validator';
import { asyncLogin, getAuthData } from '../../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const LogIn = () => {
    const dispatch = useDispatch(),
        navigate = useNavigate(),
        { loginPayload, forgotPassPayload } = useSelector(getAuthData);
    const [showRecoveryEmailField, setShowRecoveryEmailField] = useState(false);
    const handleForgotPasswordClick = () => {
        // Show the recovery email field when "Forgot your password?" is clicked
        setShowRecoveryEmailField(true);
    };

    const handleGoBackClick = () => {
        // Hide the recovery email field and go back to the login and password fields
        setShowRecoveryEmailField(false);
    };


    const handleSubmit = async (values) => {
        try {
            const res = await dispatch(
                asyncLogin({ ...values, email: values?.email?.trim() })
            ).unwrap();
            if (showRecoveryEmailField) {
                setShowRecoveryEmailField(false)
            } else {
                navigate('/coinList');
            }
        } catch (err) {
            console.error(err);
            Alert({ type: 'error', message: 'Something went wrong' });
        }
    }

    return (
        <div className="relative h-screen w-screen rounded-lg bg-cover  bg-no-repeat bg-[url(./assets/payble_bg.jpg)]">
            <div className="absolute opacity-90 md:rounded-lg 2xl:inset-10 md:inset-4 inset-0 bg-gradient-to-t from-black via-black to-black">
                <div className='2xl:pt-14 pt-6 2xl:pl-14 pl-6'>
                    <img src={ILogo} alt='' width={45} height={45} />
                </div>
                <div className='lg:grid lg:grid-cols-2  '>
                    <div className="flex text-start flex-wrap items-center w-full 2xl:p-14 p-6">
                        <div className="text-white">
                            <small className="border-b-2 border-[#376A7C]">Project:</small>
                            <h1 className="mb-0 pb-0 lg:text-[45px] sm:text-[35px] text-[25px] font-bold leading-0">
                            </h1>
                            <h1 className="mt-0 pt-0 font-bold lg:text-[50px] sm:text-[35px] text-[25px]">
                                Coin Listing
                            </h1>
                        </div>
                    </div>
                    <div className="bg-[#b2c0ca] mb-5 px-[1.5em] 2xl:py-14 lg:py-8 py-3 m-auto rounded-lg lg:w-[500px] md:mx-14 mx-6 lg:mx-0">
                        <div className="w-full relative h-full">
                            <Formik
                                initialValues={showRecoveryEmailField ? forgotPassPayload : loginPayload}
                                validationSchema={showRecoveryEmailField ? userForgotPassword : userLogin}
                                onSubmit={handleSubmit}
                            >
                                <Form
                                >

                                    {showRecoveryEmailField ? (
                                        <div className='py-10'>
                                            <h1 className="text-3xl font-bold">Reset Password</h1>
                                            <span className="text-[400] text-[12px] text-black">
                                                Enter your recovery email.
                                            </span>
                                            <div className="mt-8">
                                                <label
                                                    htmlFor="recoveryEmail"
                                                    className="block mb-2 text-[16px] font-medium  text-black text-start"
                                                >
                                                    Email Address
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="recoveryEmail"
                                                    placeholder="E.g johndoe@hotmail.com"
                                                    className="block w-full bg-[#fffefe]  border-0 rounded-[10px] py-4 pl-5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-3 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage
                                                    name="recoveryEmail"
                                                    component="div"
                                                    className="text-red-500 text-start"
                                                />
                                            </div>
                                            <div className="flex items-center justify-end mt-2">

                                                <div className="text-sm leading-5 cursor-pointer">
                                                    <p onClick={handleGoBackClick}
                                                        className="font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                                                    >
                                                        Go back to Log in
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div >
                                            <h1 className="text-3xl font-bold">Login</h1>
                                            <span className="text-[400] text-[12px] text-black">
                                                Log in using your email and password.
                                            </span>
                                            <div className="mt-8">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-[16px] font-medium  text-black text-start"
                                                >
                                                    Email Address
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    placeholder="E.g johndoe@hotmail.com"
                                                    className="block w-full bg-[#fffefe]  border-0 rounded-[10px] py-4 pl-5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-3 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="text-red-500 text-start"
                                                />
                                            </div>
                                            <div className="mt-8">
                                                <label
                                                    htmlFor="password"
                                                    className="block mb-2 text-[16px] font-medium  text-black text-start"
                                                >
                                                    Password
                                                </label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="*****"
                                                    className="block w-full bg-[#fffefe]  border-0 rounded-[10px] py-4 pl-5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-3 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    className="text-red-500 text-start"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="remember"
                                                        name="remember"
                                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    />
                                                    <label
                                                        htmlFor="remember"
                                                        className="ml-2 block text-sm leading-5 text-gray-900"
                                                    >
                                                        Remember me
                                                    </label>
                                                </div>
                                                <div className="text-sm leading-5 cursor-pointer">
                                                    <p onClick={handleForgotPasswordClick}
                                                        className="font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                                                    >
                                                        Forgot your password?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    )}
                                    <button
                                        type="submit"
                                        className="2xl:my-10 my-5 bg-[#376A7C] text-white "
                                    >
                                        Submit
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn