import { useParams } from "@remix-run/react";
import lobbyStyles from "~/styles/lobbies/lobby.css";

import DefaultHeader from "~/components/default-header";
import useCopyToClipboard from "~/hooks/useCopyToClipboard";
import { Toast, ToastContainer } from "react-bootstrap";
import Players from "~/container/lobbies/lobby/Players";
import { over } from "stompjs";

import { useEffect, useRef } from "react";

export const links = () => [
  { rel: "stylesheet", href: lobbyStyles },
  {
    rel: "preload",
    href: "https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.6.1/sockjs.min.js",
    as: "script",
  },
];

export default function Lobby() {
  const params = useParams();
  const [value, copy] = useCopyToClipboard();
  const stompClient = useRef(null);
  useEffect(() => {
    const onConnected = (stompClient) => {
      stompClient.subscribe(`/chatroom/${params.lobby}`, onMessageReceived);
    };
    const onError = (err) => {
      console.log(err);
    };
    const onMessageReceived = (payload) => {
      var payloadData = JSON.parse(payload.body);
      console.log("message:", payloadData);
    };
    async function connect() {
      try {
        const sock = new window.SockJS(
          "http://ec2-3-83-120-234.compute-1.amazonaws.com:8080/ws",
          {
            debug: false,
          }
        );
        stompClient.current = over(sock);
        await stompClient.current.connect(
          { debug: false },
          () => onConnected(stompClient.current),
          onError
        );
      } catch (error) {
        console.log(error);
      }
    }
    connect();
  }, []);
  return (
    <>
      <DefaultHeader>
        <div className="d-flex align-items-center">
          <h5>Invite Code: </h5>
          <button
            className="copy-invite-code"
            onClick={() => copy(params.lobby)}
          >
            {params.lobby}
          </button>
        </div>
      </DefaultHeader>
      <Players />
      <ToastContainer position="top-center">
        <Toast
          delay={3000}
          autohide
          bg="success"
          style={{ width: "fit-content" }}
          show={value}
        >
          <Toast.Header closeButton={false}>Invite code Copied!</Toast.Header>
        </Toast>
      </ToastContainer>
    </>
  );
}
