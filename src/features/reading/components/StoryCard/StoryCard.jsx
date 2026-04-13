import { Card } from "react-bootstrap";
import s from "./style.module.css";

export function StoryCard({ story, onClick, onDelete, isEditable }) {
  return (
    <Card
      className={s.storyCard}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Header className={s.imageContainer}>
        <Card.Img variant="top" src={story.image} className={s.storyImg} />
      </Card.Header>

      <Card.Body>
        <Card.Title className={s.cardTitle}>{story.title}</Card.Title>
        <Card.Text className={s.cardText}>
          {story.text?.substring(0, 50)}...
        </Card.Text>

        {isEditable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </button>
        )}
      </Card.Body>
    </Card>
  );
}
