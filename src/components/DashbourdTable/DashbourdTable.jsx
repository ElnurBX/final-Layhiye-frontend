import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TableDetails from './TableDitails';
import AdminEditForm from '../AdminEditForm/AdminEditForm';

export const DashbourdTable = ({ Model }) => {
    const [models, setModels] = useState([]);
    const [keys, setKeys] = useState([]);

    const extractKeys = (data) => {
        const keysSet = new Set();
        data.forEach(item => {
            if (typeof item === 'object' && item !== null) {
                Object.keys(item).forEach(key => keysSet.add(key));
            }
        });
        return Array.from(keysSet);
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/${Model}`)
            .then(response => {
                setModels(response.data);
                setKeys(extractKeys(response.data));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [Model]);

    const renderCellContent = (content, key, index,Model) => {
        if (typeof content === 'object' && content !== null) {
            return <TableDetails key={index} keyName={key} content={content} modelname={Model} />;
        }
        else if (key === 'logo' || key === 'profileImage') {
            if(key === 'logo'){
            return(
                <img width={'40px'} height={'40px'} src={`http://localhost:8080/uploads/facilities/${content}`} alt="" />
            )
            }else{
                return(
                    <img width={'40px'} height={'40px'} src={`http://localhost:8080/uploads/users/${content}`} alt="" />
                )
            }
        }
        else if (key === 'mainImg') {
            return (
                <img width={'50px'} height={'50px'} src={`http://localhost:8080/uploads/${Model}/${content}`} alt="" />
            )
        }
        else if(key === 'description'||key==="loc"){
            const x = key

            return <details title={content}>
                <summary>{x}</summary>
                <p>{content}</p>
                </details>
        }
        return content;
    };
    
    const DelletItem=(id,Model)=>{
        axios.delete(`http://localhost:8080/api/${Model}/${id}`).then(res=>{
            setModels([...res.data])
        })
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        {keys.map((key, index) => (
                            <th scope="col" key={index}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {models.map((model, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            {keys.map((key, idx) => (
                                <td key={idx}>{renderCellContent(model[key], key, idx,Model)}</td>
                            ))}
                            <td>
                                <AdminEditForm Model={Model} İnitialAllValues={model} keys={keys} ids={model._id}/>
                            </td>
                            <td><button type="button" className="btn btn-danger" onClick={()=>DelletItem(model._id,Model)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
