import { Row, Col, Card, CardHeader, CardBody } from "react-bootstrap";
import s from "./style.module.css";

export function SlideBar({ sections }) {
  return (
    <Row className={s.mainContainer}>
      {sections.map((section, idx) => (
        <Col xs={12} md={4} lg={4} key={idx}>
          <Card className={s.sectionBlock} style={{ "--delay": idx }}>
            <CardHeader className={s.headerContainer}>
              <h3>{section.title}</h3>
            </CardHeader>

            <CardBody className={s.bodyContainer}>
              {section.title !== "Calcul" && section.image && (
                <Row className={s.imgContainer}>
                  <img src={section.image} alt="" className={s.itemImage} />
                </Row>
              )}

              {section.title === "Calcul" && (
                <Row className="justify-content-center">
                  {section.items?.map((item, index) => (
                    <Col
                      key={index}
                      xs={3}
                      className="d-flex justify-content-center p-1"
                    >
                      <div className={`${s.iconWrapper} ${s[item.type]}`}>
                        {item.icon}
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
