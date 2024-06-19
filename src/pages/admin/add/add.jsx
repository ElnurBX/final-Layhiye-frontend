
    import React, { useContext } from 'react'
    import { Helmet } from 'react-helmet'
    import MainContext from '../../../context/context'
    import CityAddForm from '../../../components/AdminAddForms/CityAddForm'
    import FaciliticsAddForm from '../../../components/AdminAddForms/FaciliticsAddForm'
import RoomsAddForm from '../../../components/AdminAddForms/RoomsAddForm'
import HotelAddForm from '../../../components/AdminAddForms/HotelAddForm'
    const Add = () => {
        const {data,setdata} = useContext(MainContext)
        const sections = [
            { title: 'Citys', model: 'Citys' , element: <CityAddForm/>},
            { title: 'Hotels', model: 'Hotels',element:<HotelAddForm/> },
            { title: 'Rooms', model: 'Rooms' ,element:<RoomsAddForm/>},
            { title: 'Facilities', model: 'Facilities' ,element:<FaciliticsAddForm/>},
            // { title: 'Country', model: 'Country' },
        ];
        return (
        <>
                <Helmet>
                    <title>Add</title>
                </Helmet>
                <main>
                <div className="container">
                    <h1 className="text-center mb-5">add</h1>
                    <div className="row">
                        {sections.map((section, index) => (
                            <div className="col-md-4 col-12 mb-4" key={index}>
                                <button 
                                    type="button" 
                                    className="btn btn-success p-5 w-100" 
                                    data-bs-toggle="modal" 
                                    data-bs-target={`#exampleModal-${section.title}`}
                                >
                                    <h1 className='p-5 w-100'>{section.title} Add</h1>
                                </button>
                                <div 
                                    className="modal fade" 
                                    id={`exampleModal-${section.title}`} 
                                    tabIndex="-1" 
                                    aria-labelledby="exampleModalLabel" 
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog modal-fullscreen">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">ADD {section.title}</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body m-0 p-0">
                                                {section.element} 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
        )
    }
    
    export default Add
        