import { Card, CardImg, CardTitle } from "react-bootstrap";
import s from "./style.module.css";

export function Chakel({ name, color, img, onClick }) {
  return (
    <Card
      className={`${s.CardContainer} border-0`}
      onClick={onClick}
      style={{
        cursor: "pointer",
        maxHeight: "130px",
        height: "auto",
        textAlign: "center",
        boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
    >
      <CardTitle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          margin: "0px",
          paddingTop: "10px",
          fontSize: "24px",
          color: color,
        }}
      >
        {/* Puce colorée */}
        <span
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: color,
            display: "inline-block",
          }}
        ></span>

        <span>{name}</span>
      </CardTitle>
      <CardImg variant="bottom" src={img} fluid />
    </Card>
  );
}
