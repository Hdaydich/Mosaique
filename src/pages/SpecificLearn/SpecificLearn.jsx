import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import s from "./style.module.css";
import { ShapeGame } from "../ShapeGame/ShapeGame";
import { NavBar } from "../../components/NavBar/NavBar";
import { PuzzleGame } from "../PuzzleGame/PuzzleGame";

const themes = [
  {
    title: "Attention",
    subtitle: "Ameliorer la concentration et le repère.",
    icon: <Icon.EyeFill size={36} color="#E74C3C" />,
    component: <ShapeGame />,
    bgc: "#ffd6edff",
  },
  {
    title: "Logique",
    subtitle: "Stimuler l'esprit logique.",
    icon: <Icon.PuzzleFill size={36} color="#06b4c4ff" />,
    component: <PuzzleGame />,
    bgc: "#98f7f0ff",
  },
  {
    title: "Chiffres",
    subtitle: "Joue avec les chiffres et améliore tes calculs mentaux.",
    icon: <Icon.CalculatorFill size={36} color="#27AE60" />,
    component: <p>Jeu des chiffres 🔢</p>,
    bgc: "#f9ffccff",
  },
  {
    title: "Lettres",
    subtitle: "Amuse-toi avec les lettres et améliore ton vocabulaire.",
    icon: <Icon.TypeBold size={36} color="#F1C40F" />,
    component: <p>Jeu des lettres ✍️</p>,
    bgc: "#EAD6FF",
  },
];

export function SpecificLearn() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [level, setLevel] = useState("facile");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const levelRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const handleLevelSelect = (lvl) => {
    setLevel(lvl);
  };

  const renderSidebar = () => (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "14px",
        marginBottom: isMobile ? "20px" : "0",
        position: isMobile ? "static" : "fixed",
        top: isMobile ? "auto" : "50%",
        left: isMobile ? "auto" : "0",
        transform: isMobile ? "none" : "translateY(-50%)",
        marginLeft: isMobile ? 0 : "10px",
      }}
    >
      {themes.map((t, i) => (
        <div
          key={i}
          onClick={() => handleThemeSelect(t)}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            backgroundColor: t.bgc,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {t.icon}
        </div>
      ))}
    </div>
  );

  return (
    <Container fluid className={s.mainContainer}>
      <NavBar logoWidth="80px" police="5px"></NavBar>

      {!selectedTheme ? (
        <div
          style={{
            width: isMobile ? "90%" : "50%",
            margin: "50px auto",
            textAlign: "center",
          }}
        >
          <h4 style={{ marginBottom: "50px" }}>📚 Choisis un thème</h4>
          <Row className="justify-content-center">
            {themes.map((t, i) => (
              <Col key={i} xs={6} sm={6} md={6} lg={6} className="mb-3">
                <Card
                  style={{
                    backgroundColor: t.bgc,
                    cursor: "pointer",
                    border: "none",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                    minHeight: isMobile ? "200px" : "150px",
                  }}
                  onClick={() => handleThemeSelect(t)}
                >
                  <Card.Body className="text-center">
                    <h4 className="mt-2">{t.title}</h4>
                    <div style={{ fontSize: "26px" }}>{t.icon}</div>
                    <p style={{ fontSize: "14px", marginTop: "4px" }}>
                      {t.subtitle}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {renderSidebar()}
          <div
            style={{
              width: isMobile ? "100%" : "auto",
              maxWidth: "100%",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              borderRadius: "18px",
              padding: isMobile ? "10px" : "10px",
            }}
          >
            {React.cloneElement(selectedTheme.component, { isMobile })}
          </div>
        </div>
      )}
    </Container>
  );
}
