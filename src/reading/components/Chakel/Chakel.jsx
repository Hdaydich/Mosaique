import { Card, CardImg, CardTitle } from "react-bootstrap";
import s from "./style.module.css";

export function Chakel({ name, color, img, onClick }) {
  return (
    <Card className={`${s.CardContainer} mt-2 border-0 `} onClick={onClick}>
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
          className={s.icon}
          style={{
            backgroundColor: color,
          }}
        ></span>

        <span className={s.name}>{name}</span>
      </CardTitle>
      <CardImg variant="bottom" src={img} fluid />
    </Card>
  );
}
