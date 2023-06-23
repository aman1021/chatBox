import React, { useEffect } from "react";
import ChatBox from "../ChatCard/ChatBox";
import { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [boxArray, setBoxArray] = useState([]);
  const [messageTable, setMessageTable] = useState([])

  useEffect(()=>{
    const boxArray = window.localStorage.getItem('box_array') || '[]'
    setBoxArray(JSON.parse(boxArray))
    const messageList = window.localStorage.getItem('message_list') || '[]'
    setMessageTable(JSON.parse(messageList))
  }, [])

  const createChatBox = () => {
    const newArr = [ ...boxArray, {id: new Date().getTime()}]
    setBoxArray(newArr);
    window.localStorage.setItem('box_array', JSON.stringify(newArr))
  };

  const onClose = (cur_id) => {
    const newArr = boxArray.filter(({id}) => id != cur_id)
    setBoxArray(newArr)
    window.localStorage.setItem('box_array', JSON.stringify(newArr))
    if(newArr.length === 0){
        window.localStorage.setItem('message_list', JSON.stringify([]));
        setMessageTable([])
    }
  }

  const onChange = (value, curId) => {
    const newMessagesList = [...messageTable, {value, time: new Date(), sentBy: curId}]
    setMessageTable(newMessagesList);
    window.localStorage.setItem('message_list', JSON.stringify(newMessagesList))
  }

  return (
    <div className="footer-box">
      {boxArray.map((item) => <ChatBox {...item} onClose={onClose} onChange={onChange} messageTable={messageTable} />)}
      <button className="chatButton" onClick={createChatBox}>
        create chatBox
      </button>
    </div>
  );
};

export default Footer;
