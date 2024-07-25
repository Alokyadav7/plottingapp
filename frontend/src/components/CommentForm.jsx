import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ pollId }) => {
    const [comment, setComment] = useState('');

    const submitComment = async () => {
        if (comment.trim() === '') {
            alert('Comment cannot be empty');
            return;
        }
        try {
            await axios.post(`http://localhost:5000/api/polls/${pollId}/comment`, { user: 'User', text: comment });
            setComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <div>
      <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
      />
            <button onClick={submitComment}>Submit Comment</button>
        </div>
    );
};

export default CommentForm;
