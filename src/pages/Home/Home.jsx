import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import { Item } from "../../components/Item/Item";
import s from "./style.module.css";
import livre from "../../assets/livre.png";
import caring from "../../assets/caring.png";
import jeux from "../../assets/jeux.png";
import dys from "../../assets/dys.png";
import { Logo } from "../../components/Logo/Logo";

export function Home(props) {
  return (
    <>
      <Container className={s.mainContainer}>
        <Logo
          subtitle="Chaque enfant, une pièce unique"
          width={150}
          police="10"
          align="center"
        />
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Item
              title="Lecture en couleur"
              subtitle="Apprends à lire... facilement et joyeusement"
              content="القراءة ممتعة وسهلة بالألوان"
              bgc="#a5f3fcff" // bleu pastel
              img={dys}
              direction="/reading"
            />
          </Col>

          <Col xs={12} sm={6} md={4} lg={3}>
            <Item
              title="Apprentissage"
              subtitle="Lettres, chiffres et quantités… un apprentissage facile et amusant"
              content="ألوان + حروف + أرقام = مرح"
              bgc="#fffeb4ff" // jaune pastel
              img={livre}
              direction="/SpecificLearn"
            />
          </Col>

          <Col xs={12} sm={6} md={4} lg={3}>
            <Item
              title="Logique"
              subtitle="Jeux et défis pour stimuler ton raisonnement"
              content="ألغاز + تفكير = ذكاء"
              bgc="#bbfddeff" // vert pastel
              img={jeux}
              direction="/Logic"
            />
          </Col>

          <Col xs={12} sm={6} md={4} lg={3}>
            <Item
              title="Parent/Enfant"
              subtitle="Un espace collaboratif et éducatif"
              content="تعلم ومرح مع العائلة"
              bgc="#ffc3e4ff" // rose pastel
              img={caring}
              direction="/Parent"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
