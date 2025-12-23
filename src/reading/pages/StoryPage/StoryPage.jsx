import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Modal, Form } from "react-bootstrap";
import myStoriesData from "../../data/mesStories";
import defaultStories from "../../data/stories";
import { SegmentColor } from "../../SegmentColor";
import { Chakel } from "../../components/Chakel/Chakel";
import { exportToWord } from "../../exportToWord";

import fatha from "../../../assets/chakel/fatha.png";
import soukoun from "../../../assets/chakel/skoun.png";
import dhama from "../../../assets/chakel/dhamma.png";
import kasra from "../../../assets/chakel/kasra.png";

import s from "./style.module.css";
import { Button } from "../../../shared/components/Button/Button";
import { ArrowLeft, PlusLg, Download } from "react-bootstrap-icons";

export function StoryPage() {
  const { source, id } = useParams();
  const navigate = useNavigate();

  // ---------------- Hooks ----------------
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ✅ Toujours appeler useEffect avant tout return
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---------------- Data ----------------
  const stories = source === "mystories" ? myStoriesData : defaultStories;
  const story = stories?.find((s) => s.id.toString() === id);

  if (!story) return <p>Story not found</p>;

  const chaklList = [
    { name: "فتحة", color: "#ff009dff", img: fatha },
    { name: "ضمة", color: "#07b00fff", img: dhama },
    { name: "كسرة", color: "#4FC3F7", img: kasra },
    { name: "سكون", color: "#BA68C8", img: soukoun },
  ];

  // ---------------- Handlers ----------------
  const handleSaveStory = () => {
    const newStory = { id: Date.now(), title: newTitle, text: newText };
    myStoriesData.push(newStory);
    setShowModal(false);
    navigate(`/story/mystories/${newStory.id}`);
  };

  // ---------------- Render ----------------
  return (
    <Container fluid>
      {/* Barre mobile */}
      {isMobile && (
        <Row className={s.sideBarMobile}>
          <Col xs={4}>
            <Button
              icon={ArrowLeft}
              variant="backButtonSmall"
              size={16}
              action={() => navigate("/reading")}
            />
          </Col>
          <Col xs={4}>
            {" "}
            <Button
              icon={PlusLg}
              variant="addButton"
              size={16}
              action={() => setShowModal(true)}
            />
          </Col>
          <Col xs={4}>
            <Button
              icon={Download}
              variant="downloadCuteButton"
              size={16}
              action={() => exportToWord(SegmentColor(story.text), story.title)}
            />
          </Col>
        </Row>
      )}

      <Container className={s.pageContainer}>
        <div className={s.chaklContainer}>
          <Row style={{ width: isMobile ? "100%" : "80%", margin: "0px auto" }}>
            {chaklList.map((chakl) => (
              <Col xs={3} lg={3}>
                <Chakel
                  key={chakl.name}
                  name={chakl.name}
                  color={chakl.color}
                  img={chakl.img}
                />
              </Col>
            ))}
          </Row>
        </div>

        {/* Sidebar desktop */}
        {!isMobile && (
          <div className={s.sideBar}>
            <Button
              icon={ArrowLeft}
              variant="backButtonSmall"
              size={18}
              action={() => navigate("/reading")}
            />
            <Button
              icon={PlusLg}
              variant="addButton"
              size={18}
              action={() => setShowModal(true)}
            />
            <Button
              icon={Download}
              variant="downloadCuteButton"
              size={18}
              action={() => exportToWord(SegmentColor(story.text), story.title)}
            />
          </div>
        )}

        {/* Story Card */}
        <Row>
          <Card className={s.storyCard}>
            <Card.Header className={s.storyCardHeader}>
              <h1 className={s.storyTitle}>{SegmentColor(story.title)}</h1>
            </Card.Header>
            <Card.Body className={s.storyCardBody}>
              {SegmentColor(story.text)}
            </Card.Body>
          </Card>
        </Row>
      </Container>

      {/* Modal ajout story */}
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
          <Button name="Confirmer" variant="addButton" action={handleSaveStory}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
