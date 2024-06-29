import React, { useEffect, useState } from 'react';
import TableDetails from './TableDitails';


export const Subdashbourd = ({ content, keyName }) => {
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
        setKeys(extractKeys(content));
    }, [content ]);
    
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
        else if(key === 'description'){
    

            return <details title={content}>
                <summary>{"description"}</summary>
                <p>{content}</p>
                </details>
        }
        return content;
    };

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
                    {content.map((model, index) => 
                    {
                        return(
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            {keys.map((key, idx) => (
                                <td key={idx}>{renderCellContent(model[key], key)}</td>
                            ))}
                        </tr>
                    )
                    }
                    )}
                </tbody>
            </table>
        </div>
    );
};
