import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Chat.css";
function Chat() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const waitingId = searchParams.get("waitingId");
  const teamLeader = searchParams.get("teamLeader");
  const mode = searchParams.get("mode");

  window.scrollTo(0, document.body.scrollHeight);



  const [socketConnected, setSocketConnected] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const webSocketUrl = "ws://1871166.iptime.org:8080/sock";

  let ws = useRef(null);
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(webSocketUrl);
      ws.current.onopen = () => {
        console.log("connected to " + webSocketUrl);
        setSocketConnected(true);
      };
      ws.current.onclose = (error) => {
        console.log("disconnect from " + webSocketUrl);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error " + webSocketUrl);
        console.log(error);
      };
      ws.current.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        console.log(data);
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            // 알림 생성
            if (data.type == "notification") {
              const notification = new Notification(data.message);
              notification.onclick = () => {
                window.location.href = "http://localhost:3000/mypage/team";
                notification.close();
              };
            }
            if (data.type == "message") {
              console.log("서버로 부터 : " + data.message);
              setItems((pre) => [...pre, data.message]);
            }
          }
        });
      };
    }

    return () => {
      console.log("clean up");
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (socketConnected) {
      ws.current.send(`enterRoom:${waitingId}##${login_token}`);
    }
  }, [socketConnected]);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (message != "") handleSendMessage(message);
      setMessage("");
    }
  };
  useEffect(() => {
    const chatBody = document.querySelector(".chat-body");
    chatBody.scrollTop = chatBody.scrollHeight;
  }, [items]);
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  const handleSendMessage = (message) => {
    if (message != "") {
      if (mode == "team") {
        console.log(mode);
        ws.current.send(`ROOM:${waitingId}##${userId}##${message}`);
      }
      if (mode == "user") {
        console.log(mode);
        ws.current.send(`ROOM:${waitingId}##${teamLeader}##${message}`);
      }
      setItems([...items, "m:" + message]);
    }
  };
  function makeLink(str) {
    // 정규표현식을 이용해 문자열에서 URL 패턴을 찾아내고 링크로 변환
    const regex = /(https?:\/\/[^\s]+)/g;
    return str.replace(
      regex,
      (match) => `<a href="${match}" target="_blank">${match}</a>`
    );
  }
  function isUrl(str) {
    const pattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/i;
    return pattern.test(str);
  }
  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">Open Chat</div>
        <div className="chat-body">
          {items.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.substring(0, 2) == "m:" ? "chat-message-mine" : ""
              }`}
            >
              <div
                className={`chat-message-content ${
                  msg.substring(0, 2) == "m:" ? "chat-message-content-mine" : ""
                }`}
              >
                {isUrl(msg.substring(2)) == false ? (
                  msg.substring(2)
                ) : (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: makeLink(msg.substring(2)),
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            className="
            chat-input"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="chat-button"
            onClick={() => handleSendMessage(message)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
export default Chat;