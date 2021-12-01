import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);
  const URL = `/api/comments/${eventId}`;

  const [showComments, setShowComments] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setCurrentComments(data.comments);
          setIsLoading(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Submitting Comment',
      message: 'Your comment is being stored.',
      status: 'pending'
    });

    const jsonComments = JSON.stringify(commentData);

    const config = {
      method: 'POST',
      body: jsonComments,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(URL, config)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Registered comment!',
          status: 'success'
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'There has been an error submitting your comment.',
          status: 'error'
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isLoading && <CommentList comments={currentComments} />}
      {showComments && isLoading && <h1>Loading....</h1>}
    </section>
  );
}

export default Comments;
