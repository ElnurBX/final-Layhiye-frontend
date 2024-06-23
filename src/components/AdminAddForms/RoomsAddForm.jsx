import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormSelectElements from './FormSelectedElements/FormSelectElements';
import './AdminAddForm.scss';
import FormSelectOne from './FormSelectedElements/FormSelectOne';

const RoomAddForm = () => {
    const [id, setId] = useState('');
    const last = (array) => array[array.length - 1];
    const [facilities, setFacilities] = useState([]);
    const [citys, setCitys] = useState([]);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/facilities').then(res => {
            setFacilities(res.data);
        });
        axios.get('http://localhost:8080/api/citys').then(res => {
            setCitys(res.data);
        });
        axios.get('http://localhost:8080/api/hotels').then(res => {
            setHotels(res.data);
        });
    }, []);

    return (
        <div>
            <Formik
                initialValues={{
                    title: '',
                    size: 0,
                    beds: 0,
                    adults: 0,
                    children: 0,
                    price: 0,
                    facilities: [],
                    city: [],
                    hotel: ''
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    axios.post('http://localhost:8080/api/rooms', values).then(res => {
                        const newRoomId = last(res.data)._id;
                        setId(newRoomId);
                        alert('Added successfully');
                        setSubmitting(false);
                        console.log(values);
                    }).catch(error => {
                        console.log(values);
                        alert('Failed to add room');
                        setSubmitting(false);
                    });
                }}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                    errors,
                    touched,
                    resetForm
                }) => (
                    <div className="adminAddFormContainer">
                        <form className={id ? 'd-none' : 'adminAddForm'} onSubmit={handleSubmit}>
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                placeholder='Title'
                                id="title"
                                type="text"
                                name="title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                            />
                            {errors.title && touched.title && errors.title}

                            <label htmlFor="size" className="form-label">Size</label>
                            <input
                                id="size"
                                type="number"
                                name="size"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.size}
                            />
                            {errors.size && touched.size && errors.size}

                            <label htmlFor="beds" className="form-label">Beds</label>
                            <input
                                id="beds"
                                type="number"
                                name="beds"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.beds}
                            />
                            {errors.beds && touched.beds && errors.beds}

                            <label htmlFor="adults" className="form-label">Adults</label>
                            <input
                                id="adults"
                                type="number"
                                name="adults"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.adults}
                            />
                            {errors.adults && touched.adults && errors.adults}

                            <label htmlFor="children" className="form-label">Children</label>
                            <input
                                id="children"
                                type="number"
                                name="children"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.children}
                            />
                            {errors.children && touched.children && errors.children}

                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                                id="description"
                                type="text"
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                            {errors.description && touched.description && errors.description}
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                id="price"
                                type="number"
                                name="price"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                            />
                            {errors.price && touched.price && errors.price}

                            <FormSelectElements name={"Facilities"} model={facilities} FormikFunk={setFieldValue} />
                            <FormSelectOne name={"Hotel"} model={hotels} FormikFunk={setFieldValue} />
                            <FormSelectOne name={"City"} model={citys} FormikFunk={setFieldValue} />

                            <button className='btn btn-light' type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                        {id === '' ? <></> : 
                            <div>
                                <RoomAddImgForm id={id} resetAllForms={resetForm}  setId={setId} />
                            </div>
                        }
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default RoomAddForm;

const RoomAddImgForm = ({ id, resetAllForms, setId }) => {
    const NoPhotoNext = (resetForm) => {
        resetForm();
        resetAllForms();
        setId('');
    }

    const removeItem = (id) => {
        axios.delete(`http://localhost:8080/api/rooms/${id}`).then(() => {
            setId('');
        });
    };

    return (
        <div>
            <Formik
                initialValues={{ mainImg: '', imgs: [] }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const formData = new FormData();
                    formData.append('mainImg', values.mainImg);
                    Array.from(values.imgs).forEach((img) => {
                        formData.append('imgs', img);
                    });

                    axios.post(`http://localhost:8080/api/upload/Rooms/${id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(() => {
                        alert('Added images successfully');
                        setSubmitting(false);
                        resetForm();
                        resetAllForms();
                        setId('');
                    }).catch(error => {
                        console.log(error, id, values);
                        alert('Failed to add images');
                        setSubmitting(false);
                    }).finally(() => {
                        
                    });
                }}
            >
                {({
                    setFieldValue,
                    handleSubmit,
                    isSubmitting,
                    resetForm
                }) => (
                    <>
                        <form className='adminAddForm' onSubmit={handleSubmit}>
                            <button type='button' className='btn btn-light Remove' onClick={() => removeItem(id)}>
                                <i className="fa-solid fa-arrow-left"></i> Remove
                            </button>
                            <label htmlFor="mainImg">Main Image:</label>
                            <input
                                id='mainImg'
                                type="file"
                                name="mainImg"
                                onChange={(event) => {
                                    setFieldValue("mainImg", event.currentTarget.files[0]);
                                }}
                            />
                            <label htmlFor="imgs">Gallery:</label>
                            <input
                                id="imgs"
                                type="file"
                                name="imgs"
                                multiple
                                onChange={(event) => {
                                    setFieldValue("imgs", event.currentTarget.files);
                                }}
                            />
                            <div className="d-flex gap-1">
                                <button className='btn btn-light' type="submit" disabled={isSubmitting}>
                                    Submit <i className="fa-solid fa-check"></i>
                                </button>
                                <button className='btn btn-light' onClick={() => NoPhotoNext(resetForm)}>
                                    Next <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </Formik>
        </div>
    );
};
