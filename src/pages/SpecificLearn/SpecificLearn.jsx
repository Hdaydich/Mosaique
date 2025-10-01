// SpecificLearn.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Logo } from "../../components/Logo/Logo";
import s from "./style.module.css";
import { ShapeGame } from "../ShapeGame/ShapeGame";
const themes = [
  {
    title: "Attention",
    icon: <Icon.EyeFill size={30} color="#E74C3C" />,
    component: <ShapeGame />,
    bgc: "#ffd6edff",
    description: "Exerce ton attention en trouvant les formes cachées",
  },
  {
    title: "Logique",
    icon: <Icon.PuzzleFill size={30} color="#06b4c4ff" />,
    component: <p>Jeu logique 🧩</p>,
    bgc: "#98f7f0ff",
    description: "Résous des énigmes et développe ta logique",
  },
  {
    title: "Chiffres & Quantité",
    icon: <Icon.CalculatorFill size={30} color="#27AE60" />,
    component: <p>Jeu des chiffres 🔢</p>,
    bgc: "#f9ffccff",
    description: "Compter, comparer et jouer avec les chiffres",
  },
  {
    title: "Qui suis-je (Lettres)",
    icon: <Icon.TypeBold size={30} color="#F1C40F" />,
    component: <p>Jeu des lettres ✍️</p>,
    bgc: "#EAD6FF",
    description: "Apprends les lettres et forme des mots",
  },
];

export function SpecificLearn() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [level, setLevel] = useState("facile");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderLevels = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        margin: "0px auto",
        marginBottom: isMobile ? "50px" : "20px",
      }}
    >
      {["facile", "medium", "hard"].map((lvl) => {
        const active = lvl === level;
        const size = isMobile ? (active ? 25 : 20) : active ? 30 : 25;
        const bgColor =
          lvl === "facile"
            ? "#08de0fff"
            : lvl === "medium"
            ? "#FF9800"
            : "#F44336";
        return (
          <div
            key={lvl}
            onClick={() => setLevel(lvl)}
            title={lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              backgroundColor: bgColor,
              cursor: "pointer",
              border: active ? "1px solid #ffffffff" : "2px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              transform: active ? "scale(1.1)" : "scale(1)",
            }}
          />
        );
      })}
    </div>
  );

  const renderThemeSidebar = () => (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        gap: "15px",
        justifyContent: "center",
        alignItems: "center",
        margin: isMobile ? "30px auto" : "120px 0px",
        marginBottom: isMobile ? "15px" : "0",
      }}
    >
      {themes.map((theme, idx) => (
        <div
          key={idx}
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: theme.bgc,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            boxShadow:
              theme === selectedTheme
                ? "0 8px 15px rgba(0,0,0,0.3)"
                : "0 2px 5px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
          onClick={() => setSelectedTheme(theme)}
        >
          {theme.icon}
          <span
            style={{
              position: "absolute",
              left: "60px",
              whiteSpace: "nowrap",
              opacity: 0,
              backgroundColor: "#fff",
              padding: "2px 6px",
              borderRadius: "4px",
              boxShadow: "0 0 5px rgba(0,0,0,0.2)",
              transition: "opacity 0.3s",
            }}
            className="theme-label"
          >
            {theme.title}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <Container fluid className={s.mainContainer}>
      {/* Header */}
      <Row className="mt-1">
        <Col xs={12} lg={2}>
          <Logo
            subtitle="Chaque enfant, une pièce unique"
            width={100}
            police={6}
          />
        </Col>
      </Row>

      {/* Title */}
      {!selectedTheme && (
        <Row className="justify-content-center text-center mb-2">
          <h5 className={s.h5}>
            <span style={{ fontSize: "26px" }}>📖</span> Apprendre en jouant
          </h5>
        </Row>
      )}

      {/* Themes Selection */}
      {!selectedTheme ? (
        <div style={{ width: "50%", margin: "0 auto" }}>
          <Row className="justify-content-center">
            {themes.map((theme, idx) => (
              <Col
                key={idx}
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className="d-flex justify-content-center mb-3"
              >
                <Card
                  className={`${s.itemContainer} shadow border-0 text-center`}
                  style={{ backgroundColor: theme.bgc, cursor: "pointer" }}
                  onClick={() => setSelectedTheme(theme)}
                >
                  <Card.Body>
                    <h5 className="mb-2 mt-4 ">{theme.title}</h5>
                    <div className="mb-3 mt-3 ">{theme.icon}</div>
                    <Card.Text style={{ fontSize: "14px", color: "#333" }}>
                      {theme.description}
                    </Card.Text>
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
            flexDirection: isMobile ? "column" : "row",
            minHeight: "80vh",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          {/* Sidebar Themes */}
          {renderThemeSidebar()}

          {/* Levels */}
          {isMobile && renderLevels()}

          {/* Game Area */}
          <div
            style={{
              justifyContent: "center",
              margin: "0px auto",
              width: isMobile ? "90%" : "50%",
              minHeight: "400px",
              marginTop: !isMobile ? "-90px" : "-50px",
            }}
          >
            <Row>{!isMobile && renderLevels()}</Row>
            <Row>
              {React.cloneElement(selectedTheme.component, { level, isMobile })}
            </Row>
          </div>
        </div>
      )}

      {/* Hover labels */}
      <style>
        {`
          .theme-label {
            pointer-events: none;
          }
          div:hover > .theme-label {
            opacity: 1;
          }
        `}
      </style>
    </Container>
  );
}
