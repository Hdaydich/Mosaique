import { Card } from "react-bootstrap";
import s from "./style.module.css";

export function Chakel({ name, color, img, onClick }) {
  return (
    <Card className={`${s.CardContainer} mt-2 border-0`} onClick={onClick}>
      <Card.Title
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
        <span className={s.icon} style={{ backgroundColor: color }} />
        <span className={s.name}>{name}</span>
      </Card.Title>
      <Card.Img src={img} alt={name} className={s.chakelImg} />
    </Card>
  );
}
