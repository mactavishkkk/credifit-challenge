import React from 'react';
import './AssistantMessage.css';
import AssistantIcon from '../../assets/assistant.svg';

const AssistantMessage = ({ message }) => {
    return (
        <div className="assistant-message-container">
            <img src={AssistantIcon} alt="Assistant" className="assistant-icon" />
            <div className="assistant-message">
                {message}
            </div>
        </div>
    );
};

export default AssistantMessage;
