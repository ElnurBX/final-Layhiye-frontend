import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import MainContext from '../../../context/context';
import { DashbourdTable } from '../../../components/DashbourdTable/DashbourdTable';

const Dashboard = () => {
    const { data, setdata } = useContext(MainContext);

    const sections = [
        { title: 'Citys', model: 'Citys' },
        { title: 'Hotels', model: 'Hotels' },
        { title: 'Rooms', model: 'Rooms' },
        { title: 'Facilities', model: 'Facilities' },
        { title: 'Reviews', model: 'Reviews' },
        { title: 'Users', model: 'Users' },
        { title: 'Patniors', model: 'Patniors' },
        // { title: 'Country', model: 'Country' },
    ];

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <main>
                <div className="container">
                    <h1 className="text-center mb-5">Dashboard</h1>
                    <div className="row">
                        {sections.map((section, index) => (
                            <div className="col-md-4 col-12 mb-4" key={index}>
                                <button 
                                    type="button" 
                                    className="btn btn-success p-5 w-100" 
                                    data-bs-toggle="modal" 
                                    data-bs-target={`#exampleModal-${section.title}`}
                                >
                                    <h1 className='p-5 w-100'>{section.title} Dashboard</h1>
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
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <DashbourdTable Model={section.model} />
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
    );
};

export default Dashboard;
