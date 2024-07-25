import React, { useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';

const Poll = ({ poll }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const vote = async () => {
        if (selectedOption) {
            try {
                await axios.post(`http://localhost:5000/api/polls/${poll._id}/vote`, { optionId: selectedOption });
            } catch (error) {
                console.error('Error voting:', error);
            }
        }
    };

    return (
        <div>
            <h2>{poll.question}</h2>
            {poll.options.map((option) => (
                <div key={option._id}>
                    <input
                        type="radio"
                        name="pollOption"
                        value={option._id}
                        onChange={() => setSelectedOption(option._id)}
                    />
                    {option.text}
                </div>
            ))}
            <button onClick={vote}>Vote</button>
            <CommentForm pollId={poll._id} />
        </div>
    );
};

export default Poll;
