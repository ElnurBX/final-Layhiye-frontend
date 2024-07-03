import React, { useRef } from 'react';
import './ContactPage.scss';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
    const form = useRef();

    emailjs.init('QOGlN-v0QbIoBTLBN');

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_o31dee6', 'template_l1qjc4z', form.current)
            .then(
                () => {
                    console.log('SUCCESS!');
                    toast.success('Email sent successfully!');
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    toast.error('Failed to send email. Please try again later.');
                },
            );
    };

    return (
        <main className='ContactPage'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.5237548203!2d49.6901538042726!3d40.39447551596034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2zQmFrxLE!5e0!3m2!1saz!2saz!4v1719097397999!5m2!1saz!2saz"
                width="100%"
                height="400"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
            ></iframe>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 col-md-6 mt-5">
                        <h1 className="h2 fw-bold">Contact information</h1>
                        <p className="mt-3 text-secondary fs-6 lh-2 mt-3">
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <div className="ContactPage__contact-info">
                            <ul>
                                <li><i className="fa-solid fa-location-dot"></i> 540 Liberty Road, New District, New York</li>
                                <li><i className="fa-solid fa-phone-volume"></i> (000) 999 - 656 - 888</li>
                                <li><i className="fa-solid fa-envelope"></i> travelerwp@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 ContactPage__form">
                        <h3 className='h3 fw-bold mb-5'>Send a message</h3>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-6 pr-1 p-0">
                                        <input
                                            type="text"
                                            id="user_name"
                                            name="user_name"
                                            placeholder='Your Name*'
                                            required
                                            className='col-12'
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 p-0 ps-1">
                                        <input
                                            type="tel"
                                            id="phone_number"
                                            name="phone_number"
                                            placeholder='Phone Number*'
                                            required
                                            className='col-12'
                                        />
                                    </div>
                                </div>
                            </div>
                            <input
                                type="email"
                                name="user_email"
                                placeholder='Your Email*'
                                required
                                className='col-12'
                            />
                            <textarea
                                name="message"
                                placeholder='Message*'
                                required
                                className='col-12'
                            />
                            <button type="submit" value="Submit">
                                Submit <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </main>
    );
};

export default ContactPage;
