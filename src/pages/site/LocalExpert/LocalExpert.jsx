import React, { useState } from 'react';
import './LocalExpert.scss';
import { Link } from 'react-router-dom';
import MeetTheSuperhosts from '../../../components/MeetTheSuperhosts/MeetTheSuperhosts';
import FrequentlyAskedQuestions from '../../../components/FrequentlyAskedQuestions/FrequentlyAskedQuestions';

const LocalExpert = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main className="LocalExpert">
        <div className="LocalExpert__video-container container rounded-5">
             <h3 className="LocalExpert__title fs-2">You can become a Local Expert anything, anywhere</h3>
            <button className="LocalExpert__play-button" onClick={openModal}>
           
            <i className="fas fa-play"></i>
            </button>
            {isModalOpen && (
            <div className="LocalExpert__modal">
                <div className="LocalExpert__modal-content">
                <span className="LocalExpert__close" onClick={closeModal}>
                    &times;
                </span>
                <iframe
                    src="https://www.youtube.com/embed/BBJa32lCaaY?autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                </div>
            </div>
            )}
        </div>
            <section className="HowDoesItWork">
                <h3 className="HowDoesItWork__title fs-1 text-center fw-bold mb-5">How does it work?</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 ">
                            <div className="HowDoesItWork__item">
                            <div className="HowDoesItWork__item__icon">
                                01
                            </div>
                            <div className="HowDoesItWork__item__content">
                                <h4>Sign up</h4>
                                <p>Praesent dolor sagittis, rhoncus netus bibendum et. Dolor id sed urna netus volutpat tortor.</p>
                            </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 ">
                            <div className="HowDoesItWork__item">
                                <div className="HowDoesItWork__item__icon">
                                    02
                                </div>
                                <div className="HowDoesItWork__item__content">
                                    <h4>Add your services</h4>
                                    <p>Praesent dolor sagittis, rhoncus netus bibendum et. Dolor id sed urna netus volutpat tortor.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 ">
                            <div className="HowDoesItWork__item">
                            <div className="HowDoesItWork__item__icon">
                                03
                            </div>
                            <div className="HowDoesItWork__item__content">
                                <h4>Get bookings</h4>
                                <p>Praesent dolor sagittis, rhoncus netus bibendum et. Dolor id sed urna netus volutpat tortor.</p>
                            </div>

                            </div>
                        </div>

                    </div>

                </div>
                <div className="d-flex justify-content-center mt-5">
                <Link to={'/Register'} className="btn p-3 btn-primary rounded-pill "> Register now</Link>
                </div>
            </section>
            <MeetTheSuperhosts />
            <FrequentlyAskedQuestions/>
        </main>
    );
};

export default LocalExpert;
