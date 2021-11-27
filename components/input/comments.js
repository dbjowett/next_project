import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    if (showComments) {
      fetch('/api/comment', { method: 'GET' })
        .then((res) => res.json())
        .then((data) => setCurrentComments(data));
    }
  }

  function addCommentHandler(commentData) {
    const jsonComments = JSON.stringify(commentData);
    const config = {
      method: 'POST',
      body: jsonComments
    };

    fetch('/api/comment', config);
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
