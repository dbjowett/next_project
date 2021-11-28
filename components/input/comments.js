import { useState, useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const URL = `/api/comments/${eventId}`;

  const [showComments, setShowComments] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch(URL)
        .then((res) => res.json())
        .then((data) => setCurrentComments(data.comments));
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    const jsonComments = JSON.stringify(commentData);
    const config = {
      method: 'POST',
      body: jsonComments,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(URL, config)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={currentComments} />}
    </section>
  );
}

export default Comments;
