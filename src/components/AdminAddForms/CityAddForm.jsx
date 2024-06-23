import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormSelectElements from './FormSelectedElements/FormSelectElements';
import './AdminAddForm.scss';



const CityAddForm = () => {
    const [id, setId] = useState('');
    const last = (array) => array[array.length - 1];
    const [Hotels, setHotels] = useState([]);

    useEffect(() => {
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
                    Rooms: []
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    axios.post('http://localhost:8080/api/citys', values).then(res => {
                        const newRoomId = last(res.data)._id;
                        setId(newRoomId);
                        alert('Added successfully');
                        setSubmitting(false);
             
                    }).catch(error => {
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
                        <form className={id ?   'd-none' :'adminAddForm'} onSubmit={handleSubmit}>
                            <label htmlFor="title" className="form-label"  > Title</label>
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
                            <label htmlFor="loc" className="form-label"> Location</label>
                            <input
                                id="loc"
                                type="text"
                                name="loc"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.loc}
                            />
                            {errors.loc && touched.loc && errors.loc}


                            <FormSelectElements name={"Hotels"} model={Hotels} FormikFunk={setFieldValue} />
                            <button className='btn btn-light' type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                        {id==='' ?
                            <></>
                            : 
                            <div>
                                <CityAddImgForm id={id} resetAllForms={resetForm} setId={setId}  />
                            </div>
                        }
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default CityAddForm;

const CityAddImgForm = ({ id, resetAllForms,setId  }) => {
    const NoPhotoNext=(resetForm  )=>{
                        resetForm();
                        resetAllForms();
                        setId('');
    }
    const removeItem = (id) => {
        axios.delete(`http://localhost:8080/api/citys/${id}`).then(() => {
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

                    axios.post(`http://localhost:8080/api/upload/Citys/${id}`, formData, {
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
                }}
            >
                {({
                    setFieldValue,
                    handleSubmit,
                    isSubmitting,
                    resetForm
                }) => (
                    <>
                    <form className='adminAddForm'  onSubmit={handleSubmit}>
                        
                        <button type='button' className='btn btn-light Remove' onClick={() => removeItem(id)}><i className="fa-solid fa-arrow-left"></i>  Remove</button>
                        <label htmlFor="mainImg"> Main Image:</label>
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
                        <div className=" d-flex gap-1">
                            <button className='btn btn-light' type="submit" >
                                Submit <i className="fa-solid fa-check"></i>
                            </button>
                            <button className='btn btn-light' onClick={()=>NoPhotoNext(resetForm)}>
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