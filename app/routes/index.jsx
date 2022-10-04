import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { atom, useAtom } from "jotai";
import { Button, Form as bForm, Modal } from "react-bootstrap";
import DefaultHeader from "~/components/default-header";
import homeStyles from "~/styles/home.css";

export const links = () => [{ rel: "stylesheet", href: homeStyles }];

const modalTypeAtom = atom("");

export const action = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const response = await fetch(
    `http://ec2-3-83-120-234.compute-1.amazonaws.com:8080/detective/data?userName=${username}`,
    {
      method: "post",
    }
  );
  const json = await response.json();
  console.log(json);
  return redirect(`/lobbies/${json.data}`);
};

export default function Index() {
  const setModalType = useAtom(modalTypeAtom)[1];
  return (
    <>
      <DefaultHeader />
      <div className="home-page">
        <div className="container">
          <h1 className="title">Detective</h1>
          <button
            type="button"
            className="btn-main"
            onClick={() => setModalType("host-new-game")}
          >
            HOST NEW GAME
          </button>
          <button
            type="button"
            className="btn-main"
            onClick={() => setModalType("join-game")}
          >
            JOIN GAME
          </button>
        </div>
      </div>
      <GameModal />
    </>
  );
}

const usernameAtom = atom("");

const GameModal = () => {
  const [show, handleClose] = useAtom(modalTypeAtom);
  const setUsername = useAtom(usernameAtom)[1];
  return (
    <Modal
      size="sm"
      show={show}
      onHide={() => handleClose("")}
      centered
      autoFocus
    >
      <Modal.Body className="game-modal">
        <img
          src="https://www.spyfall.app/assets/spy_black-917b12c1334faadf3cb4aab01573054ccc9e3d284d893c2b3f1bc1f257693682.png"
          alt="site logo"
          width="40"
          height="auto"
        />
        <h6>What's your name, detective?</h6>
        <Form action="/?index" method="post" className="form">
          <bForm.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            autoFocus
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="off"
          />
          <SubmitForm />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const SubmitForm = () => {
  const username = useAtom(usernameAtom)[0];
  return (
    <Button type="submit" className="btn btn-danger" disabled={!username}>
      Let's Go
    </Button>
  );
};
