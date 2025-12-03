import { useState, memo } from "react";
import s from "./style.module.css";
import myStoriesData from "../../data/mesStories";
import defaultStories from "../../data/stories";
import readingBoy from "../../../assets/readingBoy.png";
import readingGirl from "../../../assets/readingGirl.png";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Button } from "../../../shared/components/Button/Button";
import { StoryCard as OriginalStoryCard } from "../../components/StoryCard/StoryCard";
import { useNavigate } from "react-router-dom";

// Optimisation StoryCard avec memo
const StoryCard = memo(OriginalStoryCard);

export function Reading() {
  const [myStories, setMyStories] = useState(myStoriesData);
  const navigate = useNavigate();

  return (
    <Container fluid className={s.pageWrap}>
      {/* HERO SECTION */}
      <Row className="justify-content-center">
        <Col md={10} className={s.heroBanner}>
          <div className="text-center p-4">
            <h1 className="fw-bold">
              Des histoires magiques pour tous les enfants
            </h1>
            <p className="text-muted">
              Lisez, créez et partagez vos propres contes !
            </p>
          </div>
          <div className="text-center p-1">
            {" "}
            <Button name="Ajouter une nouvelle histoire ?" variant="success" />
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
        </Col>
      </Row>

      {/* CONTENT */}
      <Container className="mt-5 mb-5">
        <Row>
          {/* Histoires par défaut */}
          <Col md={6}>
            <Card
              className="p-3 border-1 shadow"
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
      </Container>
    </Container>
  );
}
