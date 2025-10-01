import { Card, CardImg, CardSubtitle, CardTitle } from "react-bootstrap";
import s from "./style.module.css";
import * as Icon from "react-bootstrap-icons";

export function Chakel({ name, color, img, size = "19px" }) {
  return (
    <Card className={`${s.CardContainer} border-0`}>
      <CardImg variant="bottom" src={img} fluid></CardImg>

      <CardTitle
        style={{
          paddingBottom: "10px",
          color: color,
          textAlign: "center",
          margin: "0px",
          marginTop: "10px",
          fontSize: size,
        }}
      >
        {name}
        {"  "}
        <span className={s.icon}>
          <Icon.CircleFill> </Icon.CircleFill>{" "}
        </span>
      </CardTitle>
    </Card>
  );
}
