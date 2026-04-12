import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Plus, Dash, X, Slash } from "react-bootstrap-icons";
import s from "./style.module.css";
import { SlideBar } from "../SlideBar/SlideBar";

export function LearnChoice() {
  const { type } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const letters = state?.letters || [];
  const language = state?.language || "ar";

  const sections = [
    { title: "Lettres", image: "/assets/fr.png" },
    { title: "Chiffres", image: "/assets/chiffre.png" },
    {
      title: "Calcul",
      items: [
        { icon: <Plus />, type: "plus" },
        { icon: <Dash />, type: "minus" },
        { icon: <X />, type: "multiply" },
        { icon: <Slash />, type: "divide" },
      ],
    },
  ];

  return (
    <Container fluid className={s.mainContainer}>
      <Row>
        <Col lg={3}>
          <SlideBar sections={sections} selectedItem={type} />
        </Col>
        <Col lg={9} className={s.actContainer}>
          <Row>
            {/* ===== CONTENU PRINCIPAL ===== */}
            <Col lg={9} className={s.content}>
              <h1 className={s.title}>{type}</h1>

              <div className={s.centerBox}>
                <img
                  src={
                    language === "ar"
                      ? "/assets/arabic-kids.png"
                      : "/assets/french-kids.png"
                  }
                  alt="illustration"
                  className={s.illustration}
                />

                <p className={s.helperText}>
                  {language === "ar"
                    ? "اختر حرفًا لتبدأ التعلم"
                    : "Choisis une lettre pour commencer"}
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
