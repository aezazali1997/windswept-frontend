import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import { SignupSchema } from '../../utils/validation_schema';
import { InputField, Dropdown } from '../../components';
import { Roles } from '../../utils/consts';


const initialValues = {
    email: '',
    password: '',
    role: '',
    companyName: ''
}

const Signup = () => {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);


    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "border-red-500";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "border-blue-500";
        }

        return "";
    };

    const formik = useFormik({
        initialValues,
        validationSchema: SignupSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            enableLoading();
            console.log('values>>>', values);
            // setTimeout(() => {
            //         login(values.email, values.password)
            //             .then(({ data: { data: { accessToken, isAdmin }, message } }) => {
            //                 disableLoading();

            //                 setError(false);
            //                 setStatus(message);
            //                 setShowAlert(true);
            //             })
            //             .catch((e) => {
            //                 console.log('Error', e.response.data.message)
            //                 setError(true)
            //                 disableLoading();
            //                 setSubmitting(false);
            //                 setStatus(e.response.data.message);
            //                 setShowAlert(true);
            //             });
            //         // }, 1000);
        },
    })



    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            {/*SEO Support*/}
            <Helmet>
                <title>Signup | Windswept</title>

            </Helmet>
            {/*SEO Support End */}
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://windsweptmarketing.com/wp-content/uploads/2015/12/logo.png" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-normal text-gray-900">
                        Signup Account
                    </h2>
                    {/* <p className="mt-2 text-center text-sm text-gray-400">
                        Enter your Username and Password
                    </p> */}
                    <p className="mt-4 text-center text-sm text-gray-400">
                        Already Have an Account?  <Link to="/" className="font-medium text-gray-600  hover:text-red-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
                <form className="mt-8" onSubmit={formik.handleSubmit} >

                    <InputField
                        id={"email"}
                        name={"email"}
                        type={"text"}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email}
                        svg={(
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        )}
                        inputClass={`${getInputClasses(
                            "email"
                        )} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-16`}
                        label={'Email'}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-700 text-sm mb-4   " >{formik.errors.email}</div>
                    ) : null}

                    <div className={`floating-input ${formik.touched.password && formik.errors.password ? "mb-1" : "mb-5"} relative`}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id={'password'}
                            name={'password'}
                            className={`${getInputClasses(
                                "password"
                            )} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-16`}

                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="name@example.com"
                            autoComplete="off" />
                        <label
                            htmlFor="username"
                            className="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                            Password
                        </label>
                        <div onClick={() => { setShowPassword(!showPassword) }} className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
                            {
                                showPassword ?
                                    <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    :
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                            }
                        </div>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.password}</div>
                    ) : null}

                    <Dropdown
                        list={Roles}
                        classNames={`${getInputClasses(
                            "role"
                        )} inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-50 text-sm font-medium ${formik.values.role !== '' ? 'text-gray-700' : 'text-gray-400'} hover:bg-gray-50 focus:outline-none`}
                        id="role"
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        error={formik.touched.role && formik.errors.role}
                    />
                    {formik.touched.role && formik.errors.role ? (
                        <div className="text-red-700 text-sm mb-4 " >{formik.errors.role}</div>
                    ) : null}


                    <InputField
                        id={"companyName"}
                        name={"companyName"}
                        type={"text"}
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.companyName && formik.errors.companyName}
                        svg={(
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        )}
                        inputClass={`${getInputClasses(
                            "companyName"
                        )} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-16`}
                        label={'Company Name'}
                    />
                    {formik.touched.companyName && formik.errors.companyName ? (
                        <div className="text-red-700 text-sm mb-4 " >{formik.errors.companyName}</div>
                    ) : null}

                    <div className="flex items-center justify-end">
                        <button type="submit" className="flex items-center text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none ">
                            Submit
                            {loading &&
                                <div class=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
