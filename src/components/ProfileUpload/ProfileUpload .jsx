import React, { useState } from 'react';
import axios from 'axios';

const ProfileUpload = ({ userId ,UserData}) => {
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("profileImage", profileImage);

        try {
            const res = await axios.post(`http://localhost:8080/api/upload/Users/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload successful:', res.data);
        } catch (err) {
            console.error('Upload error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex">
            <div className="p-3">
                <img className='rounded-circle' width={100} height={100} src={`http://localhost:8080/uploads/users/${UserData.profileImage}`} alt="Profile" />
            </div>
            
                <div className="input-group">
                    <input  type="file" name="profileImage" onChange={handleImageChange} />
                    <button className="btn btn-outline-secondary" type="submit" id="inputGroupFileAddon04">Upload</button>
                </div>
            </div>
        </form>
    );
};

export default ProfileUpload;
