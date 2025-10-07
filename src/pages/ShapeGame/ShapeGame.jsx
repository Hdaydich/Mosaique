// ShapeGame.jsx
import React, { useState, useEffect, useRef } from "react";
import { Shapes } from "./Shapes";
import { Container, Row, Col } from "react-bootstrap";
import { CheckCircle, XCircle } from "react-bootstrap-icons";
import s from "./style.module.css";

const SHAPES = ["circle", "square", "triangle", "star", "hexagon", "diamond"];

const LEVEL_STYLE = {
  facile: { color: "#01de09ff", rows: 5, cols: 5, size: 70 },
  medium: { color: "#ffd500ff", rows: 6, cols: 7, size: 60 },
  hard: { color: "#ff1100ff", rows: 7, cols: 9, size: 60 },
};

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function buildRows(targetShape, level) {
  const { rows, cols } = LEVEL_STYLE[level];
  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const shape = Math.random() > 0.5 ? targetShape : randomFrom(SHAPES);
      row.push({ shape, key: `${i}-${j}` });
    }
    result.push(row);
  }
  return result;
}

export function ShapeGame({
  level: initialLevel = "facile",
  isMobile = false,
}) {
  const [level, setLevel] = useState(initialLevel);
  const [score, setScore] = useState(0);
  const [failScore, setFailScore] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [target, setTarget] = useState(randomFrom(SHAPES));
  const [rows, setRows] = useState(buildRows(target, level));
  const [clickedPositions, setClickedPositions] = useState({});
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Timer
  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  // Rebuild grid when level changes
  useEffect(() => {
    const newTarget = randomFrom(SHAPES);
    setTarget(newTarget);
    setRows(buildRows(newTarget, level));
    setClickedPositions({});
    setChecked(false);
    setIsCorrect(false);
    setTime(0);
    setTimerActive(true);
  }, [level]);

  const handleClick = (rowIndex, colIndex) => {
    if (checked) return;
    const key = `${rowIndex}-${colIndex}`;
    setClickedPositions((prev) => ({
      ...prev,
      [key]: prev[key] ? null : "#445abeff", // toggle couleur
    }));
  };

  const checkAnswers = () => {
    let correct = true;
    rows.forEach((row, rowIndex) =>
      row.forEach((item, colIndex) => {
        const key = `${rowIndex}-${colIndex}`;
        const clicked = clickedPositions[key];
        if (item.shape === target && !clicked) correct = false;
        if (item.shape !== target && clicked) correct = false;
      })
    );
    setIsCorrect(correct);
    setChecked(true);
    if (correct) setScore((s) => s + 1);
    else setFailScore((f) => f + 1);
    setTimerActive(false); // stop timer après confirmation
  };

  const nextLevel = () => {
    const newTarget = randomFrom(SHAPES);
    setTarget(newTarget);
    setRows(buildRows(newTarget, level));
    setClickedPositions({});
    setChecked(false);
    setIsCorrect(false);
    setTime(0);
    setTimerActive(true);
  };

  const handleLevelSelect = (lvl) => {
    if (lvl !== level) setLevel(lvl);
  };

  const renderLevels = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: isMobile ? "0px" : "20px",
      }}
    >
      {["facile", "medium", "hard"].map((lvl) => {
        const active = lvl === level;
        const color =
          lvl === "facile"
            ? "#08de0fff"
            : lvl === "medium"
            ? "#FF9800"
            : "#F44336";
        return (
          <div
            key={lvl}
            onClick={() => handleLevelSelect(lvl)}
            title={lvl}
            style={{
              width: active ? 26 : 20,
              height: active ? 26 : 20,
              backgroundColor: color,
              borderRadius: "50%",
              cursor: "pointer",
              transform: active ? "scale(1.2)" : "scale(1)",
              transition: "all 0.2s ease",
              border: "2px solid white",
            }}
          />
        );
      })}
    </div>
  );

  // Grille
  const { cols: colCount, size: shapeSize } = LEVEL_STYLE[level];
  const gap = 6;
  const containerMaxWidth = isMobile ? window.innerWidth - 40 : 700;
  const maxShapeSize = Math.min(
    shapeSize,
    (containerMaxWidth - (colCount - 1) * gap) / colCount
  );
  const containerWidth = maxShapeSize * colCount + (colCount - 1) * gap;

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${colCount}, ${maxShapeSize}px)`,
    gap: `${gap}px`,
    justifyContent: "center",
    margin: "0 auto",
    padding: "10px",
    borderRadius: "15px",
    backgroundColor: "#f9f4c0a1",
    width: isMobile ? `${containerWidth}px` : `${containerWidth + 10}px`,
  };

  return (
    <Container fluid style={{ margin: "0 auto" }}>
      <Row className="mb-1">
        <h2 className={s.title}>Jeu d'attention</h2>
      </Row>

      <Row className="align-items-center mb-3">
        <Col xs={6} md={8}>
          {renderLevels()}
        </Col>
        <Col xs={6} md={4}>
          <div className="d-flex justify-content-end gap-3 fw-bold">
            <div>
              <CheckCircle color="green" size={22} /> : {score}
            </div>
            <div>
              <XCircle color="red" size={22} /> : {failScore}
            </div>
            <div>⏱️ {time}s</div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col>
          <div
            style={{
              marginBottom: "20px",
              marginTop: isMobile ? "-10px" : "-60px",
            }}
          >
            <Shapes shape={target} size={maxShapeSize} color="#445abeff" />
          </div>
          <div style={gridContainerStyle}>
            {rows.map((row, rowIndex) =>
              row.map((item, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                const clickedColor = clickedPositions[key];

                return (
                  <div
                    key={key}
                    onClick={() => handleClick(rowIndex, colIndex)}
                    style={{
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: maxShapeSize,
                      height: maxShapeSize,
                    }}
                  >
                    <Shapes
                      shape={item.shape}
                      size={maxShapeSize - 1}
                      color={clickedColor || "#ffffffff"}
                    />
                  </div>
                );
              })
            )}
          </div>
        </Col>
      </Row>

      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
        {!checked ? (
          <button
            className="btn btn-success rounded-pill px-4 py-2"
            onClick={checkAnswers}
          >
            ✅ Confirmer
          </button>
        ) : isCorrect ? (
          <button
            className="btn btn-warning rounded-pill px-4 py-2"
            onClick={nextLevel}
          >
            ⏭️ Suivant
          </button>
        ) : (
          <>
            <button
              className="btn btn-danger rounded-pill px-4 py-2"
              onClick={() => {
                setChecked(false);
                setClickedPositions({});
                setTimerActive(true); // relance le timer si on rejoue
              }}
            >
              🔄 Rejouer
            </button>
            <button
              className="btn btn-primary rounded-pill px-4 py-2"
              onClick={nextLevel}
            >
              ⏭️ Suivant
            </button>
          </>
        )}
      </div>
    </Container>
  );
}
