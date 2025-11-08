import { Container, Nav, Navbar } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import s from "./style.module.css";
import { Logo } from "../Logo/Logo";
import { useLocation, useNavigate } from "react-router-dom";

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleScrollToActivities = (id) => {
    if (location.pathname !== "/") {
      // Si on n'est pas sur la home → redirige vers la home avec l'info de la section
      navigate("/", { state: { scrollTo: id } });
    } else {
      // Si on est déjà sur la home → scrolle directement
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Navbar expand="lg">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/">
          <Logo
            subtitle="Chaque enfant, une pièce unique"
            width={120}
            police={9}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className={s.toggler} />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex flex-column flex-lg-row align-items-center gap-3 gap-lg-4">
            <button
              onClick={() => {
                navigate("/");
              }}
              className={s.navLink}
            >
              Acceuil
            </button>
            <button
              onClick={() => handleScrollToActivities("activités")}
              className={s.navLink}
            >
              Activités
            </button>
            <button
              onClick={() => handleScrollToActivities("apropos")}
              className={s.navLink}
            >
              Qui sommes-nous ?
            </button>

            <Nav.Link href="/signup" className={s.icon}>
              <PersonCircle size={22} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
