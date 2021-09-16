import * as Yup from 'yup';


export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Please enter at least 3 characters")
        .required("This field is required"),
    email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    password: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    // confirmPassword: Yup.string()
    //     .oneOf([Yup.ref("password")], "Confirm passwords must match with password")
    //     .required("This field is required"),
    role: Yup.string().required("This field is required"),
    companyName: Yup.string().required("This field is required"),
});


export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required('This field is required'),
    password: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required('This field is required'),
});

export const PriceSheetSchema = Yup.object().shape({
    title: Yup.string()
        .required('This field is required'),
    material: Yup.string()
        .required('This field is required'),
});

export const AddColumnSchema = Yup.object().shape({
    column: Yup.string()
        .required('Column field is required')
});


export const ContactFormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required('This field is required'),
    name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required('This field is required'),
    subject: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required('This field is required'),
    message: Yup.string()
        .min(10, 'Minimum 10 characters')
        .max(500, 'Maximum 500 characters')
        .required('This field is required'),
});

export const OrderFormSchema = Yup.object().shape({
    title: Yup.string()
        .required('This field is required'),
    reference: Yup.string()
        .required('This field is required'),
    shipAddress: Yup.string()
        .min(10, 'Minimum 10 characters required')
        .required('This field is required'),

});

export const FilterFormSchema = Yup.object().shape({
    orderName: Yup.string(),
    customerReference: Yup.string(),
    productName: Yup.string(),
    oppStage: Yup.string(),
    otherOpportunity: Yup.string(),
    date: Yup.date()
});



export const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required('This field is required')
});