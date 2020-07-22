import React, { useState, useCallback } from 'react';
import { TextField } from '@shopify/polaris';

import Comment from '../Comments';
import CommentsContainerFooter from '../CommentsContainerFooter'

import './CommentContainer.css';

function CommentsContainer(props) {
  const { comments, handleCommentOnChange } = props;

  const [value, setValue] = useState('');
  const handleChange = useCallback((newValue) => setValue(newValue), []);

  const commentMarkup = (comment, index) => {
    return (
      <Comment key={index} comment={comment} />
    );
  }

  const commentMarkups = comments.map(commentMarkup);

  function keyPress(e) {
    if (e.keyCode == 13 && value !== '') {
      handleCommentOnChange(value);
      setValue('');
    }
  }

  return (
    <div class="comments-container-height-adjust">
      <h2>Comments</h2>
      <div class="comments-container">
        {commentMarkups}
      </div>
      <div onKeyDown={keyPress}>
        <TextField value={value} onChange={handleChange} onKeyDown={keyPress} placeholder='Leave a comment' />
      </div>
      <CommentsContainerFooter />
    </div>
  );
}

export default CommentsContainer;
