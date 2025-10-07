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
    icon: <Icon.EyeFill size={26} color="#E74C3C" />,
    component: <ShapeGame />,
    bgc: "#ffd6edff",
  },
  {
    title: "Logique",
    icon: <Icon.PuzzleFill size={26} color="#06b4c4ff" />,
    component: <PuzzleGame />,
    bgc: "#98f7f0ff",
  },
  {
    title: "Chiffres",
    icon: <Icon.CalculatorFill size={26} color="#27AE60" />,
    component: <p>Jeu des chiffres 🔢</p>,
    bgc: "#f9ffccff",
  },
  {
    title: "Lettres",
    icon: <Icon.TypeBold size={26} color="#F1C40F" />,
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
            margin: "80px auto",
            textAlign: "center",
          }}
        >
          <h4 style={{ marginBottom: "30px" }}>📚 Choisis un thème</h4>
          <Row className="justify-content-center">
            {themes.map((t, i) => (
              <Col key={i} xs={12} sm={6} md={6} lg={6} className="mb-3">
                <Card
                  style={{
                    backgroundColor: t.bgc,
                    cursor: "pointer",
                    border: "none",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                  }}
                  onClick={() => handleThemeSelect(t)}
                >
                  <Card.Body className="text-center">
                    <div style={{ fontSize: "26px" }}>{t.icon}</div>
                    <h6 className="mt-2">{t.title}</h6>
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
            marginTop: "30px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {renderSidebar()}

          <div
            style={{
              width: "100%",
              maxWidth: "800px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {React.cloneElement(selectedTheme.component, { level, isMobile })}
          </div>
        </div>
      )}
    </Container>
  );
}
