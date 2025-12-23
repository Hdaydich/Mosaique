import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Modal, Form } from "react-bootstrap";
import myStoriesData from "../../data/mesStories";
import defaultStories from "../../data/stories";
import { SegmentColor } from "../../SegmentColor";
import { Chakel } from "../../components/Chakel/Chakel";
import { exportToWord } from "../../exportToWord";

import fatha from "../../../assets/Chakel/fatha.png";
import soukoun from "../../../assets/Chakel/skoun.png";
import dhama from "../../../assets/Chakel/dhamma.png";
import kasra from "../../../assets/Chakel/kasra.png";

import s from "./style.module.css";
import { Button } from "../../../shared/components/Button/Button";
import { ArrowLeft, PlusLg, Download } from "react-bootstrap-icons";

export function StoryPage() {
  const { source, id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const stories = source === "mystories" ? myStoriesData : defaultStories;
  const story = stories?.find((s) => s.id.toString() === id);
  if (!story) return <p>Story not found</p>;

  const chaklList = [
    { name: "فتحة", color: "#ff009dff", img: fatha },
    { name: "ضمة", color: "#07b00fff", img: dhama },
    { name: "كسرة", color: "#4FC3F7", img: kasra },
    { name: "سكون", color: "#BA68C8", img: soukoun },
  ];

  const handleSaveStory = () => {
    const newStory = { id: Date.now(), title: newTitle, text: newText };
    myStoriesData.push(newStory);
    setShowModal(false);
    navigate(`/story/mystories/${newStory.id}`);
  };

  return (
    <Container fluid>
      {isMobile && (
        <Row className={s.sideBarMobile}>
          <Col xs={4}>
            <Button
              icon={ArrowLeft}
              variant="backButtonSmall"
              size={isMobile ? 14 : 20}
              action={() => navigate("/reading")}
            />
          </Col>
          <Col xs={4}>
            <Button
              icon={PlusLg}
              variant="addButton"
              size={isMobile ? 14 : 20}
              action={() => setShowModal(true)}
            />
          </Col>
          <Col xs={4}>
            <Button
              icon={Download}
              variant="downloadCuteButton"
              size={isMobile ? 14 : 20}
              action={() => exportToWord(SegmentColor(story.text), story.title)}
            />
          </Col>
        </Row>
      )}
      <Container className={s.pageContainer}>
        <Row className={s.chaklContainer}>
          <Row
            style={{
              width: isMobile ? "100%" : "60%",
              margin: "0px auto",
            }}
          >
            {chaklList.map((chakl) => (
              <Col xs={3} lg={3} key={chakl.name}>
                <Chakel name={chakl.name} color={chakl.color} img={chakl.img} />
              </Col>
            ))}
          </Row>
        </Row>
        <Row>
          {/* Sidebar */}
          <Col xs={12} md={1}>
            <div className={s.sideBar}>
              <Button
                icon={ArrowLeft}
                variant="backButtonSmall"
                size={isMobile ? 14 : 20}
                action={() => navigate("/reading")}
              />
              <Button
                icon={PlusLg}
                variant="addButton"
                size={isMobile ? 14 : 20}
                action={() => setShowModal(true)}
              />
              <Button
                icon={Download}
                variant="downloadCuteButton"
                size={isMobile ? 14 : 20}
                action={() =>
                  exportToWord(SegmentColor(story.text), story.title)
                }
              />
            </div>
          </Col>

          <Col xs={12} md={12}>
            <Card className={s.storyCard}>
              <Card.Header className={s.storyCardHeader}>
                <h1 className={`${s.storyTitle} ${s.arabicText}`}>
                  {SegmentColor(story.title)}
                </h1>
              </Card.Header>

              <Card.Body className={`${s.storyCardBody} ${s.arabicText}`}>
                {SegmentColor(story.text)}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

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
