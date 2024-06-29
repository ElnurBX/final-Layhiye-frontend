import React, { useState } from 'react';
import './HotelGallery.scss';

const HotelGallery = ({ imgs, youtubeLink }) => {
    const [selectedPhoto, setSelectedPhoto] = useState('');
    const [modal, setModal] = useState(false);
    const [fullImageIndex, setFullImageIndex] = useState(0);
    const [galleryModal, setGalleryModal] = useState(false);
    const [youtubeLinkModal, setYoutubeLinkModal] = useState(false);

    if (!imgs || imgs.length === 0) return null;

    const mainImage = imgs[0];
    const otherImages = imgs.slice(1);

    const handleImageClick = (img) => {
        setSelectedPhoto(img);
        setModal(true);
    };

    const handleNavigation = (direction) => {
        setFullImageIndex(prevIndex => {
            const newIndex = direction === 'left' ? prevIndex - 1 : prevIndex + 1;
            return (newIndex < 0 ? imgs.length - 1 : newIndex % imgs.length);
        });
    };

    const getYouTubeEmbedUrl = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    const embedUrl = getYouTubeEmbedUrl(youtubeLink);

    return (
        <div className="HotelGallery">
            <div className="container-fluid">
                <div className="HotelGallery__main">
                    <div className="row">
                        <div className="col-12 col-md-4 ps-0">
                            <div className="HotelGallery__main__img" onClick={() => handleImageClick(mainImage)}>
                                <img src={`http://localhost:8080/uploads/hotels/${mainImage}`} alt="Main view of hotel" />
                            </div>
                        </div>
                        <div className="col-12 col-md-8 d-md-block d-none pe-0">
                            <div className="container">
                                <div className="row row-gap-3">
                                    {otherImages.map((img, index) => (
                                        <div className="HotelGallery__main__imgs col-6" key={img} onClick={() => handleImageClick(img)}>
                                            <img src={`http://localhost:8080/uploads/hotels/${img}`} alt={`Additional view ${index + 1} of hotel`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="OnePhoto">
                    <div className={modal ? "OnePhoto__Modal d-flex" : "OnePhoto__Modal d-none"}>
                        {selectedPhoto && <img src={`http://localhost:8080/uploads/hotels/${selectedPhoto}`} alt="Selected view of hotel" />}
                        <div className="OnePhoto__Modal__Close" onClick={() => setModal(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
                <div className="HotelGallery__btns">
                    {youtubeLink && (
                        <button className='HotelGallery__btns__btn me-3 rounded-circle' onClick={() => setYoutubeLinkModal(true)}>
                            <i className="fa-solid fa-play"></i>
                        </button>
                    )}
                    <button onClick={() => setGalleryModal(true)} className='HotelGallery__btns__btn rounded-pill'>
                        <i className="fa-solid fa-table-cells-large"></i> All photos
                    </button>
                </div>                                    
                <div className={galleryModal ? "OnePhoto" : "d-none"}>
                    <div className={galleryModal ? "OnePhoto__Modal d-flex" : "OnePhoto__Modal d-none"}>
                        <button className='btn left' onClick={() => handleNavigation('left')} aria-label="Previous image">
                            <i className="fa-solid fa-arrow-left bg-light p-1 rounded-circle"></i>
                        </button>
                        <div className="OnePhoto__Modal__img">
                            <img src={`http://localhost:8080/uploads/hotels/${imgs[fullImageIndex]}`} alt={`Gallery view ${fullImageIndex + 1} of hotel`} />
                        </div>
                        <button className='btn right' onClick={() => handleNavigation('right')} aria-label="Next image">
                            <i className="fa-solid fa-arrow-right bg-light p-1 rounded-circle"></i>
                        </button>
                        <div className="OnePhoto__Modal__Close" onClick={() => setGalleryModal(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
                <div className="OnePhoto">
                    <div className={youtubeLinkModal ? "OnePhoto__Modal d-flex" : "OnePhoto__Modal d-none"}>
                        <iframe
                            src={embedUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <div className="OnePhoto__Modal__Close" onClick={() => setYoutubeLinkModal(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelGallery;
