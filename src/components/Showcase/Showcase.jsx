import React, { useCallback, useState, useEffect } from 'react';
import { Card, Layout } from '@shopify/polaris';

import CommentsContainer from '../CommentsContainer';
import unsplash from '../../api/unsplash';

import './Showcase.css';

const comments = [
  {
    user: 'test1@unsplash.com',
    text: 'hahaha!',
  },
  {
    user: 'test2@unsplash.com',
    text: '😂😂😂',
  },
  {
    user: 'test3@unsplash.com',
    text: 'this meme format is gold xD',
  },
  {
    user: 'test4@unsplash.com',
    text: 'where can I find this template?',
  },
  {
    user: 'test5@unsplash.com',
    text: 'I see that everyone else is slacking :^)',
  }
]

const Showcase = ({match}) => {
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);

  const { params: { postId } } = match;

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async() => {
    const response = await unsplash.get(`/photos/${postId}`);
    setPost(response.data);
    setLoaded(true);
  };

  if (loaded) {
    return (
      <Layout>
        <Layout.Section>
          <img class="post-image" src={post.urls.regular} />
        </Layout.Section>
        <Layout.Section secondary>
          <Card title={post.alt_description} sectioned>
            <p class="post-creator">Posted by: {post.user.instagram_username}</p>
            <CommentsContainer comments={comments} />
          </Card>
        </Layout.Section>
      </Layout>
    );
  } else {
    return (<> loading </>)
  }
}

export default Showcase;
