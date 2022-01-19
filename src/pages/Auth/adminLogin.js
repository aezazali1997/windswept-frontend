/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { InputField } from '../../components';
import { LoginSchema } from '../../utils/validation_schema';
import AxiosInstance from '../../APIs/axiosInstance';
import { ClosedEyeSVG, EmailSVG, OpenEyeSVG } from '../../assets/SVGs';

const initialValues = {
  email: '',
  password: ''
};

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {}, [showAlert]);

  const toggleAlert = () => {
    setShowAlert(false);
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return 'border-red-500';
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return 'border-blue-500';
    }

    return '';
  };

  const _OnSubmit = async (email, password, setStatus, setSubmitting) => {
    enableLoading();
    try {
      const { data } = await AxiosInstance.adminLogin({
        email,
        password
      });

      disableLoading();
      setError(data.error);
      setStatus(data.message);
      setShowAlert(true);
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('role', data.role);
      
        window.location = '/admin/wimpie';
      
    } catch ({
      response:
      {
        data:
          {
          error,
          message
          }
      }
      }) {
      setError(true);
      setStatus(message);
      disableLoading();
      setSubmitting(false);
      setShowAlert(true);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: ({ email, password }, { setStatus, setSubmitting }) => {
      setSubmitting(true);
      _OnSubmit(email, password, setStatus, setSubmitting);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/*SEO Support*/}
      <Helmet>
        <title>Admin Login | Windswept</title>
      </Helmet>
      {/*SEO Support End */}
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://windsweptmarketing.com/wp-content/uploads/2015/12/logo.png"
            alt="Workflow"
          />
          <h2 className=" text-center text-3xl font-normal text-gray-900">Login Account</h2>
          <p className="mt-2 text-center text-sm text-gray-400">Enter your Email and Password</p>
          {/* <p className="mt-4 text-center text-sm text-gray-400">
                        Don't Have an Account?  <Link to="/signup" className="font-medium text-gray-600  hover:text-red-600 hover:underline">
                            Sign up
                        </Link>
                    </p> */}
        </div>
        <form className="mt-8" onSubmit={formik.handleSubmit}>
          {showAlert === true && (
            <div
              className={`${
                error
                  ? 'bg-red-100 border border-red-400 text-red-700'
                  : 'bg-green-100 border border-green-400 text-green-700'
              } px-4 py-3 flex flex-row w-full justify-between items-center mb-10 rounded" role="alert`}>
              <span className="block sm:inline">{formik.status}</span>
              <span className="relative px-4 py-3">
                <svg
                  onClick={() => toggleAlert}
                  className="fill-current h-6 w-6 text-black"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
          <InputField
            name={'email'}
            type={'text'}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            svg={<EmailSVG />}
            inputClass={`${getInputClasses(
              'email'
            )} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-16`}
            label={'Email'}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-700 text-sm mb-4   ">{formik.errors.email}</div>
          )}

          <div
            className={`floating-input ${
              formik.touched.password && formik.errors.password ? 'mb-1' : 'mb-5'
            } relative`}>
            <input
              type={showPassword ? 'text' : 'password'}
              id={'password'}
              name={'password'}
              className={`${getInputClasses(
                'password'
              )} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-16`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="name@example.com"
              autoComplete="off"
            />
            <label
              htmlFor="username"
              className="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
              Password
            </label>
            <div
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
              {showPassword ? <OpenEyeSVG /> : <ClosedEyeSVG />}
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-700 text-sm mb-4">{formik.errors.password}</div>
          ) : null}

          <div className="flex items-center justify-end">
            {/* <div className="text-sm">
                            <Link to="/forget-password" className="font-medium text-gray-600 hover:text-red-500 hover:underline">
                                Forgot your password?
                            </Link>
                        </div> */}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`flex items-center text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                formik.isSubmitting
                  ? 'bg-red-500 cursor-not-allowed pointer-events-none'
                  : ' bg-red-600 hover:bg-red-700 '
              }focus:outline-none`}>
              Log in
              {loading && (
                <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
