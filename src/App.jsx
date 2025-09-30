import { Outlet } from "react-router-dom";
import { Logo } from "./components/Logo/Logo";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container
      fluid
      style={{
        padding: "0px",
        margintop: "0px",
      }}
    >
      <Outlet />
    </Container>
  );
}

export default App;
