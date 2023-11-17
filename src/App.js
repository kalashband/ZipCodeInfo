import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const LocationInfo = () => {
  const [postalCode, setPostalCode] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);


  const PostalCodeChanger = (e) => {
    let pinCode = e.target.value;
    setPostalCode(pinCode);
    // console.log(pinCode);
  };

  const pincodeCheak = (pinCode) => {
    return pinCode.length !== 6 || pinCode === "000000";
  }


  const fatchLocationInfo = async () => {
    if (pincodeCheak(postalCode)) {
      console.log(postalCode);
      Swal.fire({
        title: "Check Your Entered Pincode !!!",
        text: "Enter Six Digit Pincode! ",
        icon: "Error"
      });
      return;
    }
    try {
      const resp = await axios.get(`https://api.zippopotam.us/IN/${postalCode}`);
      setLocationData(resp.data);
      console.log(resp.data);

      setLoader(true);
    } catch (error) {
      setLocationData(null);
      console.log(error);
      // setError('Location information not found.');
      Swal.fire({
        title: "Location Not Fount ",
        text: "Try Another One ",
        icon: "warning"
      });
    } finally {
      setLoader(false);
    }

  };

  return (
    <div className='mainContainer'>
      <div className="titleCont">
        <h2>Zip Code Location Information</h2> <br />
        <p>For INDIA <span className='imgFlag'><img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png?20230723002237" alt="flag" /></span></p>
      </div>
      <div className='locationInput'>
        <input type="number" minLength="6" maxLength="6" value={postalCode} onChange={PostalCodeChanger} placeholder="Enter Postal Code" />
        <button onClick={fatchLocationInfo}>Search </button>
      </div>
      {error && <p>{error}</p>}
      {locationData && (
        <div className='locationDetail'>
          
          {locationData.places.map((place, index) => (
            <div key={index} className='loactionCard'>
              <h>{postalCode}</h>
              <p>Place Name: {place['place name']}</p>
              <p>State: {place.state}</p>
              <p>Country: {locationData.country}</p>
              <p>Latitude: {place.latitude}</p>
              <p>Longitude: {place.longitude}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default LocationInfo;

