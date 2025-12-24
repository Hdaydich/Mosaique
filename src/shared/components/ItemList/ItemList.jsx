import { Col, Container, Row } from "react-bootstrap";
import { Item } from "../Item/Item";
import s from "./style.module.css";

export function ItemList() {
  const livre = "/assets/livre.png";
  const caring = "/assets/caring.png";
  const jeux = "/assets/jeux.png";
  const dys = "/assets/dys.png";

  return (
    <Container className={s.mainContainer}>
      <Row>
        <Col xs={12} sm={6} md={6} lg={3}>
          <Item
            title="Lecture en couleur"
            subtitle="Lis joyeusement"
            content="القراءة ممتعة وسهلة بالألوان"
            bgc="#C2F5D8"
            img={dys}
            direction="/Reading"
          />
        </Col>

        <Col xs={12} sm={6} md={6} lg={3}>
          <Item
            title="Apprentissage"
            subtitle="Lettres et chiffres amusants"
            content="ألوان + حروف + أرقام = مرح"
            bgc="#FFE4A3"
            img={livre}
            direction="/SpecificLearn"
          />
        </Col>

        <Col xs={12} sm={6} md={6} lg={3}>
          <Item
            title="Logique"
            subtitle="Défis et jeux"
            content="ألغاز + تفكير = ذكاء"
            bgc="#F6FFB8"
            img={jeux}
            direction="/Logic"
          />
        </Col>

        <Col xs={12} sm={6} md={6} lg={3}>
          <Item
            title="Parent/Enfant"
            subtitle="Apprends et joue ensemble"
            content="تعلم ومرح مع العائلة"
            bgc="#FFB3B3"
            img={caring}
            direction="/Parent"
          />
        </Col>
      </Row>
    </Container>
  );
}
