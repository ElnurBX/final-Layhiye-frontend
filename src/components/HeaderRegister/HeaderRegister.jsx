    import React from 'react';
    import { Formik } from 'formik';
    import { Link } from 'react-router-dom';
    import './HeaderRegister.scss';
    import axios from 'axios';

    const HeaderRegister = ({ setAuthModal}) => {
    return (
        <div className='headerRegister'>
        <div className='heading'>Create an account</div>
        <Formik
            initialValues={{ username: '', fullname: '', email: '', password: '' }}
            validate={values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters long';
            }
            return errors;
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
            axios.post('http://localhost:8080/api/auth/register', values)
                .then(res => {
                console.log(res);
                setAuthModal(true);
                setSubmitting(false);

                })
                .catch(err => {
                console.log(err);
                setErrors({ apiError: 'Registration failed. Please try again.' });
                setSubmitting(false);
                });
            }}
            >
                {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                }) => (
                <form className='RegisterForm' onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder='Username *'
                    required
                />
                {errors.username && touched.username && <div className="error">{errors.username}</div>}
                <input
                type="text"
                name="fullname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullname}
                placeholder='Full Name'
                />
                {errors.fullname && touched.fullname && <div className="error">{errors.fullname}</div>}
                <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder='Email *'
                required
                />
                {errors.email && touched.email && <div className="error">{errors.email}</div>}
                <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder='Password *'
                required
                />
                {errors.password && touched.password && <div className="error">{errors.password}</div>}
                {errors.apiError && <div className="error">{errors.apiError}</div>}
                <button type="submit" className='btn btn-primary rounded-pill' disabled={isSubmitting}>
                Register
                </button>
                <div className='d-flex fs-6 justify-content-between'>
                <div className='rememberMe d-flex gap-1 p-1'>
                    <input type="checkbox" id="rememberMe" name="rememberMe" />
                    <label htmlFor="rememberMe" className='fs-6'>
                    I confirm that I have read and accepted the{' '}
                    <Link to={''} className='forgotPassword text-primary text-decoration-none'>
                        privacy policy
                    </Link>
                    </label>
                </div>
                </div>
            </form>
            )}
        </Formik>
        </div>
    );
    };

    export default HeaderRegister;
