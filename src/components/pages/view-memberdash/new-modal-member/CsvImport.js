import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../common';
import { FormInput, FormButton } from '../../../common';
import axios from 'axios';

import './styles/csvImport.less';

function CsvImport(props) {
  const { userInfo, authService } = props;
  const [file, setFile] = useState();

  const handleChange = e => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = e => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('csvfile', file);

    const tokens = JSON.parse(localStorage.getItem('okta-token-storage'));

    const access_token = tokens.accessToken.accessToken;

    axios
      .post(
        'https://bg-emotion-tracker-be-a.herokuapp.com/members/upload',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then(res => {
        alert('Success! Members added to the Database');
        console.log(res);
      })
      .catch(err => {
        alert('An error occurred');
        console.log(err);
      });
  };

  return (
    <div className="mainWindow">
      {/* put an image */}
      <div>
        <img
          src="https://img.icons8.com/android/96/000000/upload.png"
          alt="upload"
        />
      </div>
      <div className="formDiv">
        <form onSubmit={e => handleSubmit(e)}>
          <input
            required
            name="csvfile"
            type="file"
            accept=".csv"
            onChange={handleChange}
          />
          <div className="formButton">
            <FormButton
              buttonText="Submit"
              classType="default"
              disabled="false"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CsvImport;
