import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './ReviewsComponents.scss';
import axios from 'axios';


export const ReviewsTable = ({ reviews }) => {
       const sum=(array)=>{ 
        let sum=0;
        for(let i=0;i<array.length;i++){
            sum+=array[i];
            
        }
        return sum/array.length
    }
    const averageRating = (reviews)=>{
        if(reviews.length===0) return {mainCount:0, cleanlinessCount:0,communicationCount:0,checkInCount:0,accuracyCount:0,locationCount:0,valueCount:0}
        const cleanliness= [];
        const communication=[];
        const checkIn= [];
        const accuracy= [];
        const location= [];
        const value= [];
        for(let i=0;i<reviews.length;i++){
            cleanliness.push(reviews[i].cleanliness);
            communication.push(reviews[i].communication);   
            checkIn.push(reviews[i].checkIn);
            accuracy.push(reviews[i].accuracy);
            location.push(reviews[i].location);
            value.push(reviews[i].value);
        }
        const cleanlinessCount= sum(cleanliness)
        const communicationCount= sum(communication)
        const checkInCount= sum(checkIn)
        const accuracyCount= sum(accuracy)
        const locationCount= sum(location)
        const valueCount= sum(value)
        let mainCount=(cleanlinessCount+communicationCount+checkInCount+accuracyCount+locationCount+valueCount)/6;
        return {mainCount:mainCount, cleanlinessCount,communicationCount,checkInCount,accuracyCount,locationCount,valueCount}

    }
    const getReviewTitle = (rating) => {
        if (rating === 5) return "Excellent";
        if (rating >= 4) return "Good";
        if (rating >= 3) return "Normal";
        if (rating >= 2) return "Not bad";
        if (rating >= 1) return "Bad";
        return "Very bad";
    };

    return (
        <div className="ReviewsTable">
            <div className="header">
                <i className="fas fa-star" style={{ color: "#ffb21d" }}></i>
                <span>{averageRating(reviews).mainCount.toFixed(1)}/5</span>
                <span>{getReviewTitle(averageRating(reviews).mainCount)}</span>
                <span>({reviews.length} reviews)</span>
            </div>
            <div className="body mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 d-flex justify-content-between align-items-center gap-3 p-2">
                            <div className="title w-50">
                                Cleanliness
                            </div>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${(averageRating(reviews).cleanlinessCount)*20}%` }}
                                    aria-valuenow={(averageRating(reviews).cleanlinessCount)*20}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                </div>
                              
                            </div>
                              <div className="progress-value">
                                    {(averageRating(reviews).cleanlinessCount).toFixed(1)}/5
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-between align-items-center gap-3 p-2">
                            <div className="title w-50">
                                CheckIn
                            </div>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${(averageRating(reviews).checkInCount)*20}%` }}
                                    aria-valuenow={(averageRating(reviews).checkInCount)*20}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                </div>
                              
                            </div>
                              <div className="progress-value">
                                    {(averageRating(reviews).checkInCount).toFixed(1)}/5
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-between align-items-center gap-3 p-2">
                            <div className="title w-50">
                                Location
                            </div>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${(averageRating(reviews).locationCount)*20}%` }}
                                    aria-valuenow={(averageRating(reviews).locationCount)*20}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                </div>
                              
                            </div>
                              <div className="progress-value">
                                    {(averageRating(reviews).locationCount).toFixed(1)}/5
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-between align-items-center gap-3 p-2">
                            <div className="title w-50">
                                Communication
                            </div>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${(averageRating(reviews).communicationCount)*20}%` }}
                                    aria-valuenow={(averageRating(reviews).communicationCount)*20}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                </div>
                              
                            </div>
                              <div className="progress-value">
                                    {(averageRating(reviews).communicationCount).toFixed(1)}/5
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-between align-items-center gap-3 p-2">
                            <div className="title w-50">
                                Accuracy
                            </div>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${(averageRating(reviews).accuracyCount)*20}%` }}
                                    aria-valuenow={(averageRating(reviews).accuracyCount)*20}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                </div>
                              
                            </div>
                              <div className="progress-value">
                                    {(averageRating(reviews).accuracyCount).toFixed(1)}/5
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-between align-items-center gap-3 p-2">
                            <div className="title w-50">
                                Value
                            </div>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${(averageRating(reviews).valueCount)*20}%` }}
                                    aria-valuenow={(averageRating(reviews).valueCount)*20}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                </div>
                              
                            </div>
                              <div className="progress-value">
                                    {(averageRating(reviews).valueCount).toFixed(1)}/5
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ReviewForm = ({hotel,UserData}) => {

    const initialValues = {
        name: '',
        email: '',
        title: '',
        content: '',
        cleanliness: 0,
        communication: 0,
        checkIn: 0,
        accuracy: 0,
        location: 0,
        value: 0,
        hotel: hotel,
        user: UserData || []
    };

    const validate = values => {
        const errors = {};
        if (!values.name) errors.name = 'Name is required';
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.title) errors.title = 'Title is required';
        if (!values.content) errors.content = 'Content is required';
        return errors;
    };
  
    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);  
        try {
            const response = await axios.post('http://localhost:8080/api/Reviews', values);
            const newReview = response.data[response.data.length - 1];
            let reviewsData = [...hotel.reviews , newReview];
            console.log(reviewsData);
            await axios.put(`http://localhost:8080/api/Hotels/${hotel._id}`, {reviews: reviewsData });
            console.log("success");
    
            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Submitting review failed:', error);
            alert('Failed to submit review. Please try again.');
        }
    };
    
    
    
            

    return (
        <details>
            <summary className='d-inline mb-5'><p className="btn btn-primary"> Leave a Review</p></summary>
                  <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
            {formik => (
                <Form className="ReviewForm">
                    <h2 className='fs-3 fw-bold mb-2' >Leave a Review</h2>
                    <p className='fs-6 text-secondary mb-6'>Your email address will not be published. Required fields are marked *</p>
                    <div className="container mt-3 ">
                        <div className="row mb-2">
                            <div className="col-md-6 ">
                                <Field type="text" className="form-control" name="name" placeholder="Name"  />
                                <ErrorMessage name="name" component="div" />
                            </div>
                            <div className="col-md-6">
                                <Field className="form-control" type="email" name="email" placeholder="Email" />
                                <ErrorMessage name="email" component="div" />
                            </div>
                        </div>
                        <div className="row mb-2 ">
                            <div className="col-12 mb-2" >
                                <Field type="text" className="form-control" name="title" placeholder="Title" />
                                <ErrorMessage name="title" component="div" />
                            </div>
                            <div className="col-12 mb-2">
                                <Field component="textarea" className="form-control" rows="5" name="content" placeholder="Your review" />
                                <ErrorMessage name="content" component="div" />
                            </div>
                        </div>
                        <div className="container  p-1 form-control">
                            <div className="row ">
                                {['cleanliness', 'communication', 'checkIn', 'accuracy', 'location', 'value'].map(field => (
                                    <StarRating key={field} field={field} formik={formik} />
                                ))}
                            </div>
                        </div>
                        <button type="submit" className='btn btn-primary mt-3' >POST REVIEW</button>
                    </div>
                </Form>
            )}
        </Formik>
        </details>
    );
};
const StarRating = ({ field, formik }) => {
    const { setFieldValue } = formik;
    const rating = formik.values[field];

    const handleRating = (index) => {
        const newRating = rating === index ? 0 : index; // Eğer tıklanan yıldız zaten seçili ise sıfırla, değilse yeni değeri ata.
        setFieldValue(field, newRating);
    };

    return (
        <div className="col-12 col-md-6 mb-2 mt-2">
            <div className="rating-container d-flex align-items-center justify-content-between">
                <label className='w-50'>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <div>
                    {[1, 2, 3, 4, 5].map(index => (
                        <i key={index}
                           className={`fa-solid fa-star ${index <= rating ? 'selected' : ''}`}
                           onClick={() => handleRating(index)}
                           style={{ cursor: 'pointer', color: index <= rating ? "#ffb21d" : "#a1abb3" }}
                        />
                    ))}
                </div>
                <span> {rating}/5</span>
            </div>
        </div>
    );
};
export const ReviewsBody = ({reviews, UserData }) => {
    const [reviewsData, setReviewsData] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/Reviews');
                const filteredReviews = [];
                for(let i = 0; i < res.data.length; i++){
                    for(let j = 0; j <reviews.length; j++){
                        if(res.data[i]._id === reviews[j]._id){
                            filteredReviews.push(res.data[i]);
                        }
                    }
                }
                setReviewsData(filteredReviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [ reviews ]);
    
    const chekkLike = (likes, UserData) => {
        return likes.some(like => like._id === UserData._id)
    }
    const LikeToggle = async ({ review, UserData }) => {
        try {
            const updatedLikes = review.likes.some(like => like._id === UserData._id) ?
                review.likes.filter(like => like._id !== UserData._id) :
                [...review.likes, UserData];
            const res = await axios.put(`http://localhost:8080/api/Reviews/${review._id}`, { likes: updatedLikes });
            console.log(res);
            setReviewsData(prev => prev.map(r => r._id === review._id ? { ...r, likes: updatedLikes } : r));
        } catch (error) {
            console.error('Error updating like:', error);
        }
    };

    return (
        <div className='container mt-5 mb-5'>
           {reviewsData.length > 0 ?
           <>
            {reviewsData.map(review => (
                <div key={review._id}>
                    <div className="heading">
                        {review.user.length > 0 ? 
                        (
                            <div className="review__comment">
                                <div className='d-flex justify-content-between'>
                                    <div className="d-flex mb-3">
                                        <div className="rounded-circle overflow-hidden">
                                            <img  width={50} height={50} src={`http://localhost:8080/uploads/Users/${review.user[0].profileImage}`} alt="User Avatar" />
                                        </div>
                                        <div className="name ms-3">
                                            <h4 className='fw-bold fs-5'>{review.user[0].username}</h4>
                                            <p>{review.createdDate.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                    <div className="like">
                                        <i onClick={() => LikeToggle({ review, UserData })} className="fa-regular fa-thumbs-up" style={chekkLike(review.likes, UserData)?{color: "#3b71fe"}:{color: "#a1abb3"}}></i>
                                        <span>{review.likes ? review.likes.length : 0}</span>
                                    </div>
                                </div>
                                <p>{review.content}</p>
                            </div>
                        )
                        : (
                            <div className="review__comment">
                                <div className='d-flex justify-content-between'>
                                    <div className="d-flex mb-3">
                                        <div className="rounded-circle overflow-hidden">
                                            <img src="https://secure.gravatar.com/avatar/?s=50&d=mm&r=g" alt="User Avatar" />
                                        </div>
                                        <div className="name ms-3">
                                            <h4 className='fw-bold fs-5'>{review.name}</h4>
                                            <p>{review.createdDate.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                    <div className="like">
                                        <i onClick={() => LikeToggle({ review, UserData })} className="fa-regular fa-thumbs-up" style={chekkLike(review.likes, UserData)?{color: "#3b71fe"}:{color: "#a1abb3"}}></i>
                                        <span>{review.likes ? review.likes.length : 0}</span>
                                    </div>
                                </div>
                                <p>{review.content}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            </>
            :
            <><h1 className='text-center p-5 m-5 display-3'>No Reviews</h1></>

            }
        </div>
    );
};