import { useState } from "react";
import s from "./style.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { StoryCard } from "../StoryCard/StoryCard";

export function StoriesList({ stories, title, onSelect, isSelected = false }) {
  const [showAll, setShowAll] = useState(false);

  // Nombre de cartes visibles
  let sliceInd = isSelected ? 2 : 3;
  const visibleStories = showAll ? stories : stories.slice(0, sliceInd);

  return (
    <Container className={`${s.storiesContainer}`}>
      {/* === TITRE === */}
      <Row>
        <Col>
          {isSelected ? (
            <h5 className={s.title}>{title}</h5>
          ) : (
            <h4 className={s.title}>{title}</h4>
          )}
        </Col>
      </Row>

      {/* === LISTE DES CONTES === */}
      <Row className="g-2">
        {visibleStories.map((story, idx) => (
          <Col key={story.id || idx} xs={12} sm={6} lg={isSelected ? 6 : 4}>
            <div
              className={s.storyItem}
              onClick={() => onSelect(story)}
              role="button"
              tabIndex={0}
            >
              <StoryCard
                title={story.title}
                icon={story.icon}
                action={() => onSelect(story)}
                isSelected={isSelected}
              />
            </div>
          </Col>
        ))}
      </Row>

      {/* === BOUTON VOIR PLUS / MOINS === */}
      {stories.length > 3 && (
        <Row>
          <Col className="text-center mt-3">
            <span
              className={s.showMoreLink}
              onClick={() => setShowAll(!showAll)}
              role="button"
              aria-expanded={showAll}
            >
              {showAll ? "▲ Voir moins" : "▼ Voir plus"}
            </span>
          </Col>
        </Row>
      )}
    </Container>
  );
}
