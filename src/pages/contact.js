/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { InputField } from "../components";
import { ContactFormSchema } from "../utils/validation_schema";

const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: ""
};

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(500);

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
        validationSchema: ContactFormSchema,
        onSubmit: ({ email, name, message, subject }, { setStatus, setSubmitting }) => {
            enableLoading();
            console.log("values", email, name, message, subject)
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
        <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
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
                        inputClass={`${getInputClasses(
                            "name"
                        )} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-16`}
                        label={'Full Name'}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.name}</div>
                    ) : null}

                    <InputField
                        name={"email"}
                        type={"text"}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email}
                        inputClass={`${getInputClasses(
                            "email"
                        )} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-16`}
                        label={'Email'}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.email}</div>
                    ) : null}

                    <InputField
                        name={"subject"}
                        type={"text"}
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.subject && formik.errors.subject}
                        inputClass={`${getInputClasses(
                            "subject"
                        )} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-16`}
                        label={'Subject'}
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.subject}</div>
                    ) : null}

                    <div className={`floating-input ${formik.touched.message && formik.errors.message ? "mb-1" : "mb-5"} relative`}>
                        <textarea
                            type={"text"}
                            rows={13}
                            maxLength={500}
                            id={'password'}
                            name={'message'}
                            className={`${getInputClasses(
                                "message"
                            )} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3`}
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="name@example.com"
                            autoComplete="off" />
                        <label
                            htmlFor="message"
                            className="absolute top-0 left-0 px-3 py-2 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                            Message
                        </label>

                        <div className="flex text-sm justify-between">
                            {formik.touched.message && formik.errors.message ? (
                                <div className="text-red-700 text-sm mb-4" >{formik.errors.message}</div>
                            ) : null}
                            <div>
                                {
                                    limit - formik.values.message.length === 0 ? <p className="text-red-600">Maximum limit reached</p>
                                        : ''
                                }
                            </div>
                            <div>{limit - formik.values.message.length} / {limit}</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <button type="submit" className="flex items-center text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none ">
                            Submit
                            {loading &&
                                <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;

