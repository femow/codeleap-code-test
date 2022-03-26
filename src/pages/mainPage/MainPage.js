import React, { useEffect, useLayoutEffect, useState } from 'react'
import classes from './MainPage.module.css'
import PostForm from '../../components/postForm/PostForm'
import Post from '../../components/post/Post'
import DeleteModal from '../../components/deleteModal/DeleteModal';
import EditModal from '../../components/editModal/EditModal';

export default function MainPage () {
    const [posts, setPosts] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);
    const [onDeleteModal, setOnDeleteModal] = useState(false);
    const [onEditModal, setOnEditModal] = useState(false);
    const URL_CODELEAP_API = process.env.REACT_APP_CODELEAP_API;
    const [currentPost, setCurrentPost] = useState(null);

    useLayoutEffect(() => {
        fetchGetPosts();
    }, []);
    
    useEffect(() => {
        if(refreshPage) {
            fetchGetPosts();
            setRefreshPage(false);
        }
    }, [refreshPage])

    const fetchGetPosts = () => {
        fetch(URL_CODELEAP_API).then(response => response.json()).then(data => {
            setPosts(data.results);
        })
    }

    const onClickDelete = post => {
        setCurrentPost(post);
        setOnDeleteModal(true);
    }

    const onClickEdit = post => {
        setCurrentPost(post);
        setOnEditModal(true);
    }

    const onDeleteHandler = async () => {
        const response = await fetch(`${URL_CODELEAP_API}${currentPost.id}/`, {
            method: 'DELETE'
        })
        setCurrentPost(null);
        setOnDeleteModal(false);
        if(response.ok) {
            setRefreshPage(true);
        }
    }

    const onEditHandler = async (title, content) => {
        await fetch(`${URL_CODELEAP_API}${currentPost.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
        setCurrentPost(null);
        setOnEditModal(false);
        setRefreshPage(true);
    }

    return (
        <React.Fragment>
            {onDeleteModal && <DeleteModal onCancel={() => setOnDeleteModal(false)} onOk={onDeleteHandler}/>}
            {onEditModal && <EditModal onCancel={() => setOnEditModal(false)} onOk={onEditHandler} currentPost={currentPost}/>}
            <div className={classes.main}>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <h3>CodeLeap Network</h3>
                    </div>
                    <div className={classes.posts}>
                        <PostForm onRefreshPage={setRefreshPage}/>
                        {
                            posts.map(post => 
                                <Post key={post.id} post={post} onClickDelete={onClickDelete} onClickEdit={onClickEdit}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};