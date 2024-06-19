import React, { useEffect, useState } from 'react';
import TableDetails from './TableDitails';

export const Subdashbourd = ({ Modeldata, title }) => {
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
        setKeys(extractKeys(Modeldata));
    }, [Modeldata]);

    const renderCellContent = (content, key) => {
        if (typeof content === 'object' && content !== null) {
            return <TableDetails keyName={key} content={content} />;
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
                    {Modeldata.map((model, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            {keys.map((key, idx) => (
                                <td key={idx}>{renderCellContent(model[key], key)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
