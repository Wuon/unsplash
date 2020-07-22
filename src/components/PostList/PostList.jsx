import React from 'react';
import Post from '../Post';

import './PostList.css'

const PostList = (props) => {
  const posts = props.posts.map((post) => {
    return <Post key={post.id} post={post} />
  })
  return (
  <div className="image-list">
    { posts }
  </div>
  );
};

export default PostList
