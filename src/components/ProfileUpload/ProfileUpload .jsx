import React, { useState } from 'react';
import axios from 'axios';

const ProfileUpload = ({ userId }) => {
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
            <input type="file" name="profileImage" onChange={handleImageChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default ProfileUpload;
