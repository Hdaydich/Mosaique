import { Card } from "react-bootstrap";
import s from "./style.module.css";

export function StoryCard({ title, icon, action, isSelected = false }) {
  return (
    <Card className={s.card} onClick={action}>
      <Card.Body className={s.cardBody}>
        <Card.Title className={s.cardTitle}>
          <h5 className={s.storyTitle}>{title}</h5>
          {!isSelected && <span className={s.iconContainer}>{icon}</span>}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
