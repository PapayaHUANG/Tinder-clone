import { useState } from 'react';
import { addMessage } from '../utils/crud';

export default function ChatInput({
  user,
  clickedUser,
  getUsersMessages,
  getClickedUserMessages,
}) {
  const [textArea, setTextArea] = useState('');

  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const fetchMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };
    try {
      await addMessage(message);
      getUsersMessages();
      getClickedUserMessages();
      setTextArea('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button className="secondary-button" onClick={fetchMessage}>
        Submit
      </button>
    </div>
  );
}
