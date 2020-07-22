import React from 'react';
import { Icon } from '@shopify/polaris';
import { ShareMinor, UpdateInventoryMajorMonotone } from '@shopify/polaris-icons';

import './CommentsContainerFooter.css'

function CommentsContainerFooter() {
  return (
    <div class="comment-footer-container">
      <div class="comment-footer-link">
        <p class="comment-footer-text">Share</p>
      </div>
      <p class="comment-footer-divider">|</p>
      <div class="comment-footer-link">
        <p class="comment-footer-text">Save</p>
      </div>
    </div>
  );
}

export default CommentsContainerFooter;
