import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormSelectElements from './FormSelectedElements/FormSelectElements';
import './AdminAddForm.scss';
import FormSelectOne from './FormSelectedElements/FormSelectOne';


const HotelAddForm = () => {
    const [id, setId] = useState('');
    const last = (array) => array[array.length - 1];
    const [facilities, setFacilities] = useState([]);
    const [citys, setCitys] = useState([]);
    const [Rooms, setRooms] = useState([]);
    const [partners, setPartners] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/facilities').then(res => {
            setFacilities(res.data);
        });
        axios.get('http://localhost:8080/api/citys').then(res => {
            setCitys(res.data);
        });
        axios.get('http://localhost:8080/api/Rooms').then(res => {
            setRooms(res.data);
        });
    }, []);

   

    return (
        <div>
            <Formik
                initialValues={{
                    title: '',
                    description:'',
                    loc: '',
                    stars: 0,
                    facilities: [],
                    city: [],
                    Rooms: [],
                    partners: []
                    
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    axios.post('http://localhost:8080/api/hotels', values).then(res => {
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
                            <label htmlFor="description" className="form-label"> description</label>
                            <input
                                id="description"
                                type="text"
                                placeholder='description'
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
                            <label htmlFor="stars" className="form-label">stars</label>
                            <input
                                id="stars"
                                type="number"
                                name="stars"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.stars}
                            />
                            {errors.stars && touched.stars && errors.stars}
                            <FormSelectElements name={"Facilities"} model={facilities} FormikFunk={setFieldValue} />
                            <FormSelectElements name={"rooms"} model={Rooms} FormikFunk={setFieldValue} /> 
                            <FormSelectOne name={"citys"} model={citys} FormikFunk={setFieldValue}/>
                            <FormSelectOne name={"partners"} model={partners} FormikFunk={setFieldValue}/>

                            <button className='btn btn-light' type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                        {id==='' ?<></>: 
                            <div>
                               
                                <HotelAddImgForm id={id} resetAllForms={resetForm} setId={setId}  />
                            </div>
                        }
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default HotelAddForm;

const HotelAddImgForm = ({ id, resetAllForms,setId  }) => {
    const NoPhotoNext=(resetForm  )=>{
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
                        
                        <button type='button' className='btn btn-light Remove' onClick={() => removeItem(id)}><i class="fa-solid fa-arrow-left"></i>  Remove</button>
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
                            <button className='btn btn-light' type="submit" disabled={isSubmitting}>
                                Submit <i class="fa-solid fa-check"></i>
                            </button>
                            <button className='btn btn-light' onClick={()=>NoPhotoNext(resetForm)}>
                               Next <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </form>
                    </>
                )}
            </Formik>
        </div>
    );
};