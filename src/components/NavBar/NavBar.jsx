import { Container, Nav, Navbar } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import s from "./style.module.css";
import { Logo } from "../Logo/Logo";

export function NavBar({ logoWidth = 120, police = 10 }) {
  const location = useLocation();

  // Vérifie si la page actuelle est la Home
  const isHomePage = location.pathname === "/";

  // Hauteur dynamique
  const navbarHeight = isHomePage ? "50px" : "100px";

  return (
    <Navbar
      className={s.navbar}
      style={{ height: navbarHeight, minHeight: navbarHeight }}
    >
      <Container className={s.navContainer}>
        <Nav>
          {!isHomePage && (
            <Nav.Link href="/" className={s.logo}>
              <Logo
                subtitle="Chaque enfant, une pièce unique"
                width={logoWidth}
                police={police}
                align="center"
              />
            </Nav.Link>
          )}
        </Nav>

        <Nav>
          <Nav.Link href="/signup" className={s.icon}>
            <PersonCircle size={22} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
