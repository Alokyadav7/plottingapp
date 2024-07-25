import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Poll from './Poll';

const PollList = () => {
    const [polls, setPolls] = useState([]);
    const socket = io('http://localhost:5000');

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const result = await axios.get('http://localhost:5000/api/polls');
                setPolls(result.data);
            } catch (error) {
                console.error('Error fetching polls:', error);
            }
        };
        fetchPolls();

        socket.on('pollUpdated', (poll) => {
            setPolls((polls) =>
                polls.map((p) => (p._id === poll._id ? poll : p))
            );
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <div>
            {polls.map((poll) => (
                <Poll key={poll._id} poll={poll} />
            ))}
        </div>
    );
};

export default PollList;
