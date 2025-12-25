import { Container, Row, Col, Card } from "react-bootstrap";
import { Plus, Dash, X, Slash } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import s from "./style.module.css";

export function Learning() {
  const sections = [
    {
      title: "Lettres",
      col: 6,
      image: "/assets/fr.png",
    },
    {
      title: "Chiffres",
      col: 12,
      image: "/assets/chiffre.png",
    },
    {
      title: "Calcul",
      col: 3,
      items: [
        { icon: <Plus />, type: "plus" },
        { icon: <Dash />, type: "minus" },
        { icon: <X />, type: "multiply" },
        { icon: <Slash />, type: "divide" },
      ],
    },
  ];

  const sectionRefs = useRef([]);
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      setTimeout(() => setHeaderVisible(true), 100);
    }

    sectionRefs.current.forEach((el, i) => {
      if (el) {
        setTimeout(() => {
          el.classList.add(s.visible);
        }, i * 300);
      }
    });
  }, []);

  return (
    <Container fluid className={s.mainContainer}>
      <Row className="justify-content-center">
        {/* COLONNE GAUCHE DESKTOP */}
        <Col lg={3} className={s.sectionsColumn}>
          {sections.map((section, idx) =>
            section.title !== "Calcul" ? (
              <div key={idx} className={s.sectionBlock}>
                <Row className="align-items-center">
                  <Col
                    lg={5}
                    className="d-flex justify-content-center align-items-center p-1"
                  >
                    <h4 className={s.sectionTitle}>{section.title}</h4>
                  </Col>
                  <Col lg={7} className="d-flex justify-content-center">
                    {section.image && (
                      <img
                        src={section.image}
                        alt={section.title}
                        className={s.itemImage}
                      />
                    )}
                  </Col>
                </Row>
              </div>
            ) : (
              <div key={idx} className={s.sectionBlock}>
                <Row className="align-items-center">
                  <Col
                    lg={5}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <h4 className={s.sectionTitle}>{section.title}</h4>
                  </Col>

                  <Col lg={7}>
                    <Row className="align-items-center justify-content-center">
                      {section.items?.map((item, index) => (
                        <Col
                          key={index}
                          lg={3}
                          className="d-flex justify-content-center"
                        >
                          <div className={`${s.iconWrapper} ${s[item.type]}`}>
                            {item.icon}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </div>
            )
          )}
        </Col>

        {/* COLONNE DROITE */}
        <Col
          xs={12}
          lg={9}
          ref={headerRef}
          className={`${s.headerContainer} ${headerVisible ? s.visible : ""}`}
        >
          <h1 className={s.title}>Apprendre en s'amusant !</h1>
          <img
            src="/assets/learning.png"
            alt="Learning"
            className={s.mainImage}
          />
          <p className={s.subtitle}>
            Des activités ludiques pour apprendre les lettres, les chiffres et
            les calculs en douceur.
          </p>
        </Col>
      </Row>

      {/* VERSION MOBILE */}
      {sections.map((section, idx) => (
        <Row key={idx}>
          <Col xs={12}>
            <div
              ref={(el) => (sectionRefs.current[idx] = el)}
              className={`${s.sectionMob} ${
                idx % 2 === 0 ? s.alignLeft : s.alignRight
              }`}
            >
              <Row className="align-items-center">
                {/* COLONNE GAUCHE : titre aligné à droite */}
                <Col
                  xs={5}
                  className="d-flex align-items-center justify-content-end"
                >
                  <h4 className={s.sectionTitle}>{section.title}</h4>
                </Col>

                {/* COLONNE DROITE : image ou icônes */}
                <Col xs={7}>
                  {section.title !== "Calcul" && section.image && (
                    <img
                      src={section.image}
                      alt={section.title}
                      className={s.itemImage}
                    />
                  )}

                  {section.title === "Calcul" && (
                    <Row className="align-items-center justify-content-center ">
                      {section.items?.map((item, index) => (
                        <Col
                          xs={3}
                          key={index}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <div className={`${s.iconWrapper} ${s[item.type]}`}>
                            {item.icon}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  )}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
}
