import { useState, useEffect, useRef } from "react";
import s from "./style.module.css";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "react-bootstrap-icons";
import { Col, Container, Row } from "react-bootstrap";

const colors = ["#FF6347", "#32CD32", "#1E90FF", "#FFD700"];
const NUM_PLATEAUX = 25;

export function PuzzleGame(isMobile) {
  const generateGrid = () =>
    Array(16)
      .fill(null)
      .map(() => colors[Math.floor(Math.random() * colors.length)]);

  const [miniGrids] = useState(
    Array(NUM_PLATEAUX)
      .fill(null)
      .map(() => generateGrid())
  );

  const [selectedPlateau, setSelectedPlateau] = useState(null);
  const [playerGrid, setPlayerGrid] = useState(Array(16).fill(null));
  const [result, setResult] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [score, setScore] = useState(0);
  const [failScore, setFailScore] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const carouselRef = useRef(null);

  // Timer
  useEffect(() => {
    let interval;
    if (timerActive) interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  // === FONCTIONS DU JEU ===
  const checkResult = () => {
    const isCorrect = selectedPlateau.every(
      (color, i) => color === playerGrid[i]
    );
    if (isCorrect) {
      setResult("🎉 Bravo, c’est correct !");
      setScore((prev) => prev + 1);
      setLastResult("correct");
      setTimerActive(false);
    } else {
      setFailScore((prev) => prev + 1);
      setResult("😕 Ce n’est pas encore ça, réessaie !");
      setLastResult("error");
    }
  };

  const choosePlateau = (index) => {
    setSelectedPlateau(miniGrids[index]);
    setPlayerGrid(Array(16).fill(null));
    setResult(null);
    setLastResult(null);
    setTime(0);
    setTimerActive(true);
  };

  const handleTileClick = (index) => {
    if (selectedColor) {
      const newGrid = [...playerGrid];
      newGrid[index] = selectedColor;
      setPlayerGrid(newGrid);
    }
  };

  // === SCROLL CAROUSEL ===
  const scrollAmount = 250;
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container>
      <Row>
        <h2 className={s.title}>Jeu d'attention</h2>
      </Row>

      <Row className="align-items-center mb-3">
        <div
          className="d-flex justify-content-between align-items-center flex-wrap gap-3"
          style={{
            minWidth: isMobile ? "auto" : "500px",
          }}
        >
          <div className="d-flex first">
            {selectedPlateau && (
              <button
                className={s.backButton}
                onClick={() => {
                  setSelectedPlateau(null);
                  setTimerActive(false);
                  setTime(0);
                }}
                title="Retour aux plateaux"
              >
                <ArrowLeft />
              </button>
            )}
          </div>
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
      {/* === title === */}
      {!selectedPlateau && (
        <Row>
          <h5 className="mt-5"> Choisissez votre mosaique :</h5>
        </Row>
      )}
      {/* === CAROUSEL === */}
      {!selectedPlateau && (
        <Row className={s.CarouselContainer}>
          <Col lg={1}>
            <button className={s.navButton} onClick={scrollLeft}>
              <ArrowLeft />
            </button>
          </Col>
          <Col lg={10}>
            <div className={s.carouselItems} ref={carouselRef}>
              {miniGrids.map((grid, i) => (
                <div
                  key={i}
                  className={`${s.miniGridContainer} ${
                    selectedPlateau === grid ? s.selectedMiniGrid : ""
                  }`}
                  onClick={() => choosePlateau(i)}
                >
                  <div className={s.miniGrid}>
                    {grid.map((color, j) => (
                      <div
                        key={j}
                        className={s.miniTile}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col lg={1}>
            <button className={s.navButton} onClick={scrollRight}>
              <ArrowRight />
            </button>
          </Col>
        </Row>
      )}

      {/* === ZONE DE JEU === */}
      {selectedPlateau && (
        <div className={s.gameArea}>
          <div className={s.objectiveBoard}>
            <div className={s.miniGrid}>
              {selectedPlateau.map((color, i) => (
                <div
                  key={i}
                  className={s.miniTile}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          <div className={s.playerBoard}>
            <div className={s.grid}>
              {playerGrid.map((color, i) => (
                <div
                  key={i}
                  className={s.tile}
                  style={{
                    backgroundColor: color || "white",
                    border: "2px solid #ccc",
                  }}
                  onClick={() => handleTileClick(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const droppedColor = e.dataTransfer.getData("color");
                    const newGrid = [...playerGrid];
                    newGrid[i] = droppedColor;
                    setPlayerGrid(newGrid);
                  }}
                ></div>
              ))}
            </div>

            {/* Palette de couleurs */}
            <div className={s.colorPalette}>
              {colors.map((color) => (
                <div
                  key={color}
                  className={`${s.colorSwatch} ${
                    selectedColor === color ? s.selectedColor : ""
                  }`}
                  style={{ backgroundColor: color }}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("color", color)}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>

            {/* Bouton confirmer */}
            {!result && (
              <button className={s.confirmButton} onClick={checkResult}>
                ✅ Confirmer
              </button>
            )}

            {/* Résultat */}
            {result && (
              <div className={s.modalOverlay}>
                <div className={s.modalBox}>
                  <p>{result}</p>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    {lastResult === "error" && (
                      <button
                        className={s.newGameButton}
                        onClick={() => {
                          setPlayerGrid(Array(16).fill(null));
                          setResult(null);
                          setLastResult(null);
                        }}
                      >
                        🔄 Refaire
                      </button>
                    )}
                    <button
                      className={s.confirmButton}
                      onClick={() => {
                        const nextIndex =
                          (miniGrids.indexOf(selectedPlateau) + 1) %
                          miniGrids.length;
                        setSelectedPlateau(miniGrids[nextIndex]);
                        setPlayerGrid(Array(16).fill(null));
                        setResult(null);
                        setLastResult(null);
                        setTime(0);
                        setTimerActive(true);
                      }}
                    >
                      ➡️ Suivant
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}
