import { useState, memo } from "react";
import s from "./style.module.css";
import myStoriesData from "../../data/mesStories";
import defaultStories from "../../data/stories";
import readingBoy from "../../../assets/readingBoy.png";
import readingGirl from "../../../assets/readingGirl.png";
import { Container, Row, Col, Card, Modal, Form } from "react-bootstrap";
import { Button } from "../../../shared/components/Button/Button";
import { StoryCard as OriginalStoryCard } from "../../components/StoryCard/StoryCard";
import { useNavigate } from "react-router-dom";
import { PlusLg } from "react-bootstrap-icons";

const StoryCard = memo(OriginalStoryCard);

export function Reading() {
  const [myStories, setMyStories] = useState(myStoriesData);
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleSaveStory = () => {
    const newStory = { id: Date.now(), title: newTitle, text: newText };
    myStoriesData.push(newStory);
    setShowModal(false);
    navigate(`/story/mystories/${newStory.id}`);
  };
  return (
    <Container fluid className={s.pageWrap}>
      {/* HERO SECTION */}
      <Row className="justify-content-center">
        <div className={s.heroBanner}>
          <div className="text-center">
            <h1 className={s.bannerTitle}>
              Des histoires magiques pour tous les enfants
            </h1>
            <p className="text-muted">
              Lisez, créez et partagez vos propres contes !
            </p>
          </div>
          <div className="text-center mt-4">
            <Button
              name="Ajouter une nouvelle histoire?"
              icon={PlusLg}
              variant="add"
              action={() => setShowModal(true)}
            />
          </div>
          <img
            src={readingBoy}
            alt="Enfant en train de lire"
            className={s.cloudLeft}
          />
          <img
            src={readingGirl}
            alt="Enfant en train de lire"
            className={s.cloudRight}
          />
        </div>
      </Row>

      <Container className="mt-5 mb-5">
        <Row>
          {/* Histoires par défaut */}
          <Col md={6}>
            <Card
              className="p-3 border-1 shadow mb-4"
              style={{ backgroundColor: "#cffcf8c3", borderColor: "#e7e6e643" }}
            >
              <h4 className="mb-3">✨ Histoires par défaut</h4>
              <div className={s.horizontalScroll}>
                {defaultStories.map((story) => (
                  <div
                    key={story.id}
                    className="me-3"
                    style={{ minWidth: "220px", marginBottom: "20px" }}
                  >
                    <StoryCard
                      story={story}
                      onClick={() =>
                        navigate(`/story/defaultstories/${story.id}`)
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Mes histoires créées */}
          <Col md={6}>
            <Card
              className="p-3 border-1 shadow"
              style={{ backgroundColor: "#f2fccfc3", borderColor: "#e7e6e643" }}
            >
              <h4 className="mb-3">✨ Mes histoires</h4>

              <div className={s.horizontalScroll}>
                {myStories.length === 0 ? (
                  <p className="text-muted">
                    Aucune histoire créée pour le moment.
                  </p>
                ) : (
                  myStories.map((story) => (
                    <div
                      key={story.id}
                      className="me-3"
                      style={{ minWidth: "220px", marginBottom: "20px" }}
                    >
                      <StoryCard
                        story={story}
                        onClick={() =>
                          navigate(`/story/defaultstories/${story.id}`)
                        }
                      />
                    </div>
                  ))
                )}
                ;
              </div>
            </Card>
          </Col>
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className={s.modalHeader}>
            <Modal.Title>➕ Ajouter une nouvelle histoire</Modal.Title>
          </Modal.Header>

          <Modal.Body className={s.modalBody}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Texte</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer className={s.modalFooter}>
            <Button
              name="Confirmer"
              variant="addButton"
              action={handleSaveStory}
            >
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
}
