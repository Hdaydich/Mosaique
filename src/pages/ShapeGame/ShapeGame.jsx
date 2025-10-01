import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Shapes } from "../../utils/Shapes";

const SHAPES = ["circle", "square", "triangle", "star", "hexagon", "diamond"];

const LEVEL_STYLE = {
  facile: { color: "#4CAF50", rows: 5, cols: 5, size: 55 },
  medium: { color: "#FF9800", rows: 6, cols: 7, size: 50 },
  hard: { color: "#F44336", rows: 7, cols: 9, size: 45 },
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

export function ShapeGame({ level = "facile" }) {
  const [target, setTarget] = useState(randomFrom(SHAPES));
  const [rows, setRows] = useState(buildRows(target, level));
  const [clickedPositions, setClickedPositions] = useState({});
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Rebuild grid if level changes
  useEffect(() => {
    const newTarget = randomFrom(SHAPES);
    setTarget(newTarget);
    setRows(buildRows(newTarget, level));
    setClickedPositions({});
    setChecked(false);
    setIsCorrect(false);
  }, [level]);

  const isMobile = window.innerWidth < 768;
  const {
    rows: rowCount,
    cols: colCount,
    size: shapeSize,
  } = LEVEL_STYLE[level];
  const mobileShapeSize = Math.max(30, shapeSize - 20);

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

  return (
    <Card.Body
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        backgroundColor: "#fefbf4",
        width: "100%",
        height: "auto",
        minHeight: "200px",
      }}
    >
      {/* Target shape */}
      <div>
        <Shapes
          shape={target}
          size={isMobile ? mobileShapeSize + 5 : shapeSize + 5}
        />
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${colCount}, 1fr)`,
          gap: "6px",
          justifyItems: "center",
          width: "100%",
        }}
      >
        {rows.map((row, rowIndex) =>
          row.map((item, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const clicked = clickedPositions[key];
            const isTarget = item.shape === target;
            let bgColor = clicked ? "#ecfdb4ff" : "white";
            if (checked) {
              bgColor =
                clicked && isTarget
                  ? "#a5d6a7"
                  : clicked && !isTarget
                  ? "#f28b82"
                  : !clicked && isTarget
                  ? "#ef9a9a"
                  : "white";
            }

            const maxShapeSize = isMobile
              ? Math.min(mobileShapeSize, 60)
              : Math.min(shapeSize, 80);

            return (
              <div
                key={item.key}
                onClick={() => handleClick(rowIndex, colIndex)}
                style={{
                  backgroundColor: bgColor,
                  cursor: "pointer",
                  borderRadius: "6px",
                  padding: "4px",
                  minWidth: maxShapeSize,
                  minHeight: maxShapeSize,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "all 0.2s",
                  transform: clicked ? "scale(1.06)" : "scale(1)",
                }}
              >
                <Shapes shape={item.shape} size={maxShapeSize} />
              </div>
            );
          })
        )}
      </div>

      {/* Buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
        {!checked ? (
          <button className="btn btn-success" onClick={checkAnswers}>
            Confirmer
          </button>
        ) : isCorrect ? (
          <button className="btn btn-warning" onClick={nextLevel}>
            Suivant ⏭️
          </button>
        ) : (
          <>
            <button
              className="btn btn-danger"
              onClick={() => {
                setChecked(false);
                setClickedPositions({});
              }}
            >
              Rejouer 🔄
            </button>
            <button className="btn btn-primary" onClick={nextLevel}>
              Suivant ⏭️
            </button>
          </>
        )}
      </div>
    </Card.Body>
  );
}
