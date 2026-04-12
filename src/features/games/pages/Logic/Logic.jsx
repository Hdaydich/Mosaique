import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardBody,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import s from "./style.module.css";

import { ShapeGame } from "../../components/ShapeGame/ShapeGame";
import { PuzzleGame } from "../../components/PuzzleGame/PuzzleGame";
import { MemoryGame } from "../../components/MemoryGame/MemoryGame";

const gamesList = [
  {
    key: "attention",
    title: "Attention",
    description: "Jeux pour améliorer la concentration et l'observation.",
    icon: <Icon.Eye size={24} />,
    img: "/assets/att.png",
    colorClass: "attention",
    component: <MemoryGame />,
    bg: "#ffbea2ff",
  },
  {
    key: "logique",
    title: "Logique",
    description: "Développe ton raisonnement avec des puzzles.",
    icon: <Icon.Puzzle size={24} />,
    img: "/assets/logic.png",
    colorClass: "logique",
    component: <PuzzleGame />,
    bg: "#ffe6a2ff",
  },
  {
    key: "calcul",
    title: "Chiffres & Calcul",
    description: "Amuse-toi avec les nombres et les opérations.",
    icon: <Icon.Calculator size={24} />,
    img: "/assets/cal.png",
    colorClass: "calcul",
    component: <ShapeGame />,
    bg: "#b8ffa2ff",
  },
  {
    key: "lettres",
    title: "Lettres, mots & phrases",
    description: "Lis, écris et forme des phrases.",
    icon: <Icon.Book size={24} />,
    img: "/assets/mot.png",
    colorClass: "lettres",
    component: (
      <div className="text-center p-5">
        <h3>Jeu Lettres bientôt disponible ✏️</h3>
      </div>
    ),
    bg: "#a2ccffff",
  },
];

export function Logic() {
  const [selectedGame, setSelectedGame] = useState(null);

  const renderGame = () => {
    const game = gamesList.find((g) => g.key === selectedGame);
    return game?.component || null;
  };

  return (
    <Container>
      {!selectedGame && (
        <Row className="g-4 mb-5" style={{ width: "80%", margin: "0px auto" }}>
          {gamesList.map((game) => (
            <Col md={6} key={game.key}>
              <Card
                className={s.card}
                onClick={() => setSelectedGame(game.key)}
              >
                <CardHeader style={{ backgroundColor: game.bg }}>
                  <div className={s.cardHeader}>
                    <h4>{game.title}</h4>
                  </div>
                </CardHeader>
                <CardBody className={s.cardBody}>
                  <Row>
                    <Col lg={7}>
                      <Row>
                        <p style={{ paddingTop: "20px" }}>{game.description}</p>
                      </Row>
                      <Row>
                        <h3> {game.icon} </h3>
                      </Row>
                    </Col>
                    <Col lg={5}>
                      <img src={game.img} alt={game.title} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {selectedGame && (
        <div className="mt-5 text-center">
          <Button
            variant="secondary"
            className="mb-4"
            onClick={() => setSelectedGame(null)}
          >
            ⬅ Retour aux activités
          </Button>
          {renderGame()}
        </div>
      )}
    </Container>
  );
}
