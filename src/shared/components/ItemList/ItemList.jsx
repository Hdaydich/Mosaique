import { Col, Container, Row } from "react-bootstrap";
import { Item } from "../Item/Item";
import s from "./style.module.css";

export function ItemList({ sections }) {
  return (
    <Container className={s.mainContainer}>
      <Row>
        {sections.map((section) => (
          <Col key={section.title} xs={12} lg={3}>
            <Item {...section} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
