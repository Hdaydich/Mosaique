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
import stories from "../../data/stories";

export function Reading() {
  const [inputText, setInputText] = useState("");
  const [coloredSegments, setColoredSegments] = useState([]);
  const [finished, setFinished] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [carouselStart, setCarouselStart] = useState(0);
  const cardsPerPage = 5;

  const textareaRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    setColoredSegments(SegmentColor(inputText));
  }, [inputText]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hauteur automatique textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputText]);

  // Hauteur automatique outputDiv
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.style.height = "auto";
      outputRef.current.style.height = outputRef.current.scrollHeight + "px";
    }
  }, [coloredSegments]);

  const chakels = [
    { name: "الفَتْحَة", color: "#ff0073", img: fatha },
    { name: "الكَسْرَة", color: "#009bee", img: kasra },
    { name: "الضَمَّة", color: "#04cf1f", img: dhamma },
    { name: "السُّكُون", color: "#962dc0", img: soukoun },
  ];

  const reset = () => {
    setInputText("");
    setFinished(false);
  };

  const handleCarouselNext = () => {
    if (carouselStart + cardsPerPage < stories.length)
      setCarouselStart(carouselStart + 1);
  };
  const handleCarouselPrev = () => {
    if (carouselStart > 0) setCarouselStart(carouselStart - 1);
  };

  const visibleStories = stories.slice(
    carouselStart,
    carouselStart + cardsPerPage
  );

  return (
    <Container fluid>
      {/* Header: Logo + Carousel */}
      <Row
        className="align-items-center justify-content-center mb-3"
        style={{ height: isMobile ? "auto" : "150px" }}
      >
        {/* Logo */}
        <Col xs={12} lg={2} className="text-center text-lg-start">
          <Logo
            subtitle="Chaque enfant, une pièce unique"
            width={110}
            police={8}
            align="left"
            marg="0px"
          />
        </Col>

        {/* Carousel */}
        <Col xs={12} lg={10} className={s.carouselWrapper}>
          <div
            className={`${s.carouselArrow} ${s.left}`}
            onClick={handleCarouselPrev}
          >
            <Icon.ChevronLeft />
          </div>
          <div
            className={`${s.carouselArrow} ${s.right}`}
            onClick={handleCarouselNext}
          >
            <Icon.ChevronRight />
          </div>

          <div className={s.carouselAutoContainer}>
            <div className={s.carouselAutoTrack}>
              {visibleStories.map((story, idx) => (
                <div
                  key={idx}
                  className={s.carouselCard}
                  onClick={() => {
                    setInputText(story.text);
                    setFinished(true);
                  }}
                >
                  <div className={s.carouselIcon}>{story.icon}</div>
                  <div className={s.carouselTitle}>{story.title}</div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* Titre */}
      <Row className="justify-content-center">
        <Col lg={7} className="text-center">
          <h5
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              color: "#0e0e0eff",
              padding: "10px",
              margin: "10px",
              background: "#a5f3fcce",
              borderRadius: "20px",
              textTransform: "uppercase",
            }}
          >
            <span style={{ fontSize: "26px" }}>📖</span> Apprendre à lire en
            couleur
          </h5>
        </Col>
      </Row>

      {/* Row Chakels */}
      <Row className="justify-content-center mb-3">
        <Col
          xs={12}
          className="d-flex align-items-center justify-content-center"
          style={{
            overflowX: isMobile ? "auto" : "visible",
            gap: "15px",
            padding: "10px",
          }}
        >
          {chakels.map((c) => (
            <Chakel
              key={c.name}
              name={c.name}
              color={c.color}
              img={c.img}
              size={isMobile ? "14px" : "20px"}
            />
          ))}
        </Col>
      </Row>

      {/* Zone principale */}
      <Row className="justify-content-center">
        <Col xs={12} lg={7} className="text-center">
          {!finished ? (
            <textarea
              ref={textareaRef}
              className={`${s.textarea} rtl-text shadow border-0 flex-fill mt-3`}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (e.target.value.length > 0) setFinished(true);
              }}
              placeholder="اكتب نصًا هنا..."
            />
          ) : (
            <div>
              <div
                ref={outputRef}
                className={`${s.outputDiv} rtl-text shadow border-0 flex-fill mt-3 ${s.show}`}
                contentEditable={false}
              >
                {coloredSegments.length > 0 ? coloredSegments : "أدخل نص هنا"}
              </div>
            </div>
          )}

          {finished && (
            <div
              className="mt-2 d-flex justify-content-center"
              style={{ gap: "10px" }}
            >
              <Icon.ArrowCounterclockwise
                onClick={reset}
                className={s.downloadIcon}
                style={{ color: "#ff4d4d" }}
                title="Réinitialiser"
              />
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
