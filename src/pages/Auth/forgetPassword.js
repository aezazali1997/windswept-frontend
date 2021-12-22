/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { InputField } from "../../components";
import { ForgetPasswordSchema } from "../../utils/validation_schema";

const initialValues = {
    email: "",
};

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);

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
        validationSchema: ForgetPasswordSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            enableLoading();
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
          <title>Forget Password | Windswept</title>
        </Helmet>
        {/*SEO Support End */}
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/">
              <img
                className="mx-auto h-12 w-auto cursor-pointer"
                src="https://windsweptmarketing.com/wp-content/uploads/2015/12/logo.png"
                alt="Workflow"
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-normal text-gray-900">Forget Password</h2>
            <p className="mt-2 text-center text-sm text-gray-400">Enter your email address</p>
            {/* <p className="mt-4 text-center text-sm text-gray-400">
                        Don't Have an Account?  <a href="#" className="font-medium text-gray-600  hover:text-red-600 hover:underline">
                            Sign up
                        </a>
                    </p> */}
          </div>
          <form className="mt-8" onSubmit={formik.handleSubmit}>
            <InputField
              name={'email'}
              type={'text'}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              svg={
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              inputClass={`${getInputClasses(
                'email'
              )} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-16`}
              label={'Email'}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-700 text-sm mb-4   ">{formik.errors.email}</div>
            ) : null}

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="flex items-center text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none ">
                Submit
                {loading && (
                  <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default ForgetPassword;

