import s from "./style.module.css";
import { useState } from "react";
import myStoriesData from "../../data/mesStories";
import defaultStories from "../../data/stories";
import readingBoy from "../../assets/readingBoy.png";
import readingGirl from "../../assets/readingGirl.png";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Form,
} from "react-bootstrap";

export function Reading() {
  const [isLogged, setIsLogged] = useState(false);
  const [myStories, setMyStories] = useState(myStoriesData);
  const [showModal, setShowModal] = useState(false);
  const [newStoryTitle, setNewStoryTitle] = useState("");

  const addStory = () => {
    if (newStoryTitle.trim() === "") return;
    const newStory = { id: myStories.length + 1, title: newStoryTitle };
    setMyStories([...myStories, newStory]);
    setNewStoryTitle("");
    setShowModal(false);
  };

  return (
    <div className={s.pageWrapper}>
      {/* ---- HERO BANNIÈRE ---- */}
      <div className={s.heroBanner}>
        <Container className="text-center">
          <h1 className={s.heroTitle}>Bienvenue dans le monde des contes ✨</h1>
          <p className={s.heroSubtitle}>
            Découvre de magnifiques histoires ou crée les tiennes !
          </p>
          <Button
            variant={isLogged ? "danger" : "success"}
            onClick={() => setIsLogged(!isLogged)}
          >
            {isLogged ? "Se déconnecter" : "Se connecter"}
          </Button>
        </Container>

        <img src={readingBoy} alt="Enfants apprenant" className={s.cloudLeft} />
        <img
          src={readingGirl}
          alt="Enfants apprenant"
          className={s.cloudRight}
        />
      </div>

      <Container className="mt-5">
        {/* ---- HISTOIRES PAR DÉFAUT ---- */}
        <h2 className={s.sectionTitle}>📚 Histoires disponibles</h2>
        <Row>
          {defaultStories.map((story) => (
            <Col key={story.id} xs={12} md={6} lg={4} className="mb-4">
              <Card className={s.storyCard}>
                <Card.Body>
                  <h5 className={s.storyTitle}>{story.title}</h5>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* ---- HISTOIRES DE L’UTILISATEUR ---- */}
        {isLogged && (
          <>
            <h2 className={s.sectionTitle}>🌟 Mes histoires</h2>
            <Row>
              {myStories.map((story) => (
                <Col key={story.id} xs={12} md={6} lg={4} className="mb-4">
                  <Card className={s.storyCard}>
                    <Card.Body>
                      <h5 className={s.storyTitle}>{story.title}</h5>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="text-center mb-5">
              <Button className={s.addBtn} onClick={() => setShowModal(true)}>
                ＋ Ajouter une histoire
              </Button>
            </div>
          </>
        )}
      </Container>

      {/* ---- MODAL AJOUTER HISTOIRE ---- */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une histoire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Titre de l'histoire"
            value={newStoryTitle}
            onChange={(e) => setNewStoryTitle(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={addStory}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
