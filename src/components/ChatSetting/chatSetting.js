import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

function ChatSetting(props) {
    
    const login_token = localStorage.getItem("login-token");
    const [socketConnected, setSocketConnected] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);
  const [items, setItems] = useState([]);
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
              const notification = new Notification(data.message.substring(2));
              notification.onclick = () => {
                window.location.href = "http://localhost:3000/chat";
                notification.close();
              };
            }
            if(data.type=="notificationFromChat"){
              const notification = new Notification(data.message);
              notification.onclick = () => {
                window.open(`/chat?waitingId=${data.waitingId}&teamLeader=${data.teamLeader}&mode=user`, "_blank", "width=450,height=650");
                notification.close();
              };
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
      ws.current.send("AUTH:" + login_token);
      setSendMsg(true);
    }
  }, [socketConnected]);
    return (
        <div>
            
        </div>
    );
}

export default ChatSetting;