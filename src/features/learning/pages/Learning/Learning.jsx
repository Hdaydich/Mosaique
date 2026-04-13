import { Container, Row, Col } from "react-bootstrap";
import s from "./style.module.css";
import { SlideBar } from "../../components/SlideBar/SlideBar";
import { Plus, Dash, X, Slash } from "react-bootstrap-icons";

export function Learning() {
  const sections = [
    { title: "Lettres", image: "/assets/lang.png", path: "lettres" },
    { title: "Chiffres", image: "/assets/chiffre.png", path: "chiffres" },
    {
      title: "Calcul",
      path: "calcul",
      items: [
        { icon: <Plus />, type: "plus" },
        { icon: <Dash />, type: "minus" },
        { icon: <Slash />, type: "divide" },
        { icon: <X />, type: "multiply" },
      ],
    },
  ];

  return (
    <Container fluid>
      <Row className={s.heroRow}>
        {/* ===== TEXTE + SLIDEBAR (DESKTOP) ===== */}
        <Col lg={7} className={s.heroContent}>
          <div className={s.headerContainer}>
            <h1 className={s.title}>Apprendre en s&apos;amusant !</h1>
            <p className={s.subtitle}>
              Des activités ludiques pour apprendre en douceur
            </p>
          </div>

          <div className={s.slideContainer}>
            <SlideBar sections={sections} />
          </div>
        </Col>

        {/* ===== IMAGE HERO ===== */}
        <Col lg={5} className={s.heroImageContainer}>
          <img
            src="/assets/learn.png"
            alt="Apprentissage ludique"
            className={s.mainImage}
          />
        </Col>

        {/* ===== SLIDEBAR MOBILE ===== */}
        <Col className={s.slideContainerMob}>
          <SlideBar sections={sections} />
        </Col>
      </Row>
    </Container>
  );
}
