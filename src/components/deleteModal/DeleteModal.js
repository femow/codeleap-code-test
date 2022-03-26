import React from "react";
import ReactDOM from "react-dom";
import classes from "./DeleteModal.module.css";

const BackModal = ({ onCancel }) => {
  return <div className={classes.back} onClick={onCancel} />;
};

const FrontModal = ({ onOk, onCancel }) => {
  return (
    <div className={classes.front}>
      <p>Are you sure you want to delete this item?</p>
      <div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onOk}>OK</button>
      </div>
    </div>
  );
};

const DeleteModal = ({ onOk, onCancel }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackModal onCancel={onCancel} />,
        document.getElementById("portal-modal-back")
      )}
      {ReactDOM.createPortal(
        <FrontModal
          onOk={onOk}
          onCancel={onCancel}
        />,
        document.getElementById("portal-modal-front")
      )}
    </React.Fragment>
  );
};

export default DeleteModal;
