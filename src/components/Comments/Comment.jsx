import React from 'react';

import './comment.css';

function Comment(props) {
  const { comment } = props;
  const { text, user } = comment;

  return (
    <div class="comment-container">
      <p class="comment-user">{user}</p>
      <p>{text}</p>
    </div>
  );
}

export default Comment;
