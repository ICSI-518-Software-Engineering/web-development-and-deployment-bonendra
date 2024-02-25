import React, { useState } from "react";
import "./App.css";
import img from '../src/logo2.jpg';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState("I am Bonendra Kandanti, originally from Tirupati, and I recently completed my undergraduate degree in Electronics and Communication Engineering from Saveetha Engineering College in Chennai, India. Despite being a fresher, I bring valuable experience in HTML, Java, and Python. Motivated to stay abreast of the latest technologies, I decided to pursue further education at SUNY Albany to enhance my knowledge and skills. I am eager to delve into cutting-edge advancements and contribute to the dynamic field of technology.");

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  return (
    <div className="row border mt-2 p-3">
      <div className="col-3 border">
        <img src={img} alt="img not loaded" />
      </div>
      <div className="col-8 probox">
        <div className="row namebox">Kandati Bonendra Reddy</div>
        {editMode ? (
          <textarea
            className="form-control"
            value={bio}
            onChange={handleBioChange}
          />
        ) : (
          <div className="row desbox text-muted" style={{ fontSize: "22px" }}>{bio}</div>
        )}
      </div>
      <div className="col-1 btn align-self-start btn-primary" onClick={handleEditClick}>
        {editMode ? "SAVE" : "EDIT"}
      </div>
    </div>
  );
};

export default Profile;
