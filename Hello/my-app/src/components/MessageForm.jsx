import { useState } from 'react';
import { SendOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
    isTyping(props, chatId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }

    setValue('');
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <TextareaAutosize aria-label="empty textarea"
              className="message-input"
              placeholder="Write a message..."
              value={value}
              onChange={handleChange}
              onSubmit={handleSubmit} 
      />;

      
      <label htmlFor="upload-button">
        <span className="image-button">
          <PlusCircleOutlined className="picture-icon" style={{ fontSize: '25px', color: '#EFA985' }} />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" style={{ fontSize: '25px', color: '#EFA985' }} />
      </button>
    </form>
  );
};

export default MessageForm;