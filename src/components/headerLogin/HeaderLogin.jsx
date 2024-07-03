import React, { useContext } from 'react';
import './HeaderLogin.scss';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import MainContext from '../../context/context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const HeaderLogin = () => {
    const { setAuthToken } = useContext(MainContext);

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', values);
            const authToken = response.data.token;
            Cookies.set('auth_token', authToken, { expires: 7 });
            const cookieValue = Cookies.get('auth_token');
            setAuthToken(cookieValue);
            toast.success('Login successful');
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Please check your credentials');
        } finally {
            setSubmitting(false); 
        }
    };

    return (
        <div className='headerLogin'>
            <div className='heading'>Sign in to your account</div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={handleLogin}
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
                    <form className='LoginForm' onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Email or Username'
                             autoComplete="current-password"
                        />
                        {errors.email && touched.email && <div className="error">{errors.email}</div>}
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Password'
                            autoComplete="current-password"
                        />
                        {errors.password && touched.password && <div className="error">{errors.password}</div>}
                        <button type="submit" className='btn btn-primary rounded-pill' disabled={isSubmitting}>
                            Log in
                        </button>
                        <div className='d-flex fs-6 justify-content-between'>
                            <div className='rememberMe d-flex gap-1'>
                                <input type="checkbox" id="rememberMe" name="rememberMe" />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>
                            <Link to={''} className='forgotPassword text-dark'>Forgot password?</Link>
                        </div>
                    </form>
                )}
            </Formik>
            <ToastContainer />
        </div>
    );
};

export default HeaderLogin;
