import { useState, useEffect } from "react";

import {
  Repeat,
  ArrowRight,
  CheckCircle,
  XCircle,
} from "react-bootstrap-icons";
import s from "./style.module.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { GameTitle } from "../GameTitle/GameTitle";
import { Button } from "../../../shared/components/Button/Button";
const bear1 = "/assets/MemoryGameImg/bear1.png";
const bear2 = "/assets/MemoryGameImg/bear2.png";
const bear3 = "/assets/MemoryGameImg/bear3.png";

const pomme = "/assets/MemoryGameImg/pomme.png";
const raisin = "/assets/MemoryGameImg/raisin.png";
const pasteque = "/assets/MemoryGameImg/pasteque.png";
const orange = "/assets/MemoryGameImg/orange.png";
const cerise = "/assets/MemoryGameImg/cerise.png";
const kiwi = "/assets/MemoryGameImg/kiwi.png";

const ceriseRaisin = "/assets/MemoryGameImg/ceriseRaisin.png";
const pastequeCerise = "/assets/MemoryGameImg/pastequeCerise.png";
const orangePomme = "/assets/MemoryGameImg/orangePomme.png";
const raisinPomme = "/assets/MemoryGameImg/raisinPomme.png";
const orangePasteque = "/assets/MemoryGameImg/orangePasteque.png";
const levels = {
  1: [bear1, bear2, bear3],

  2: [cerise, pasteque, pomme, orange, raisin, kiwi],

  3: [
    cerise,
    pasteque,
    pomme,
    orange,
    raisin,
    ceriseRaisin,
    pastequeCerise,
    orangePomme,
    raisinPomme,
    orangePasteque,
  ],
};

export function MemoryGame({ level: initialLevel = 1, isMobile = false }) {
  const [level, setLevel] = useState(initialLevel);
  const [score, setScore] = useState(0);
  const [failScore, setFailScore] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  // === Préchargement des images pour affichage instantané ===
  useEffect(() => {
    const allImages = Object.values(levels).flat();
    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const generateCards = (lvl) => {
    const imgs = levels[lvl];
    const shuffled = [...imgs, ...imgs]
      .map((img) => ({ img, id: Math.random() }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setIsFinished(false);
    setScore(0);
    setFailScore(0);
    setTime(0);
    setTimerActive(true);
  };

  useEffect(() => {
    generateCards(level);
  }, [level]);

  const handleClick = (id) => {
    if (flipped.length === 2) return;
    if (flipped.includes(id)) return;
    setFlipped([...flipped, id]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      const card1 = cards.find((c) => c.id === first);
      const card2 = cards.find((c) => c.id === second);

      if (card1.img === card2.img) {
        setMatched((prev) => [...prev, card1.img]);
        setScore((s) => s + 1);
      } else {
        setFailScore((s) => s + 1);
      }

      // retourne les cartes après 1s
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === levels[level].length) {
      setIsFinished(true);
      setTimerActive(false);
    }
  }, [matched, level]);

  // Gestion du timer
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const gridClass =
    level === 1 ? s.gridLevel1 : level === 2 ? s.gridLevel2 : s.gridLevel3;

  const handleNextLevel = () => {
    if (level < 3) {
      setLevel(level + 1);
    } else {
      alert("🎉 Tu as terminé tous les niveaux !");
    }
  };

  return (
    <Container>
      {isMobile && (
        <>
          <Row>
            <Card className={s.scoreCard}>
              <Row>
                <h6 className="fw-bold text-center border-bottom pb-2 mb-3">
                  Score 🏆
                </h6>
              </Row>
              <Row>
                <Col>
                  <CheckCircle color="green" size={22} /> : {score}
                </Col>
                <Col>
                  <XCircle color="red" size={22} /> : {failScore}
                </Col>
                <Col>⏱️ {time}s</Col>
              </Row>
            </Card>
          </Row>
          <Row>
            <Card className={s.scoreCard}>
              <h6 className="mb-3 fw-bold">Niveaux</h6>
              <Row>
                <Col xs={4}>
                  <Button
                    name="Niveau 1"
                    variant={level === "facile" ? "success" : "outlineSuccess"}
                    action={() => setLevel(1)}
                  />
                </Col>
                <Col xs={4}>
                  <Button
                    name="Niveau 2"
                    variant={level === "medium" ? "warning" : "outlineWarning"}
                    action={() => setLevel(2)}
                  />
                </Col>
                <Col xs={4}>
                  <Button
                    name="Niveau 3"
                    variant={level === "hard" ? "danger" : "outlineDanger"}
                    action={() => setLevel(3)}
                  />
                </Col>
              </Row>
            </Card>
          </Row>
        </>
      )}

      {/* Grille du jeu */}
      <Row>
        <Col xs={12} lg={9} className={s.memoryContainer}>
          <Row>
            <Col>
              <GameTitle name="Jeu de Memoire🎯" />
            </Col>
          </Row>
          <Row className={gridClass} style={{ margin: "20px auto" }}>
            {cards.map((card) => {
              const isFlipped =
                flipped.includes(card.id) || matched.includes(card.img);
              return (
                <div
                  key={card.id}
                  className={`${s.card} ${isFlipped ? s.flipped : ""}`}
                  onClick={() => handleClick(card.id)}
                >
                  {isFlipped ? (
                    <img src={card.img} alt="card" />
                  ) : (
                    <div className={s.back}></div>
                  )}
                </div>
              );
            })}
          </Row>
        </Col>

        {!isMobile && (
          <Col xs={12} lg={3} className="text-center mt-3">
            <Card className={s.scoreCard}>
              <div className="d-flex gap-3 " style={{ margin: "0px auto" }}>
                <div>
                  <CheckCircle color="green" size={22} /> : {score}
                </div>
                <div>
                  <XCircle color="red" size={22} /> : {failScore}
                </div>
              </div>
              <hr />
              <div>⏱️ {time}s</div>
            </Card>

            <Card className={s.scoreCard}>
              <h6 className="mb-3 fw-bold">Niveaux</h6>
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    name="Niveau 1"
                    variant={level === "facile" ? "success" : "outlineSuccess"}
                    action={() => setLevel(1)}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    name="Niveau 2"
                    variant={level === "medium" ? "warning" : "outlineWarning"}
                    action={() => setLevel(2)}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    name="Niveau 3"
                    variant={level === "hard" ? "danger" : "outlineDanger"}
                    action={() => setLevel(3)}
                  />
                </div>
              </div>
            </Card>
          </Col>
        )}
      </Row>

      {/* Message de victoire */}
      {isFinished && (
        <div className={s.modalOverlay}>
          <div className={s.modalBox}>
            <span>🎉 Bravo ! Tu as terminé le niveau {level} !</span>
            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button
                name="Refaire"
                icon={Repeat}
                variant="errorButton"
                size={20}
                action={() => generateCards(level)}
              />
              <Button
                name="Suivant"
                icon={ArrowRight}
                variant="confirmButtonSmall"
                size={20}
                action={handleNextLevel}
              />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
