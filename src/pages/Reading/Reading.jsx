import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { SegmentColor } from "../../utils/SegmentColor";
import { Chakel } from "../../components/Chakel/Chakel";
import { exportToWord } from "../../utils/exportToWord";
import * as Icon from "react-bootstrap-icons";
import fatha from "../../assets/fatha.png";
import kasra from "../../assets/kasra.png";
import dhamma from "../../assets/dhamma.png";
import soukoun from "../../assets/skoun.png";
import s from "./style.module.css";
import stories from "../../data/stories";
import { NavBar } from "../../components/NavBar/NavBar";
import { Button } from "../../components/Button/Button";

export function Reading() {
  const [inputText, setInputText] = useState("");
  const [coloredSegments, setColoredSegments] = useState([]);
  const [mode, setMode] = useState("list"); // "list" | "new" | "story"
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const textareaRef = useRef(null);
  const outputRef = useRef(null);
  const carouselRef = useRef(null);

  const chakels = [
    { name: "الفَتْحَة", color: "#ff0073", img: fatha },
    { name: "الكَسْرَة", color: "#009bee", img: kasra },
    { name: "الضَمَّة", color: "#04cf1f", img: dhamma },
    { name: "السُّكُون", color: "#962dc0", img: soukoun },
  ];

  useEffect(() => {
    setColoredSegments(SegmentColor(inputText));
  }, [inputText]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto height textarea / output
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
    if (outputRef.current) {
      outputRef.current.style.height = "auto";
      outputRef.current.style.height = outputRef.current.scrollHeight + "px";
    }
  }, [inputText, coloredSegments]);

  const reset = () => {
    setInputText("");
    setColoredSegments([]);
    setMode("list");
  };

  const handleCarouselNext = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstChild.offsetWidth + 15;
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const handleCarouselPrev = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstChild.offsetWidth + 15;
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const handleConfirmStory = () => {
    setColoredSegments(SegmentColor(inputText));
    setMode("story");
  };

  return (
    <Container fluid className={s.logoContainer}>
      <NavBar logoWidth="80px" police="5px" />

      {/* --- MODE LIST --- */}
      {mode === "list" && (
        <>
          {/* Titre */}
          <Row
            className={s.title}
            style={{ marginTop: isMobile ? "50px" : "0px" }}
          >
            <div>Liste des contes 📚 قائمة القصص</div>
          </Row>

          {/* Carousel */}
          <Row
            className="align-items-center"
            style={{
              width: isMobile ? "90%" : "70%",
              margin: isMobile ? "50px auto" : "80px auto",
              marginBottom: isMobile ? "30px" : "30px",
            }}
          >
            <Col
              lg={1}
              className="d-flex align-items-center justify-content-center"
            >
              <div className={s.carouselArrow} onClick={handleCarouselPrev}>
                <Icon.ChevronLeft />
              </div>
            </Col>

            <Col xs={12} lg={10}>
              <div className={s.carouselCenterContainer} ref={carouselRef}>
                {stories.map((story, idx) => (
                  <div
                    key={idx}
                    className={s.carouselCard}
                    onClick={() => {
                      setInputText(story.text);
                      setMode("story");
                    }}
                  >
                    <div className={s.carouselIcon}>{story.icon}</div>
                    <div className={s.carouselTitle}>{story.title}</div>
                  </div>
                ))}
              </div>
            </Col>

            <Col
              lg={1}
              className="d-flex align-items-center justify-content-center"
            >
              <div className={s.carouselArrow} onClick={handleCarouselNext}>
                <Icon.ChevronRight />
              </div>
            </Col>
          </Row>

          {/* Bouton Ajouter */}
          <Row className="justify-content-center mb-4">
            <Col xs="auto">
              <Button
                name="Créez votre propre texte "
                icon={Icon.PlusCircleFill}
                variant="addButton"
                action={() => setMode("new")}
              />
            </Col>
          </Row>
        </>
      )}

      {/* --- MODE STORY / NEW --- */}
      {(mode === "story" || mode === "new") && (
        <>
          {/* Titre */}
          <Row
            className={s.title}
            style={{ marginTop: isMobile ? "50px" : "0px" }}
          >
            <Col xs={12}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "1.8rem",
                  fontWeight: "500",
                  color: "#424242",
                  justifyContent: "center", // <- centrer horizontalement
                }}
              >
                <Button
                  icon={Icon.ArrowLeftCircle}
                  variant="backButtonSmall"
                  size={28}
                  action={reset}
                />
                <span>Lecture en couleurs 📚</span>
              </div>
            </Col>
          </Row>

          {/* Ligne chakels */}
          <Row className="justify-content-center mb-1 mt-4">
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
            <Col xs={12} lg={7} className="text-center mt-3">
              {mode === "new" ? (
                <>
                  <textarea
                    ref={textareaRef}
                    dir="rtl"
                    lang="ar"
                    className={s.textarea}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="✏️ اكتب أو الصق نصّك هنا..."
                    style={{ textAlign: "right" }}
                  />
                  <Row className="justify-content-center align-items-center mb-4 mt-2">
                    <Col xs="auto">
                      <Button
                        icon={Icon.CheckCircleFill}
                        variant="confirmButtonSmall"
                        size={24}
                        action={handleConfirmStory}
                      />
                    </Col>
                  </Row>
                </>
              ) : (
                <div
                  ref={outputRef}
                  dir="rtl"
                  lang="ar"
                  className={s.outputDiv}
                  contentEditable={false}
                  style={{ textAlign: "right" }}
                >
                  {coloredSegments.length > 0
                    ? coloredSegments
                    : "لا يوجد نصّ متاح"}
                </div>
              )}

              {/* Télécharger */}
              {mode === "story" && (
                <Row className="mt-3 mb-3 d-flex justify-content-center">
                  <Col xs="auto">
                    <Button
                      name="Télécharger"
                      icon={Icon.CloudArrowDownFill}
                      variant="downloadCuteButton"
                      action={() => exportToWord(coloredSegments)}
                    />
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
