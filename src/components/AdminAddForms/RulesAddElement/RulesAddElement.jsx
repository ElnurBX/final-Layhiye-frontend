import React, { useState } from 'react';
import '../AdminAddForm.scss';

const RulesAddElement = ({ rules, setRules, FormikFunk, name }) => {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    const addRule = (obj) => {
        const updatedRules = [...rules, obj];
        setRules(updatedRules);
        FormikFunk(name.toLowerCase(), updatedRules);
    }

    const removeRule = (index) => {
        const updatedRules = rules.filter((_, i) => i !== index);
        setRules(updatedRules);
        FormikFunk(name.toLowerCase(), updatedRules);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (key.trim() && value.trim()) {
            addRule({ key, value });
            setKey('');
            setValue('');
        } else {
            alert("Both key and value are required");
        }
    }

    return (
        <details className='FormSelectDetails'>
            <summary className='FormSelectSummary'> Rules</summary>
            <div className="FormSelect">
                {rules.map((rule, i) => (
                    <div className="d-flex justify-content-between" key={i}>
                        <p>{rule.key}: {rule.value}</p>
                        <button 
                            type="button" 
                            className='btn btn-light' 
                            onClick={() => removeRule(i)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="FromSelected">
                <div className="d-flex">
                    <input
                        name="key"
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Key"
                    />
                    <input
                        name="value"
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Value"
                    />
                </div>
                <button type="button" className='btn btn-light' onClick={handleSubmit}>Add</button>
            </div>
        </details>
    );
}

export default RulesAddElement;
