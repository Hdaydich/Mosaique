import s from "./style.module.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Item({
  title,
  titlesize = "18px",
  subtitle,
  content,
  bgc,
  img,
  imgw = "70%",
  imgh = "150px",
  direction,
}) {
  const navigate = useNavigate();

  const handleRedirect = (direction) => {
    navigate(direction);
  };

  return (
    <Card
      className={`${s.itemContainer} shadow-lg border-0`}
      onClick={() => handleRedirect(direction)}
    >
      {title && (
        <Card.Header style={{ backgroundColor: bgc, border: "none" }}>
          <Card.Title
            className={s.title}
            style={{
              paddingTop: "20px",
              textTransform: "uppercase",
              fontSize: titlesize,
              height: "50px",
              color: "#303030ff",
            }}
          >
            {title}
          </Card.Title>
        </Card.Header>
      )}

      <Card.Body style={{ paddingBottom: "20px" }}>
        <Card.Img
          variant="top"
          src={img}
          style={{
            width: imgw,
            margin: "0 auto",
            height: imgh,
            objectFit: "contain",
          }}
        />

        <Card.Subtitle
          style={{
            paddingTop: "15px",
            paddingBottom: "5px",
          }}
        >
          <h6 style={{ color: "#007a8c" }}>{subtitle}</h6>
        </Card.Subtitle>

        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
}
