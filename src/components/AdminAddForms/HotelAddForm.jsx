import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormSelectElements from './FormSelectedElements/FormSelectElements';
import './AdminAddForm.scss';
import FormSelectOne from './FormSelectedElements/FormSelectOne';
import RulesAddElement from './RulesAddElement/RulesAddElement';

const HotelAddForm = () => {
    const [id, setId] = useState('');
    const last = (array) => array[array.length - 1];
    const [facilities, setFacilities] = useState([]);
    const [cities, setCities] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [partners, setPartners] = useState([]);
    const [rules, setRules] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/facilities').then(res => setFacilities(res.data));
        axios.get('http://localhost:8080/api/citys').then(res => setCities(res.data));
        axios.get('http://localhost:8080/api/rooms').then(res => setRooms(res.data));
        axios.get('http://localhost:8080/api/patniors').then(res => setPartners(res.data));
    }, []);

    return (
        <div>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    loc: '',
                    stars: 0,
                    facilities: [],
                    city: [],
                    rooms: [],
                    partners: [],
                    rules: []
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        axios.post('http://localhost:8080/api/hotels', values)
                            .then(res => {
                                const newHotelId = last(res.data)._id;
                                setId(newHotelId);
                                alert('Added successfully');
                                setSubmitting(false);
                            })
                            .catch(error => {
                                alert('Failed to add hotel');
                                console.log(error);
                                setSubmitting(false);
                            });
                    }, 400);
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

                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                                id="description"
                                type="text"
                                placeholder='Description'
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                            {errors.description && touched.description && errors.description}

                            <label htmlFor="loc" className="form-label">Location</label>
                            <input
                                id="loc"
                                type="text"
                                placeholder='Location'
                                name="loc"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.loc}
                            />
                            {errors.loc && touched.loc && errors.loc}

                            <label htmlFor="stars" className="form-label">Stars</label>
                            <input
                                id="stars"
                                type="number"
                                name="stars"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.stars}
                                max={5}
                                min={0}
                            />
                            {errors.stars && touched.stars && errors.stars}

                            <RulesAddElement rules={rules} name={"rules"} setRules={setRules} FormikFunk={setFieldValue} />
                            <FormSelectElements name={"Facilities"} model={facilities} FormikFunk={setFieldValue} />
                            <FormSelectElements name={"Rooms"} model={rooms} FormikFunk={setFieldValue} />
                            <FormSelectOne name={"City"} model={cities} FormikFunk={setFieldValue} />
                            <FormSelectOne name={"Partners"} model={partners} FormikFunk={setFieldValue} />

                            <button className='btn btn-light' type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                        {id && (
                            <div>
                                <HotelAddImgForm id={id} resetAllForms={resetForm} setId={setId} />
                            </div>
                        )}
                    </div>
                )}
            </Formik>
        </div>
    );
};

const HotelAddImgForm = ({ id, resetAllForms, setId }) => {
    const NoPhotoNext = (resetForm) => {
        resetForm();
        resetAllForms();
        setId('');
    }

    const removeItem = (id) => {
        axios.delete(`http://localhost:8080/api/hotels/${id}`).then(() => {
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

                    setTimeout(() => {
                        axios.post(`http://localhost:8080/api/upload/Hotels/${id}`, formData, {
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
                            alert('Failed to add images');
                            setSubmitting(false);
                        });
                    }, 400);
                }}
            >
                {({
                    setFieldValue,
                    handleSubmit,
                    isSubmitting,
                    resetForm
                }) => (
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
                )}
            </Formik>
        </div>
    );
};

export default HotelAddForm;
