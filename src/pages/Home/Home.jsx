import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import s from "./style.module.css";

import { ItemList } from "../../shared/components/ItemList/ItemList";
import { Button } from "../../shared/components/Button/Button";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const kids = "/assets/kid.png";

  const items = [
    {
      title: "Lecture en couleur",
      subtitle: "Lis joyeusement",
      content: "القراءة ممتعة وسهلة بالألوان",
      bgc: "#C2F5D8",
      img: "/assets/sections/mot.png",
      direction: "/Reading",
    },
    {
      title: "Apprentissage",
      subtitle: "Lettres et chiffres",
      content: "ألوان + حروف + أرقام = مرح",
      bgc: "#F6FFB8",
      img: "/assets/sections/cal.png",
      direction: "/SpecificLearn",
    },
    {
      title: "Logique",
      subtitle: "Défis et jeux",
      content: "ألغاز + تفكير = ذكاء",
      bgc: "#FFE4A3",
      img: "/assets/sections/logic.png",
      direction: "/Logic",
    },
    {
      title: "Parent/Enfant",
      subtitle: "Test et évaluation",
      content: "تعلم ومرح مع العائلة",
      bgc: "#FFB3B3",
      img: "/assets/sections/parent.png",
      direction: "/Parent",
    },
  ];

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
      <Row className={s.hero}>
        <Col xs={12} lg={6}>
          <h1 className={s.heroTitle}>✨ Chaque enfant, une pièce unique</h1>

          <p className={s.heroText}>
            Des activités simples, amusantes et adaptées au rythme de chaque
            enfant.
          </p>
          <div className={s.heroButton}>
            <Button
              variant="add"
              name="Découvrir maintenant"
              action={scrollToItemList}
            />
          </div>
        </Col>

        <Col xs={12} lg={6} className="text-center">
          <div className={s.heroImgWrapper}>
            <img src={kids} alt="Enfants apprenant" className={s.kidsImg} />
          </div>
        </Col>
      </Row>

      {/* ACTIVITÉS */}
      <section ref={itemListRef} id="activity" className={s.activitiesSection}>
        <h1 className={s.sectionTitle}>Nos activités Mosaïque</h1>
        <p className={s.sectionText}>
          Des univers ludiques conçus pour stimuler la curiosité et la mémoire.
        </p>

        <ItemList sections={items} />
      </section>

      {/* VALEURS */}
      <section id="about" className={s.ctaSection}>
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
          <div className="mt-5 text-center">
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
