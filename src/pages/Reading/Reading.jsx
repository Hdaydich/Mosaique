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
  const [finished, setFinished] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const textareaRef = useRef(null);
  const outputRef = useRef(null);

  // Met à jour les segments colorés
  useEffect(() => {
    setColoredSegments(SegmentColor(inputText));
  }, [inputText]);

  // Listener resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ajuste la hauteur de la textarea automatiquement
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputText]);

  // Ajuste la hauteur de la div de sortie
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.style.height = "auto";
      outputRef.current.style.height = outputRef.current.scrollHeight + "px";
    }
  }, [coloredSegments]);

  const reset = () => {
    setInputText("");
    setFinished(false);
  };

  const outputStyle = {
    marginTop: finished ? (isMobile ? "160px" : "0px") : "0px",
  };

  return (
    <Container fluid>
      {/* Header avec logo + chakls */}
      {!isMobile ? (
        <Row
          className="align-items-center justify-content-center"
          style={{ marginBottom: "20px", height: "150px" }}
        >
          <Col xs={12} lg={6} className="text-center text-lg-start">
            <Logo
              subtitle="Chaque enfant, une pièce unique"
              width={110}
              police={8}
              align="left"
              marg="0px"
            />
          </Col>
          <Col xs={12} lg={6} className="d-flex justify-content-center">
            <Row
              className="w-100 justify-content-center"
              style={{ paddingTop: "10px" }}
            >
              <Col xs={3}>
                <Chakel name="الفَتْحَة" color="#ff0073" img={fatha} />
              </Col>
              <Col xs={3}>
                <Chakel name="الكَسْرَة" color="#009bee" img={kasra} />
              </Col>
              <Col xs={3}>
                <Chakel name="الضَمَّة" color="#04cf1f" img={dhamma} />
              </Col>
              <Col xs={3}>
                <Chakel name="السُّكُون" color="#962dc0" img={soukoun} />
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row
          className="align-items-center justify-content-center"
          style={{ marginBottom: "20px", height: "150px" }}
        >
          <Col xs={12} className="text-center text-lg-start">
            <Logo
              subtitle="Chaque enfant, une pièce unique"
              width={110}
              police={8}
              align="left"
              marg="0px"
            />
          </Col>
        </Row>
      )}

      {/* Titre */}
      <Row className="justify-content-center">
        <Col xs={12} lg={8} className="text-center">
          <h5
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              color: "#0e0e0eff",
              paddingBottom: "10px",
              paddingTop: "10px",
              textTransform: "uppercase",
            }}
          >
            <span style={{ fontSize: "26px" }}>📖</span> Apprendre à lire en
            couleur
          </h5>
        </Col>
      </Row>

      {isMobile && (
        <Row
          className="align-items-center justify-content-center"
          style={{ marginTop: "10px", marginBottom: "10px", height: "130px" }}
        >
          <Col xs={12} lg={6} className="d-flex justify-content-center">
            <Row className="w-100 justify-content-center" style={{}}>
              <Col xs={3}>
                <Chakel name="الفَتْحَة" color="#ff0073" img={fatha} />
              </Col>
              <Col xs={3}>
                <Chakel name="الكَسْرَة" color="#009bee" img={kasra} />
              </Col>
              <Col xs={3}>
                <Chakel name="الضَمَّة" color="#04cf1f" img={dhamma} />
              </Col>
              <Col xs={3}>
                <Chakel name="السُّكُون" color="#962dc0" img={soukoun} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      {/* Zone principale (textarea ou output) */}
      <Row className="justify-content-center">
        <Col xs={12} lg={7} className="text-center">
          {!finished ? (
            <div
              className={`${s.textContainer} ${s.paddingBottom} shadow border-0`}
            >
              <textarea
                ref={textareaRef}
                className={`${s.textarea} shadow border-0 flex-fill`}
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (e.target.value.length > 0) setFinished(true);
                }}
                placeholder="اكتب نصًا هنا..."
                style={{
                  overflow: "hidden",
                  resize: "none",
                  direction: "rtl",
                  textAlign: "right",
                  fontFamily: "'Amiri', serif",
                  fontSize: "20px",
                  lineHeight: "2",
                  letterSpacing: "0", // très important pour éviter les lettres détachées
                }}
              />
            </div>
          ) : (
            <div
              className={`${s.textContainer} ${s.paddingBottom} shadow border-0`}
              style={outputStyle}
            >
              {/* Bouton reset */}
              <Icon.ArrowCounterclockwise
                onClick={reset}
                className={s.downloadIcon}
                style={{ color: "#ff4d4d" }}
                title="Réinitialiser"
              />
              <div
                ref={outputRef}
                className={`${s.outputDiv} shadow border-0 flex-fill pb-2 ${s.show}`}
                contentEditable={false}
                style={{
                  overflow: "hidden",
                  whiteSpace: "pre-wrap",
                  direction: "rtl",
                  textAlign: "right",
                  fontFamily: "'Amiri', serif",
                  fontSize: "22px",
                  lineHeight: "2.2",
                  letterSpacing: "0", // très important pour éviter les lettres détachées
                }}
              >
                {coloredSegments.length > 0 ? coloredSegments : "أدخل نص هنا"}
              </div>
            </div>
          )}

          {/* Bouton Word */}
          {finished && (
            <div className="mt-3 d-flex justify-content-center">
              <Icon.ArrowDownCircleFill
                onClick={() => exportToWord(coloredSegments)}
                className={s.downloadIcon}
              />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
