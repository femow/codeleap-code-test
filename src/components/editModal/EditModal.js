import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Button from "../button/Button";
import InptuText from "../inputText/InputText";
import classes from "./EditModal.module.css";

const BackModal = ({ onCancel }) => {
  return <div className={classes.back} onClick={onCancel} />;
};

const FrontModal = ({ onOk, currentPost }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [onLoading, setOnLoading] = useState(false);

    useEffect(() => {
        if(currentPost === null) return;
        setTitle(currentPost.title);
        setContent(currentPost.content);
        setOnLoading(false);
    }, [currentPost])

    const onSubmitHandler = e => {
      if(currentPost === null) return;
        e.preventDefault();
        setOnLoading(true);
        onOk(title, content);
    }

  return (
    <div className={classes.front}>
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <h3>Edit item</h3>
            <label >Title</label>
            <InptuText placeholder='Hello world' value={title} onChangeInputText={e => setTitle(e.target.value)}/>
            <label>Content</label>
            <textarea placeholder='Content here' value={content} onChange={e => setContent(e.target.value)}/>
            <Button value="SAVE" type="submit" disabled={onLoading}/>
        </form>
    </div>
  );
};

const EditModal = ({ onOk, onCancel, currentPost }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackModal onCancel={onCancel} />,
        document.getElementById("portal-modal-back")
      )}
      {ReactDOM.createPortal(
        <FrontModal
          onOk={onOk}
          currentPost={currentPost}
        />,
        document.getElementById("portal-modal-front")
      )}
    </React.Fragment>
  );
};

export default EditModal;
