import React, { useState } from 'react';
import './AboutPage.scss';
import Clientsay from '../../../components/AboutConponent/Clientsay/Clientsay';
import MeetOurTeem from '../../../components/AboutConponent/MeetOurTeem/MeetOurTeem';

const AboutPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main className="AboutPage">
        <div className="AboutPage__video-container container rounded-5">
            <button className="AboutPage__play-button" onClick={openModal}>
            <i className="fas fa-play"></i>
            </button>
            {isModalOpen && (
            <div className="AboutPage__modal">
                <div className="AboutPage__modal-content">
                <span className="AboutPage__close" onClick={closeModal}>
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
        <div className="AboutPage__text container">
            <div className="row">
                <div className="col-12">
                    <h3 className='fs-2'>About the company</h3>
                    <p >
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, cons, adipisci velit, sed quia non numquam eius modi ullma tempora incidunt ut labore et dolore magnam aliquam quaerat fruitr voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem. Itaque earum rerum hic tea sapiente delectus, ut aut reiciendis voluptatibus. Our mission
                    </p>
                </div>
                <div className="col-12 col-md-6">
                    <h3 className='fs-2'>Our mission</h3>
                    <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Quis nostrud kemmith exercitation ullamco laboris nisi ut aliquip.
                    Excepteur sint occaecat cupidatat non proident.

                    Quis autem vel eum iure reprehende qui in ea.

                    At vero eos accusamus iusto odio dignissimos.
                    </p>
                </div>
                <div className="col-12 col-md-6">
                    <h3 className='fs-2'>Our mission</h3>
                    <p>
                    Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium minima veniam.
                    </p>
                </div>
            </div>
            <Clientsay/>
            <MeetOurTeem/>
        </div>
        </main>
    );
};

export default AboutPage;
