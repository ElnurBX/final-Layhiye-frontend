import { Formik } from 'formik';
import React, { useState } from 'react'
import axios from 'axios';

const FaciliticsAddImgForm = ({ id }) => {
    return (
        <div>
            <Formik
                initialValues={{ logo: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = new FormData();
                    formData.append('logo', values.logo);

                    axios.post(`http://localhost:8080/api/upload/Facilities/${id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(() => {
                        alert('Added logo successfully');
                        setSubmitting(false);
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
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            name="logo"
                            onChange={(event) => {
                                setFieldValue("logo", event.currentTarget.files[0]);
                            }}
                        />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

const FaciliticsAddForm = () => {
    const [id, setId] = useState('');
    const last =(array)=>{
        return array[array.length - 1];
    }
    return (
        <div>
            <Formik
                initialValues={{ title: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post('http://localhost:8080/api/Facilities', values).then(res => {
                        const newFacilityId =last( res.data)._id; // Assuming your response has the new facility ID
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
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
            {id && <FaciliticsAddImgForm id={id} />}
        </div>
    )
}

export default FaciliticsAddForm;
