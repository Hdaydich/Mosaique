import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  CheckCircle,
  XCircle,
  ArrowRightCircle,
  ArrowClockwise,
} from "react-bootstrap-icons";
import { Shapes } from "./Shapes";
import { Button } from "../../components/Button/Button";
import s from "./style.module.css";
import { GameTitle } from "../../components/GameTitle/GameTitle";

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
  const [feedback, setFeedback] = useState({}); // ✅ stocke le résultat visuel de chaque case

  // Timer
  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  // Rebuild grid on level change
  useEffect(() => {
    const newTarget = randomFrom(SHAPES);
    setTarget(newTarget);
    setRows(buildRows(newTarget, level));
    setClickedPositions({});
    setChecked(false);
    setFeedback({});
    setTime(0);
    setTimerActive(true);
  }, [level]);

  const handleClick = (rowIndex, colIndex) => {
    if (checked) return; // empêche les clics après validation
    const key = `${rowIndex}-${colIndex}`;
    setClickedPositions((prev) => ({
      ...prev,
      [key]: prev[key] ? null : "#1536c7a2",
    }));
  };

  const checkAnswers = () => {
    const newFeedback = {};
    let correct = true;

    rows.forEach((row, rowIndex) =>
      row.forEach((item, colIndex) => {
        const key = `${rowIndex}-${colIndex}`;
        const clicked = clickedPositions[key];

        if (item.shape === target && clicked) {
          newFeedback[key] = "correct"; // ✅ bien coché
        } else if (item.shape === target && !clicked) {
          newFeedback[key] = "missed"; // 🔴 non coché alors qu’il fallait
          correct = false;
        } else if (item.shape !== target && clicked) {
          newFeedback[key] = "wrong"; // 🔴 mauvaise case cochée
          correct = false;
        }
      })
    );

    setFeedback(newFeedback);
    setChecked(true);
    if (correct) setScore((s) => s + 1);
    else setFailScore((f) => f + 1);
    setTimerActive(false);
  };

  const replay = () => {
    const newTarget = randomFrom(SHAPES);
    setTarget(newTarget);
    setRows(buildRows(newTarget, level));
    setClickedPositions({});
    setChecked(false);
    setFeedback({});
    setTime(0);
    setTimerActive(true);
  };

  const renderLevels = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
            onClick={() => setLevel(lvl)}
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
              boxShadow: active ? "0 0 10px rgba(0,0,0,0.3)" : "none",
            }}
          />
        );
      })}
    </div>
  );

  const { cols: colCount, size: baseShapeSize } = LEVEL_STYLE[level];
  const gap = 6;
  const containerMaxWidth = isMobile
    ? window.innerWidth - 70
    : window.innerWidth;
  const maxShapeSize = Math.min(
    baseShapeSize,
    Math.floor((containerMaxWidth - (colCount - 1) * gap) / colCount)
  );

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${colCount}, ${maxShapeSize}px)`,
    gap: `${gap}px`,
    justifyContent: "center",
    margin: "20px auto",
  };

  return (
    <Container>
      <Row>
        <GameTitle name="Jeu d'attention" />
      </Row>

      {/* Barre de score + timer */}
      <Row className="align-items-center mb-2 mt-1">
        <div
          className="d-flex justify-content-between align-items-center flex-wrap gap-3"
          style={{ minWidth: isMobile ? "auto" : "500px" }}
        >
          <div>{renderLevels()}</div>
          <div
            className={s.scorePanel}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              padding: "6px 15px",
              borderRadius: "10px",
              background: "#fff",
              fontWeight: "bold",
            }}
          >
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

      {/* Grille du jeu */}
      <Row className="justify-content-center mb-3">
        <Col>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <Shapes shape={target} size={maxShapeSize} color="#05155aff" />
          </div>

          <div style={gridContainerStyle}>
            {rows.map((row, rowIndex) =>
              row.map((item, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                const clickedColor = clickedPositions[key];
                const state = feedback[key];

                let Color = "transparent";
                if (state === "correct") Color = "#00cb2f7e"; // vert
                if (state === "wrong" || state === "missed")
                  Color = "#f8071f96"; // rouge

                return (
                  <div
                    key={key}
                    onClick={() => handleClick(rowIndex, colIndex)}
                    style={{
                      borderRadius: "12px",
                      cursor: checked ? "default" : "pointer",
                      transition: "all 0.2s",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: maxShapeSize,
                      height: maxShapeSize,
                      background: "#fff",
                      backgroundColor: Color,
                    }}
                  >
                    <Shapes
                      shape={item.shape}
                      size={maxShapeSize - 1}
                      color={clickedColor || "#ffffff"}
                    />
                  </div>
                );
              })
            )}
          </div>
        </Col>
      </Row>

      {/* Boutons */}
      <div className="d-flex flex-wrap justify-content-center gap-3 mt-3 mb-3">
        {!checked ? (
          <Button
            name="Confirmer"
            icon={CheckCircle}
            variant="confirmButtonSmall"
            size={22}
            action={checkAnswers}
          />
        ) : (
          <>
            <Button
              name="Rejouer"
              icon={ArrowClockwise}
              variant="errorButton"
              size={22}
              action={replay}
            />
            <Button
              name="Suivant"
              icon={ArrowRightCircle}
              variant="confirmButtonSmall"
              size={22}
              action={replay}
            />
          </>
        )}
      </div>
    </Container>
  );
}
