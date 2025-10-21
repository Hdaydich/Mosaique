import { useState, useEffect } from "react";
import bear1 from "../../assets/MemoryGameImg/bear1.png";
import bear2 from "../../assets/MemoryGameImg/bear2.png";
import bear3 from "../../assets/MemoryGameImg/bear3.png";
import pomme from "../../assets/MemoryGameImg/pomme.png";
import raisin from "../../assets/MemoryGameImg/raisin.png";
import pasteque from "../../assets/MemoryGameImg/pasteque.png";
import orange from "../../assets/MemoryGameImg/orange.png";
import cerise from "../../assets/MemoryGameImg/cerise.png";
import kiwi from "../../assets/MemoryGameImg/kiwi.png";
import ceriseRaisin from "../../assets/MemoryGameImg/ceriseRaisin.png";
import pasterqueCerise from "../../assets/MemoryGameImg/pasterqueCerise.png";
import orangePomme from "../../assets/MemoryGameImg/orangePomme.png";
import raisonPomme from "../../assets/MemoryGameImg/raisonPomme.png";
import orangePasteque from "../../assets/MemoryGameImg/orangePasteque.png";
import {
  Repeat,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
} from "react-bootstrap-icons";
import s from "./style.module.css";
import { Button } from "../../components/Button/Button";
import { Col, Container, Row } from "react-bootstrap";
import { GameTitle } from "../../components/GameTitle/GameTitle";

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
    pasterqueCerise,
    orangePomme,
    raisonPomme,
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

      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped]);

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
    <Container fluid>
      <Row>
        <GameTitle name="Jeu de Memoire" />
      </Row>

      <Row className="align-items-center">
        <div
          className="d-flex justify-content-between align-items-center flex-wrap gap-3"
          style={{
            minWidth: isMobile ? "auto" : "500px",
            paddingTop: "10px",
            margin: "0 auto",
            transition: "width 0.3s ease",
          }}
        >
          <div className="d-flex first"></div>

          <div className="d-flex last fw-bold gap-3">
            <div>
              <CheckCircle color="green" size={22} /> : {score}
            </div>
            <div>
              <XCircle color="red" size={22} /> : {failScore}
            </div>
            <div>⏱️ {time}s</div>
          </div>
        </div>
      </Row>

      {/* Boutons niveaux */}
      <Row >
        <Col xs={4} md={4} lg={4}>
          <button
            className={`${s.levelBtn} ${s.level1} ${
              level === 1 ? s.active : ""
            }`}
            onClick={() => setLevel(1)}
          >
            <span className={s.level}> Niveau 1</span>
          </button>
        </Col>
        <Col xs={4} md={4} lg={4}>
          <button
            className={`${s.levelBtn} ${s.level2} ${
              level === 2 ? s.active : ""
            }`}
            onClick={() => setLevel(2)}
          >
            <span className={s.level}> Niveau 2</span>
          </button>
        </Col>
        <Col xs={4} md={4} lg={4}>
          <button
            className={`${s.levelBtn} ${s.level3} ${
              level === 3 ? s.active : ""
            }`}
            onClick={() => setLevel(3)}
          >
            <span className={s.level}> Niveau 3</span>
          </button>
        </Col>
      </Row>

      {/* Grille du jeu */}
      <Row>
        <div className={gridClass}>
          {cards.map((card) => {
            const isFlipped =
              flipped.includes(card.id) || matched.includes(card.img);
            return (
              <div
                key={card.id}
                className={` ${s.card} ${isFlipped ? s.flipped : ""}`}
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
        </div>
      </Row>

      {/* Message de victoire */}
      <Row>
        <div className={s.winMessage}>
          {isFinished && (
            // <span>🎉 Bravo ! Tu as terminé le niveau {level} !</span>
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
        </div>
      </Row>

      {/* Boutons de contrôle */}
      <Row className="mt-3 mb-1" style={{ margin: "auto 10px" }}>
        <Col className="d-flex justify-content-first ">
          <Button
            icon={Repeat}
            variant="errorButton"
            size={22}
            action={() => generateCards(level)}
          />
        </Col>
        <Col className="d-flex justify-content-end ">
          <Button
            icon={ArrowRight}
            variant="confirmButtonSmall"
            size={22}
            action={handleNextLevel}
          />
        </Col>
      </Row>
    </Container>
  );
}

