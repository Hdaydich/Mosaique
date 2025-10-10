import { Outlet } from "react-router-dom";
import { Logo } from "./components/Logo/Logo";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container
      fluid
      style={{
        padding: "0px",
        marginTop: "0px",
      }}
    >
      <div style={{ display: "none" }}>
        <a href="/">Home</a>
        <a href="/Logic">Logic</a>
        <a href="/Parent">Parent</a>
        <a href="/Reading">Reading</a>
        <a href="/SpecificLearn">SpecificLearn</a>
        <a href="/NotFound">NotFound</a>
      </div>
      <Outlet />
    </Container>
  );
}

export default App;
