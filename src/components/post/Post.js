import React from "react";
import classes from "./Post.module.css";
import { useSelector } from "react-redux";
import TrashIcon from "../icons/TrashIcon";
import EditIcon from "../icons/EditIcon";
import IconButton from "../iconButton/IconButton";

const getStringElapsedTime = (createdDatetime) => {
  const now = new Date();
  const diffDays = now.getDate() - createdDatetime.getDate();
  if(diffDays > 0) {
    return  diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  }
  const diffHours = now.getHours() - createdDatetime.getHours();
  if(diffHours > 0) {
    return  diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  }
  const diffMinutes = now.getMinutes() - createdDatetime.getMinutes();
  if(diffMinutes > 0) {
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`
  }
  const diffSeconds = now.getSeconds() - createdDatetime.getSeconds();
  return diffSeconds === 1 ? '1 second ago' : `${diffSeconds} seconds ago`
}

export default function Post({ post, onClickDelete, onClickEdit }) {
  const elapsedTimeSinceCreation = getStringElapsedTime(new Date(post.created_datetime));
  const currentUsername = useSelector(state => state.username);

  return (
    <div className={classes.content} key={post.id}>
      <div className={classes.header}>
        <h3>{ post.title }</h3>
        {
          (currentUsername === post.username) &&
          <div>
            <IconButton onClick={() => onClickDelete(post)}>
              <TrashIcon />
            </IconButton>
            <IconButton onClick={() => onClickEdit(post)}>
              <EditIcon />
            </IconButton>
          </div>
        }
      </div>
      <div className={classes.body}>
        <div className={classes["body-header"]}>
          <span>
            <strong>@{ post.username }</strong>
          </span>
          <span>{ elapsedTimeSinceCreation }</span>
        </div>
        <p>
          { post.content }
        </p>
      </div>
    </div>
  );
}
