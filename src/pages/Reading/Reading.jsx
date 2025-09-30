import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { SegmentColor } from "../../utils/SegmentColor";
import { Chakel } from "../../components/Chakel/Chakel";
import { exportToWord } from "../../utils/exportToWord";
import * as Icon from "react-bootstrap-icons";
import dhamma from "../../assets/dhamma.png";
import kasra from "../../assets/kasra.png";
import soukoun from "../../assets/skoun.png";
import fatha from "../../assets/fatha.png";
import s from "./style.module.css";
import { Logo } from "../../components/Logo/Logo";

export function Reading() {
  const [inputText, setInputText] = useState("");
  const [coloredSegments, setColoredSegments] = useState([]);
  const textareaRef = useRef(null);
  const outputRef = useRef(null);

  // Met à jour les segments colorés
  useEffect(() => {
    setColoredSegments(SegmentColor(inputText));
  }, [inputText]);

  // Ajuste la hauteur de la textarea automatiquement
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputText]);

  // Ajuste la hauteur de la div de sortie selon le contenu
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.style.height = "auto";
      outputRef.current.style.height = outputRef.current.scrollHeight + "px";
    }
  }, [coloredSegments]);

  return (
    <Container fluid>
      {/* Logo + chakl desktop */}
      <Row className={s.logoContainer}>
        <Col xs={12} lg={6}>
          <Logo
            subtitle="Chaque enfant, une pièce unique"
            width={110}
            police={8}
            align="left"
            marg="0px"
          />
        </Col>
        {inputText && (
          <Col className={s.ChakelContainer} xs={12} lg={6}>
            <Row>
              <Col lg={3}>
                <Chakel name="الفَتْحَة" color="#ff0073" img={fatha} />
              </Col>
              <Col lg={3}>
                <Chakel name="الكَسْرَة" color="#009bee" img={kasra} />
              </Col>
              <Col lg={3}>
                <Chakel name="الضَمَّة" color="#04cf1f" img={dhamma} />
              </Col>
              <Col lg={3}>
                <Chakel name="السُّكُون" color="#962dc0" img={soukoun} />
              </Col>
            </Row>
          </Col>
        )}
      </Row>

      {/* Ligne principale avec animation */}
      <Row className={`${s.rowContainer} ${inputText ? s.withOutput : ""}`}>
        {/* Textarea */}
        <Col xs={12} lg={5} className={s.textareaCol}>
          <h4
            style={{
              textAlign: "center",
              color: "#0e0e0eff",
              paddingBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            Apprendre en couleur
          </h4>
          <div className={`${s.textContainer} shadow border-0`}>
            <textarea
              ref={textareaRef}
              className={`${s.textarea} shadow border-0 flex-fill`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب نصًا هنا..."
              style={{ overflow: "hidden", resize: "none" }}
            />
          </div>
        </Col>

        {/* Colonne droite seulement si texte non vide */}
        {inputText && (
          <Col xs={12} lg={7} className={s.outputCol}>
            {/* Chakl mobile */}
            <Row
              className="mb-2 d-lg-none"
              style={{ backgroundColor: "white", margin: "30px auto" }}
            >
              <Col xs={3}>
                <Chakel
                  name="الفَتْحَة"
                  color="#ff0073"
                  img={fatha}
                  size="12px"
                />
              </Col>
              <Col xs={3}>
                <Chakel
                  name="الكَسْرَة"
                  color="#009bee"
                  img={kasra}
                  size="12px"
                />
              </Col>
              <Col xs={3}>
                <Chakel
                  name="الضَمَّة"
                  color="#04cf1f"
                  img={dhamma}
                  size="12px"
                />
              </Col>
              <Col xs={3}>
                <Chakel
                  name="السُّكُون"
                  color="#962dc0"
                  img={soukoun}
                  size="12px"
                />
              </Col>
            </Row>

            {/* Zone résultat */}
            <h4 className={s.whitespace}>----------</h4>
            <div className={`${s.textContainer} shadow border-0`}>
              <div
                ref={outputRef}
                id="myDiv"
                className={`${s.outputDiv} shadow border-0 flex-fill pb-2 ${s.show}`}
                contentEditable={false}
                style={{ overflow: "hidden", whiteSpace: "pre-wrap" }}
              >
                {coloredSegments.length > 0 ? coloredSegments : "أدخل نص هنا"}
              </div>
            </div>

            {/* Bouton Word aligné */}
            <div className="mt-2 d-flex justify-content-end">
              <Icon.ArrowDownCircleFill
                onClick={() => exportToWord(coloredSegments)}
                className={s.downloadIcon}
              />
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
}
