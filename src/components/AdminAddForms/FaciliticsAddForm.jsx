import { Formik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';

const FaciliticsAddImgForm = ({ id, resetAllForms, setId }) => {
    const removeItem = (id) => {
        axios.delete(`http://localhost:8080/api/facilities/${id}`).then(() => {
            setId('');
        });
    };

    return (
        <div>
            <Formik
                initialValues={{ logo: '' }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const formData = new FormData();
                    formData.append('logo', values.logo);

                    axios.post(`http://localhost:8080/api/upload/Facilities/${id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(() => {
                        alert('Added logo successfully');
                        setSubmitting(false);
                        resetForm();
                        resetAllForms();
                        setId('');
                    }).catch(error => {
                        alert('Failed to add logo');
                        setSubmitting(false);
                    });
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
                        <label htmlFor="logo">Logo:</label>
                        <input
                            id='logo'
                            type="file"
                            name="logo"
                            onChange={(event) => {
                                setFieldValue("logo", event.currentTarget.files[0]);
                            }}
                        />
                        <div className="d-flex gap-1">
                            <button className='btn btn-light' type="submit" disabled={isSubmitting}>
                                Submit <i className="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

const FaciliticsAddForm = () => {
    const [id, setId] = useState('');
    const last = (array) => array[array.length - 1];

    return (
        <div>
            <Formik
                initialValues={{ title: '' }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    axios.post('http://localhost:8080/api/facilities', values).then(res => {
                        const newFacilityId = last(res.data)._id;
                        setId(newFacilityId);
                        alert('Added successfully');
                        setSubmitting(false);
                    }).catch(error => {
                        alert('Failed to add facility');
                        setSubmitting(false);
                    });
                }}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
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

                            <button className='btn btn-light' type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                        {id === '' ? <></> :
                            <div>
                                <FaciliticsAddImgForm id={id} resetAllForms={resetForm} setId={setId} />
                            </div>
                        }
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default FaciliticsAddForm;
