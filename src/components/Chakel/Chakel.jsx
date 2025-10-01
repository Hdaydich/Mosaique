import { Card, CardImg, CardTitle } from "react-bootstrap";
import s from "./style.module.css";
import * as Icon from "react-bootstrap-icons";
export function Chakel({ name, color, img, size = "14px" }) {
  return (
    <Card className={`${s.CardContainer} border-0`}>
      <CardImg variant="bottom" src={img} fluid />
      <CardTitle
        style={{
          color: color,
          textAlign: "center",
          fontSize: size,
          margin: "0px",
          marginTop: "6px",
        }}
      >
        {name}{" "}
        <span className={s.icon}>
          <Icon.CircleFill />
        </span>
      </CardTitle>
    </Card>
  );
}
