import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import s from "./style.module.css";

import kids from "../../../assets/kids.png";
import { ItemList } from "../../components/ItemList/ItemList";
import { Button } from "../../components/Button/Button";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const itemListRef = useRef(null);
  const navigate = useNavigate();

  const scrollToItemList = () => {
    if (itemListRef.current) {
      itemListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container className={s.page}>
      {/* HERO */}
      <Row className={`${s.hero} align-items-center`}>
        <Col xs={12} lg={6} className="text-center text-lg-start">
          <h1 className={s.heroTitle}>🌈 Apprendre devient un jeu d’enfant</h1>

          <p className={s.heroText}>
            Des activités simples, amusantes et adaptées au rythme de chaque
            enfant.
          </p>

          <Button
            variant="add"
            name="Découvrir maintenant"
            action={scrollToItemList}
          />
        </Col>

        <Col xs={12} lg={6} className="text-center mt-4 mt-lg-0">
          <div className={s.heroImgWrapper}>
            <img src={kids} alt="Enfants apprenant" className={s.kidsImg} />
          </div>
        </Col>
      </Row>

      {/* ACTIVITÉS */}
      <section ref={itemListRef} className={s.activitiesSection}>
        <h2 className={s.sectionTitle}>Nos activités Mosaïque</h2>
        <p className={s.sectionText}>
          Des univers ludiques conçus pour stimuler la curiosité et la mémoire.
        </p>

        <ItemList />
      </section>

      {/* VALEURS */}
      <section className={s.ctaSection}>
        <Row className="justify-content-center text-center g-4">
          {[
            {
              icon: "🎨",
              title: "Créativité",
              text: "Des activités pleines de couleurs.",
            },
            {
              icon: "🧠",
              title: "Apprentissage doux",
              text: "Pensé avec des experts TDAH.",
            },
            {
              icon: "💚",
              title: "Bienveillance",
              text: "Encourager plutôt que juger.",
            },
          ].map((val, i) => (
            <Col key={i} xs={12} md={4}>
              <Card className={s.valueCard}>
                <div className={s.cardIcon}>{val.icon}</div>
                <Card.Body>
                  <Card.Title className={s.valueTitle}>{val.title}</Card.Title>
                  <Card.Text className={s.valueText}>{val.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <div className="mt-5">
            <h3 className={s.ctaTitle}>
              Prêt à rejoindre l’aventure Mosaïque ? 🌟
            </h3>
            <Button
              variant="addButton"
              name="Commencer maintenant"
              action={() => navigate("/Authentification")}
            />
          </div>
        </Row>
      </section>
    </Container>
  );
}
