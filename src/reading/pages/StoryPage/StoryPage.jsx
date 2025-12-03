import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import myStoriesData from "../../data/mesStories";
import defaultStories from "../../data/stories";
import { SegmentColor } from "../../SegmentColor";
import { Chakel } from "../../components/Chakel/Chakel";

import fatha from "../../../assets/fatha.png";
import soukoun from "../../../assets/skoun.png";
import dhama from "../../../assets/dhamma.png";
import kasra from "../../../assets/kasra.png";

import s from "./style.module.css";

export function StoryPage() {
  const { source, id } = useParams();
  const navigate = useNavigate();

  const stories = source === "mystories" ? myStoriesData : defaultStories;
  const story = stories.find((s) => s.id.toString() === id);

  if (!story) return <p>Story not found</p>;

  const chaklList = [
    { name: "فتحة", color: "#ff009dff", img: fatha },
    { name: "ضمة", color: "#07b00fff", img: dhama },
    { name: "كسرة", color: "#4FC3F7", img: kasra },
    { name: "سكون", color: "#BA68C8", img: soukoun },
  ];

  return (
    <Container fluid style={{ padding: "0px", paddingBottom: "3rem" }}>
      <Row>
        {/* Col pour la barre chakl sticky */}
        <Col xs={12} md={2} lg={2}>
          <Row>
            <div style={{ marginLeft: "20px" }}>
              <Button onClick={() => navigate(-1)} style={{ margin: "10px 0" }}>
                ← Retour
              </Button>
            </div>
          </Row>
          <div
            className="d-flex flex-column align-items-center gap-3"
            style={{
              position: "sticky",
              top: "2rem",
              margin: "10px 0px",
              padding: "30px 20px",
              backgroundColor: "#cffcf8c3",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            {chaklList.map((chakl, idx) => (
              <Chakel
                key={idx}
                name={chakl.name}
                color={chakl.color}
                img={chakl.img}
              />
            ))}
          </div>
        </Col>

        {/* Col pour la story */}
        <Col xs={12} md={10} lg={10}>
          <Card
            style={{
              margin: "0px auto",
              width: "80%",
              borderRadius: "20px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
              borderColor: "#51515121",
            }}
          >
            <Card.Header
              style={{
                backgroundColor: "#dffccfa2 ",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                borderBottom: "1px solid #51515121",
              }}
            >
              <Card.Title className={s.storyTitle}>
                <h1>{SegmentColor(story.title)}</h1>
              </Card.Title>
            </Card.Header>
            <Card.Body
              style={{
                backgroundColor: "#cffcdc21",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
            >
              <Card.Text className={s.storyText}>
                {SegmentColor(story.text)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
