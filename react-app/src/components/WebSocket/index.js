import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import "./web.css"

let socket;

const Chat = () => {
  const [ chatInput, setChatInput ] = useState("");
  const [ messages, setMessages ] = useState([]);
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    // open socket connection
    // create websocket
    if (process.env.REACT_APP_ENV === "production") socket = io.connect('https://casualink.onrender.com/');
    else socket = io.connect('http://localhost:5000/');

    socket.on("chat", (chat) => {
      setMessages(messages => [ ...messages, chat ])
    })
    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [])

  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit("chat", { user: user.username, msg: chatInput });
    setChatInput("")
  }

  return (user && (
    <div className="chat">
      <div className="messages-box">
        {messages.map((message, ind) => (
          <div key={ind}>{`${message.user}: ${message.msg}`}</div>
        ))}
      </div>
      <form onSubmit={sendChat}>
        <input
          value={chatInput}
          onChange={updateChatInput}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
  )
};
