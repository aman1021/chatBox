import React, { useEffect, useState } from "react";
import "./Chat.css";

const ChatBox = ({ onClose, id, onChange, messageTable }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const el = document.querySelector(".message-box");
    if (el && el.scrollHeight >300) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messageTable]);

  const onSending = () => {
    if (value == "") {
      return;
    }
    onChange(value, id);
    setValue("");
  };

  return (
    <div className="container">
      <div className="closeChat" onClick={() => onClose(id)}>
        ❌
      </div>
      <div className="message-box">
        {messageTable.map(({ sentBy, value }) => {
          if (sentBy === id) {
            return (
              <div className="text right-align" style={{ marginLeft: 30 }}>
                {value}
              </div>
            );
          }
          return <div className="text">{value}</div>;
        })}
      </div>
      <div className="messageArea">
        <input
          className="inputArea"
          type="text"
          placeholder="Enter a message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="sendButton" onClick={onSending}>
          {" "}
          ⏩{" "}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
