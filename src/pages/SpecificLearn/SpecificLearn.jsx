import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Logo } from "../../components/Logo/Logo";
import s from "./style.module.css";
import { ShapeGame } from "../ShapeGame/ShapeGame";

const themes = [
  {
    title: "Attention",
    icon: <Icon.EyeFill size={40} color="#E74C3C" />,
    description: "Améliore ta concentration avec des jeux visuels!",
    component: <ShapeGame />,
  },
  {
    title: "Logique",
    icon: <Icon.PuzzleFill size={40} color="#3498DB" />,
    description: "Résous des énigmes et développe ton raisonnement.",
    component: <p>Ici on pourra mettre un autre jeu de logique 🧩</p>,
  },
  {
    title: "Chiffres & Quantité",
    icon: <Icon.CalculatorFill size={40} color="#27AE60" />,
    description: "Apprends à compter et manipuler les nombres.",
    component: <p>Jeu des chiffres 🔢</p>,
  },
  {
    title: "Qui suis-je (Lettres)",
    icon: <Icon.TypeBold size={40} color="#F1C40F" />,
    description: "Devine les lettres et découvre les mots cachés.",
    component: <p>Jeu des lettres ✍️</p>,
  },
];

export function SpecificLearn() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [level, setLevel] = useState("facile");

  const isMobile = window.innerWidth < 768;

  return (
    <Container fluid>
      <Row>
        {/* Logo */}
        <Col xs={12} lg={2}>
          <Logo
            subtitle="Chaque enfant, une pièce unique"
            width={110}
            police={7}
            align="left"
            marg="0px"
          />
        </Col>

        {/* Contenu */}
        <Col xs={12} lg={10}>
          <div className={s.typeContainer}>
            <Card className="shadow border-0 w-100 mt-2">
              <Card.Header style={{ backgroundColor: "#FFF59D" }}>
                <Card.Title
                  style={{
                    paddingTop: "5px",
                    paddingLeft: "10px",
                    textTransform: "uppercase",
                  }}
                >
                  Apprentissage
                </Card.Title>
              </Card.Header>

              {!selectedTheme ? (
                // Affichage des thèmes
                <Card.Body style={{ backgroundColor: "#fefbf4" }}>
                  <Row className="justify-content-center mt-3 mb-3">
                    {themes.map((theme, index) => (
                      <Col
                        key={index}
                        xs={12}
                        sm={6}
                        md={6}
                        className="d-flex justify-content-center"
                      >
                        <Card
                          className={`${s.itemContainer} shadow border-0 m-3`}
                          onClick={() => setSelectedTheme(theme)}
                        >
                          <Card.Body className="text-center">
                            <h3>{theme.title}</h3>
                            <div className="mb-3">{theme.icon}</div>
                            <Card.Text>{theme.description}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              ) : (
                // Affichage du jeu
                <Card.Body
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: "10px",
                    alignItems: "flex-start",
                    backgroundColor: "#fefbf4",
                  }}
                >
                  {/* Colonne gauche : bouton retour */}
                  <div
                    style={{
                      flex: "0 0 40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "start",
                      marginBottom: isMobile ? "10px" : "0",
                    }}
                  >
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setSelectedTheme(null)}
                      title="Retour"
                    >
                      ←
                    </button>
                  </div>

                  {/* Colonne centrale : jeu + niveaux */}
                  <div
                    style={{
                      flex: "1 1 auto",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      gap: "10px",
                    }}
                  >
                    {/* Cercles de niveau en haut pour mobile */}
                    {isMobile && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        {["facile", "medium", "hard"].map((lvl) => (
                          <div
                            key={lvl}
                            style={{
                              width: "25px",
                              height: "25px",
                              borderRadius: "50%",
                              backgroundColor:
                                lvl === "facile"
                                  ? "#4CAF50"
                                  : lvl === "medium"
                                  ? "#FF9800"
                                  : "#F44336",
                              border:
                                lvl === level
                                  ? "3px solid black"
                                  : "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => setLevel(lvl)}
                            title={lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                          />
                        ))}
                      </div>
                    )}

                    <selectedTheme.component.type
                      {...selectedTheme.component.props}
                      level={level}
                      isMobile={isMobile}
                    />

                    {/* Cercles de niveau à droite pour PC */}
                    {!isMobile && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        {["facile", "medium", "hard"].map((lvl) => (
                          <div
                            key={lvl}
                            style={{
                              width: "25px",
                              height: "25px",
                              borderRadius: "50%",
                              backgroundColor:
                                lvl === "facile"
                                  ? "#4CAF50"
                                  : lvl === "medium"
                                  ? "#FF9800"
                                  : "#F44336",
                              border:
                                lvl === level
                                  ? "3px solid black"
                                  : "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => setLevel(lvl)}
                            title={lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Card.Body>
              )}
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
