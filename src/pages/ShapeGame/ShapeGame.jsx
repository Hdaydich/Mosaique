// ShapeGame.jsx
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Shapes } from "../../utils/Shapes";

const SHAPES = ["circle", "square", "triangle", "star", "hexagon", "diamond"];

const LEVEL_STYLE = {
  facile: { color: "#01de09ff", rows: 5, cols: 5, size: 70 },
  medium: { color: "#ffd500ff", rows: 6, cols: 7, size: 60 },
  hard: { color: "#ff1100ff", rows: 7, cols: 9, size: 50 },
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

export function ShapeGame({ level = "facile", isMobile = false }) {
  const [target, setTarget] = useState(randomFrom(SHAPES));
  const [rows, setRows] = useState(buildRows(target, level));
  const [clickedPositions, setClickedPositions] = useState({});
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const newTarget = randomFrom(SHAPES);
    setTarget(newTarget);
    setRows(buildRows(newTarget, level));
    setClickedPositions({});
    setChecked(false);
    setIsCorrect(false);
  }, [level]);

  const handleClick = (rowIndex, colIndex) => {
    if (checked) return;
    const key = `${rowIndex}-${colIndex}`;
    setClickedPositions((prev) => ({ ...prev, [key]: !prev[key] }));
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
  };

  const nextLevel = () => {
    const newTarget = randomFrom(SHAPES);
    setTarget(newTarget);
    setRows(buildRows(newTarget, level));
    setClickedPositions({});
    setChecked(false);
    setIsCorrect(false);
  };

  const {
    rows: rowCount,
    cols: colCount,
    size: shapeSize,
  } = LEVEL_STYLE[level];

  // Ajuste la taille des shapes pour mobile ou conteneur
  const containerMaxWidth = isMobile ? window.innerWidth - 40 : 900;
  const maxShapeSize = Math.min(shapeSize, containerMaxWidth / colCount - 6);

  return (
    <div
      className="shadow border-0"
      style={{
        backgroundColor: "#FFF5CC",
        borderRadius: "20px",
        textAlign: "center",
        margin: "0 auto",
        padding: "15px",
        boxSizing: "border-box",
        maxWidth: "100%",
      }}
    >
      {/* Target Shape */}
      <div style={{ marginBottom: "20px", marginTop: "10px" }}>
        <Shapes shape={target} size={maxShapeSize + 10} />
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
          gap: "6px",
          justifyItems: "center",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {rows.map((row, rowIndex) =>
          row.map((item, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const clicked = clickedPositions[key];
            const isTarget = item.shape === target;

            // Définir la couleur de fond
            let bgColor = clicked ? "#c3c3c3ff" : "white";
            if (checked) {
              bgColor =
                clicked && isTarget
                  ? "#51b36dff"
                  : clicked && !isTarget
                  ? "#fe6c6cff"
                  : !clicked && isTarget
                  ? "#fe6c6cff"
                  : "white";
            }

            return (
              <div
                key={key}
                onClick={() => handleClick(rowIndex, colIndex)}
                style={{
                  backgroundColor: bgColor,
                  borderRadius: "12px",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.2s",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: maxShapeSize,
                  minHeight: maxShapeSize,
                  transform: clicked ? "scale(1.05)" : "scale(1)",
                }}
              >
                <Shapes shape={item.shape} size={maxShapeSize - 3} />
              </div>
            );
          })
        )}
      </div>

      {/* Buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
        {!checked ? (
          <button
            className="btn btn-success rounded-pill px-4 py-2 "
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
    </div>
  );
}
