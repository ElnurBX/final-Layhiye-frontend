import React, { useState } from 'react';
import '../AdminAddForm.scss';

const FormSelectElements = ({ model, FormikFunk, name  }) => {
    const [select, setSelect] = useState([]);

    const ToggleSelect = (item) => {
        const isSelected = select.some(selectedItem => selectedItem._id === item._id);
        if (isSelected) {
            const newSelect = select.filter(selectedItem => selectedItem._id !== item._id);
            setSelect(newSelect);
            FormikFunk(name.toLowerCase(), newSelect);
        } else {
            const newSelect = [...select, item];
            setSelect(newSelect);
            FormikFunk(name.toLowerCase(), newSelect);
        }
    };

    return (
        <details className='FormSelectDetails'>
            <summary className='FormSelectSummary'>{name}</summary>
            <div className="FromSelected ">
                {
                    select.map((item, index) => (
                        <div className="FormSelectDetails__item" key={index} onClick={() => ToggleSelect(item)}>
                            {item.title}
                            {item.logo && (
                                <img style={{ width: '40px', height: '40px' }} src={`http://localhost:8080/uploads/facilities/${item.logo}`} alt="" />
                            )}
                            {item.mainImg && (
                                <img style={{ width: '40px', height: '40px' }} src={`http://localhost:8080/uploads/${name}/${item.mainImg}`} alt="" />
                            )}
                        </div>
                    ))
                }
            </div>
            <div className="FormSelect">
                {
                    model.map((item, index) => (
                        <div className='FormSelectDetails__item' key={index} onClick={() => ToggleSelect(item)}>
                            {item.title}
                            {item.logo && (
                                <img style={{ width: '40px', height: '40px' }} src={`http://localhost:8080/uploads/facilities/${item.logo}`} alt="" />
                            )}
                            {item.mainImg && (
                                <img style={{ width: '40px', height: '40px' }} src={`http://localhost:8080/uploads/${name}/${item.mainImg}`} alt="" />
                            )}
                        </div>
                    ))
                }
            </div>
        </details>
    );
};

export default FormSelectElements;
