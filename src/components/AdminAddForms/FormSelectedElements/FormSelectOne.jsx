import React, { useState } from 'react';
import '../AdminAddForm.scss';

const FormSelectOne = ({ model, FormikFunk, name }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const ToggleSelect = (item) => {
        if (selectedItem && selectedItem._id === item._id) {
            setSelectedItem(null);
            FormikFunk(name.toLowerCase(), null);
        } else {
            setSelectedItem(item);
            FormikFunk(name.toLowerCase(), item);
        }
    };

    return (
        <details className='FormSelectDetails'>
            <summary className='FormSelectSummary'>{name}</summary>
            <div className="FromSelected">
                {
                    selectedItem && (
                        <div className="FormSelectDetails__item" onClick={() => ToggleSelect(selectedItem)}>
                            {selectedItem.title}
                            {selectedItem.logo && (
                                <img
                                    style={{ width: '40px', height: '40px' }}
                                    src={`http://localhost:8080/uploads/facilities/${selectedItem.logo}`}
                                    alt=""
                                />
                            )}
                            {selectedItem.mainImg && (
                                <img
                                    style={{ width: '40px', height: '40px' }}
                                    src={`http://localhost:8080/uploads/${name}/${selectedItem.mainImg}`}
                                    alt=""
                                />
                            )}
                        </div>
                    )
                }
            </div>
            <div className="FormSelect">
                {
                    model.map((item, index) => (
                        <div className='FormSelectDetails__item' key={index} onClick={() => ToggleSelect(item)}>
                            {item.title}
                            {item.logo && (
                                <img
                                    style={{ width: '40px', height: '40px' }}
                                    src={`http://localhost:8080/uploads/facilities/${item.logo}`}
                                    alt=""
                                />
                            )}
                            {item.mainImg && (
                                <img
                                    style={{ width: '40px', height: '40px' }}
                                    src={`http://localhost:8080/uploads/${name}/${item.mainImg}`}
                                    alt=""
                                />
                            )}
                        </div>
                    ))
                }
            </div>
        </details>
    );
};

export default FormSelectOne;
