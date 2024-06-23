import React, { useEffect, useState } from 'react'
import '../AdminAddForms/AdminAddForm.scss'
import FormSelectElements from '../AdminAddForms/FormSelectedElements/FormSelectElements'
import FormSelectOne from '../AdminAddForms/FormSelectedElements/FormSelectOne'
import { Formik } from 'formik'
import axios from 'axios'
import RulesAddElement from '../AdminAddForms/RulesAddElement/RulesAddElement'
const AdminEditForm = (ids , Model, İnitialAllValues , İnitialKeyValues ) => {
    const [Open ,setOpen] =useState(false)
    const [first, setfirst] = useState('');
   
    const [facilities, setfacilities] = useState([]);
    const [citys, setcitys] = useState([]);
    const [hotel, sethotel] = useState([]);
    const [rooms, setrooms] = useState([]);
    const [partners, setpartners] = useState([]);
    const [rules, setRules] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/facilities').then(res => setfacilities(res.data));
        axios.get('http://localhost:8080/api/citys').then(res => setcitys(res.data));
        axios.get('http://localhost:8080/api/hotels').then(res => sethotel(res.data));
        axios.get('http://localhost:8080/api/rooms').then(res => setrooms(res.data));
        axios.get('http://localhost:8080/api/Patniors').then(res => setpartners(res.data));
    }, []);

   

     const checkinput = (src) => {
        const check = ids.keys.find(item => item === src);
        if (check) {
            return true
        } else {
            return false
        }
    }
  return (
    <div>
        <button className='btn btn-warning' onClick={()=>setOpen(!Open)}>Edit</button>
        <div className={Open ? ' HotelModal d-block' : 'HotelModal d-none'}>
          <div className="HotelModal__header">
            <button type="button" className="HotelModal__close btn"  onClick={()=>setOpen(!Open)}>X</button>
            
            <Formik
                initialValues={{
                    title:ids.İnitialAllValues.title,
                    description:ids.İnitialAllValues.description,
                    price:ids.İnitialAllValues.price,
                    city:ids.İnitialAllValues.city,
                    facilities:ids.İnitialAllValues.facilities,
                    rooms:ids.İnitialAllValues.rooms,
                    patniors:ids.İnitialAllValues.partner,
                    beds:ids.İnitialAllValues.beds,
                    size:ids.İnitialAllValues.size,
                    adults:ids.İnitialAllValues.adults,
                    children:ids.İnitialAllValues.children,
                    hotel:ids.İnitialAllValues.hotel,

                }}
                onSubmit={(values, {  resetForm }) => {
                  console.log(`http://localhost:8080/api/${ids.Model}/${ids.ids}`);
                    axios.put(`http://localhost:8080/api/${ids.Model}/${ids.ids}`, values).then(res => {
                        
                        setfirst(ids.ids);
                        alert('Added successfully');
              
                        console.log(values);
                    }).catch(error => {
                        console.log(error);
                        alert('Failed to add update');

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
                        <form className={first ? 'd-none' : 'adminAddForm'} onSubmit={handleSubmit}>
                            {
                            checkinput("title") ?
                            <>
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
                            </>
                            :<></>
                            }

                            {
                            checkinput('size') ?
                            <>
                            <label htmlFor="size" className="form-label">Size</label>
                            <input
                                id="size"
                                type="number"
                                name="size"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.size}
                                min={0}
                            />
                            {errors.size && touched.size && errors.size}
                            </>
                            :<></>
                            }

                            {
                            checkinput('beds') ?
                            <>
                            <label htmlFor="beds" className="form-label">Beds</label>
                            <input
                                id="beds"
                                type="number"
                                name="beds"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.beds}
                                min={0}
                            />
                            {errors.beds && touched.beds && errors.beds}
                            </>
                            :<></>
                            }

                            {
                            checkinput('adults') ?
                            <>
                            <label htmlFor="adults" className="form-label">Adults</label>
                            <input
                                id="adults"
                                type="number"
                                name="adults"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.adults}
                                min={0}
                            />
                            {errors.adults && touched.adults && errors.adults}
                            </>
                            :<></>
                            }
                          {
                            checkinput('children') ?
                            <>
                            <label htmlFor="children" className="form-label">Children</label>
                            <input
                                id="children"
                                type="number"
                                name="children"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.children}
                                min={0}
                            />
                            {errors.children && touched.children && errors.children}
                            </>
                            :<></>
                            }

                            {
                            checkinput('price') ?
                            <>
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                id="price"
                                type="number"
                                name="price"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                min={0}
                            />
                            {errors.price && touched.price && errors.price}
                            </>
                            :<></>
                            }
                            
                            
                            {
                              checkinput("loc")?
                                <>
                                  <label htmlFor="loc" className="form-label">Location</label>
                                  <input
                                      id="loc"
                                      type="text"
                                      name="loc"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.loc}
                                  />
                                  {errors.loc && touched.loc && errors.loc}
                                </>
                              :<></>
                            }
                            {
                              checkinput("description")?
                              <>
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
                              </>:<></>

                            }
                            {
                              checkinput("stars")?
                              <>
                                <label htmlFor="stars" className="form-label">stars</label>
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
                              </>:
                              <></>
                            }
                            {
                              checkinput("facilities")?
                              <>
                                <FormSelectElements name={"Facilities"} model={facilities} FormikFunk={setFieldValue}/>
                              </>:
                              <></>
                            }
                            {
                              checkinput("rooms")?
                              <>
                                <FormSelectElements name={"Rooms"} model={rooms} FormikFunk={setFieldValue}/>
                              </>:
                              <></>
                            }
                            {
                              checkinput("city")?
                              <>
                                <FormSelectElements name={"City"} model={citys} FormikFunk={setFieldValue}/>
                              </>:
                              <></>
                            }
                            {
                              checkinput("hotels")?
                              <>
                                <FormSelectElements name={"Hotels"} model={hotel} FormikFunk={setFieldValue}/>
                              </>:
                              <></>
                            }
                            {
                              checkinput("hotel")?
                              <>
                                <FormSelectOne name={"Hotels"} model={hotel} FormikFunk={setFieldValue}/>
                              </>:
                              <></>
                            }
                            {
                              checkinput("patniors")?
                              <>
                                <FormSelectOne name={"Patniors"} model={partners} FormikFunk={setFieldValue}/>
                              </>:
                              <></>
                            }
                            {
                              checkinput("rules")?
                              <>
                               <RulesAddElement name={"Rules"} rules={rules} setRules={setRules} FormikFunk={setFieldValue}/>
                              </>:
                              <></>
                            }
                            {
                              checkinput("partners")?
                              <>
                                <FormSelectOne name={"partners"} model={partners} FormikFunk={setFieldValue}/>
                              </>:
                              <></>
                            }
                            {
                              checkinput("username") ?
                              <>
                                <label htmlFor="username" className="form-label"> Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                />
                                {errors.username && touched.username && errors.username}
                              </>:
                              <></>
                            }
                            <button className='btn btn-light' type="submit" >
                                Submit
                            </button>
                        </form>
                        {first === '' ? <></> : 
                            <div>
                                <RoomAddImgForm id={ids.ids} ids={ids} Model={ids.Model} resetAllForms={resetForm}  checkinput={checkinput} setId={setfirst} />
                            </div>
                        }
                    </div>
                )}
            </Formik>
          </div>
        </div>
    </div>
  )
}

export default AdminEditForm



const RoomAddImgForm = ({ id, resetAllForms, setId,Model, ids,checkinput }) => {
  const NoPhotoNext = (resetForm) => {
      resetForm();
      resetAllForms();
      setId('');
  }

  const removeItem = (id) => {
      setId('');
  };

  return (
      <div>
          <Formik
              initialValues={{ 
                mainImg: ids.İnitialAllValues.mainImg,
                 imgs: ids.İnitialAllValues.imgs,
                 logo: ids.İnitialAllValues.logo,
                 profileimg: ids.İnitialAllValues.profileimg
                }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                  const formData = new FormData();
                  formData.append('mainImg', values.mainImg);
                  formData.append('logo', values.logo);
                  formData.append('profileImage', values.profileImage);
                  if(checkinput("imgs")){
                    Array.from(values.imgs).forEach((img) => {
                      formData.append('imgs', img);
                  });
                  }
                


                  axios.post(`http://localhost:8080/api/upload/${Model}/${id}`, formData, {
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
                        {
                            checkinput("mainImg")?
                            <>
                              <label htmlFor="mainImg">Main Image:</label>
                              <input
                                  id='mainImg'
                                  type="file"
                                  name="mainImg"
                                  onChange={(event) => {
                                      setFieldValue("mainImg", event.currentTarget.files[0]);
                                  }}
                              />
                            </>:<></>
                        }
                        {
                            checkinput("logo")?
                            <>
                              <label htmlFor="logo">Logo:</label>
                              <input
                                  id="logo"
                                  type="file"
                                  name="logo"
                                  onChange={(event) => {
                                      setFieldValue("logo", event.currentTarget.files[0]);
                                  }}
                              />
                            </>:<></>
                        }
                        {
                            checkinput("profileImage")?
                            <>
                              <label htmlFor="profileImage">Profile image:</label>
                              <input
                                  id="profileImage"
                                  type="file"
                                  name="profileImage"
                                  onChange={(event) => {
                                      setFieldValue("profileImage", event.currentTarget.files[0]);
                                  }}
                              />
                            </>:<></>
                        }
                        {
                            checkinput("imgs")?
                            <>
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
                            </>:<></>
                        }
                         
                          <div className="d-flex gap-1">
                              <button className='btn btn-light' type="submit" >
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