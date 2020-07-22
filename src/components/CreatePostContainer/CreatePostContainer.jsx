import React, { useState, useCallback } from 'react';

import { Button, Card, Form, FormLayout, Page, TextField, Toast } from '@shopify/polaris';

import ImageDropZone from '../ImageDropZone';

import './CreatePostContainer.css'

function CreatePostContainer() {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('')
  const [active, setActive] = useState(false);

  const handleTitleChange = useCallback((newValue) => {
    if (newValue !== "") {
      setValueError("");
    }
    setValue(newValue)
  }, []);

  const handleSubmit = () => {
    console.log(value);
    if (value === "") {
      
      setValueError("Post title is required");
    } else {
      setValue("");
      setValueError("");
      toggleActive();
    }
  };

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Post created!" onDismiss={toggleActive} />
  ) : null;

  return (
    <Page title='Create a new post'>
      <div class="form-spacer"></div>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <Card title="Fill out the following information below">
            <Card.Section>
              <TextField label="Post title" value={value} onChange={handleTitleChange} error={valueError} />
              <div class="form-spacer"></div>
              <ImageDropZone />
              <div class="form-spacer"></div>
              <Button submit>Submit</Button>
            </Card.Section>
          </Card>
        </FormLayout>
      </Form>
      {toastMarkup}
    </Page>
  );
}

export default CreatePostContainer;
