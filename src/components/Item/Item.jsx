import s from "./style.module.css";
import { Card, CardFooter, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Item({ title, subtitle, content, bgc, img, direction }) {
  const navigate = useNavigate();
  const handleRedirect = (direction) => {
    navigate(direction); //
  };
  return (
    <Card
      className={`${s.itemContainer} shadow-lg border-0`}
      onClick={() => handleRedirect(direction)}
    >
      <Card.Header style={{ backgroundColor: bgc }}>
        <Card.Title
          className={s.title}
          style={{
            paddingTop: "10px",
            textTransform: "uppercase",
            fontSize: "18px",
          }}
        >
          {title}
        </Card.Title>
      </Card.Header>
      <Card.Body style={{ height: "280px" }}>
        <Card.Text>{content} </Card.Text>
        <Card.Img
          variant="top"
          src={img}
          fluid
          style={{ width: "70%", margin: "0px auto", height: "150px" }}
        />

        <Card.Subtitle style={{ paddingTop: "15px" }}>
          <small>
            <i>{subtitle}</i>
          </small>
        </Card.Subtitle>
      </Card.Body>
      <CardFooter
        style={{
          backgroundColor: bgc,
          padding: "20px",
          height: "100%",
        }}
      ></CardFooter>
    </Card>
  );
}
