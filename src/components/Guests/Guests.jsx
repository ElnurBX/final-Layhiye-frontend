import React, { useState, useEffect } from 'react';
import './Guests.scss';
const Guests = () => {
  const [guests, setGuests] = useState({ rooms: 1, adults: 1, children: 0 });
  const [modal, setModal] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    setGuests({ rooms, adults, children });
  }, [rooms, adults, children]);

  const handleRoomChange = (value) => {
    setRooms((prevRooms) => Math.max(prevRooms + value, 1));
  };

  const handleAdultChange = (value) => {
    setAdults((prevAdults) => Math.max(prevAdults + value, 1));
  };

  const handleChildrenChange = (value) => {
    setChildren((prevChildren) => Math.max(prevChildren + value, 0));
  };

  return (
    <div className="guests">
      <button className="btn d-flex align-items-center gap-3 " onClick={() => setModal(!modal)}>
        <i className="fa-solid fa-user-group"></i>
        <div className="guest-button text-start">
            <h4>Guest</h4>
          <span>
            {guests.adults + guests.children} guests, {guests.rooms} rooms
          </span>
        </div>
      </button>
      {modal && (
        <div className="guests__modal">
          <div className="d-flex guests__modal__item">
            <h4>Rooms</h4>
            <div className="buttons">
                <button onClick={() => handleRoomChange(-1)}>-</button>
                <span>{rooms}</span>
                <button onClick={() => handleRoomChange(1)}>+</button>
            </div>
          </div>

          <div className="d-flex  guests__modal__item">
            <h4>Adults</h4>
            <div className="buttons">
                <button onClick={() => handleAdultChange(-1)}>-</button>
                <span>{adults}</span>
                <button onClick={() => handleAdultChange(1)}>+</button>
            </div>
          </div>

          <div className="d-flex  guests__modal__item">
            <h4>Children</h4>
            <div className="buttons">
                <button onClick={() => handleChildrenChange(-1)}>-</button>
                <span>{children}</span>
                <button onClick={() => handleChildrenChange(1)}>+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guests;
