import React, { useContext, useState } from 'react';
import ProfileUpload from '../../../components/ProfileUpload/ProfileUpload ';
import MainContext from '../../../context/context';
import axios from 'axios';
import './Dashboard.scss';

const ClientDashboard = () => {
    const { UserData, setUserData } = useContext(MainContext);
    const [username, setUsername] = useState(UserData.username);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/Users/${UserData._id}`, { username });
            setUserData({ ...UserData, username: response.data.username });
            setLoading(false);
        } catch (error) {
            setError('Failed to update username.');
            setLoading(false);
        }
    };

    return (
        <main className='w-100 Client__dashboard'>
            <div className="container">
                <div className="row">
                    <h2 className='Client__dashboard__title'>Account Setting</h2>
                </div>
                <div className="col-12">
                    <ProfileUpload UserData={UserData} userId={UserData._id} />
                </div>
                <div className="col-12 pt-5 mt-5">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="">
                            Username:
                        </label>
                        <input
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Submit'}
                        </button>
                    </form>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </main>
    );
};

export default ClientDashboard;
