/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik } from "formik";
import React, {  useState } from "react";
import { Helmet } from 'react-helmet';
import { InputField } from "../components";
import { ContactFormSchema } from "../utils/validation_schema";
import { getInputClasses } from "../utils/helpers";

const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: ""
};

const Contact = () => {
    const [loading, setLoading] = useState(false);
    let limit=500;

    const enableLoading = () => {
        setLoading(true);
    };

    // const disableLoading = () => {
    //     setLoading(false);
    // };

    const formik = useFormik({
        initialValues,
        validationSchema: ContactFormSchema,
        onSubmit: ({ email, name, message, subject }, { setStatus, setSubmitting }) => {
            enableLoading();
            // setTimeout(() => {
            //         login(email, password)
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
        <div className='flex flex-col px-3 py-5'>
            <h1 className='text-2xl text-center uppercase font-bold'>Contact</h1>

            <div className="min-h-screen flex items-center justify-center bg-white py-3 px-4 sm:px-6 lg:px-8">
                {/*SEO Support*/}
                <Helmet>
                    <title>Contact | Windswept</title>
                </Helmet>
                {/*SEO Support End */}

                <div className="max-w-md w-full space-y-8">
                    <form className="mt-8" onSubmit={formik.handleSubmit}>

                        <InputField
                            name={"name"}
                            type={"text"}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name}
                            inputClass={`${getInputClasses(formik,
                                "name"
                            )} border bg-gray-50 border-gray-500  focus:outline-none rounded-md w-full p-3 h-14`}
                            label={'Full Name'}
                        />
                        {formik.touched.name && formik.errors.name &&
                            <div className="text-red-700 text-sm mb-4" >{formik.errors.name}</div>
                        }

                        <InputField
                            name={"email"}
                            type={"text"}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email}
                            inputClass={`${getInputClasses(formik,
                                "email"
                            )} border bg-gray-50 border-gray-500  focus:outline-none rounded-md w-full p-3 h-14`}
                            label={'Email'}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div className="text-red-700 text-sm mb-4" >{formik.errors.email}</div>
                        }

                        <InputField
                            name={"subject"}
                            type={"text"}
                            value={formik.values.subject}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.subject && formik.errors.subject}
                            inputClass={`${getInputClasses(formik,
                                "subject"
                            )} border bg-gray-50 border-gray-500  focus:outline-none rounded-md w-full p-3 h-14`}
                            label={'Subject'}
                        />
                        {formik.touched.subject && formik.errors.subject &&
                            <div className="text-red-700 text-sm mb-4" >{formik.errors.subject}</div>
                        }

                        <div className={`floating-input ${formik.touched.message && formik.errors.message ? "mb-1" : "mb-5"} relative`}>
                            <textarea
                                type={"text"}
                                rows={13}
                                maxLength={500}
                                id={'password'}
                                name={'message'}
                                className={`border border-gray-500 rounded-md ${getInputClasses(formik,
                                    "message"
                                )} border bg-gray-50  focus:outline-none shadow-md rounded-md focus:shadow-sm w-full p-3`}
                                placeholder="name@example.com"
                                autoComplete="off"
                                {...formik.getFieldProps('message')}
                            />
                            <label
                                htmlFor="message"
                                className="absolute text-gray-700 top-0 left-0 px-3 py-2 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                                Message
                            </label>

                            <div className="flex text-sm justify-between">
                                {formik.touched.message && formik.errors.message &&
                                    <div className="text-red-700 text-sm mb-4" >{formik.errors.message}</div>
                                }
                                <div>
                                    {
                                        limit - formik.values.message.length === 0 && <p className="text-red-600">Maximum limit reached</p>

                                    }
                                </div>
                                <div>{limit - formik.values.message.length} / {limit}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" className="flex items-center text-center py-2 px-4 border border-transparent text-sm font-medium text-white hover:text-red-600 hover:border-red-600  bg-red-600 hover:bg-transparent focus:outline-none ">
                                Submit
                                {loading &&
                                    <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;

