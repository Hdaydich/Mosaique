import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button as BsButton } from "react-bootstrap";
import s from "./style.module.css";
import aviator from "../../../assets/aviator.png";
import { GenderFemale, GenderMale } from "react-bootstrap-icons";
import { Button } from "../../../shared/components/Button/Button";

export function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    dateNaissance: "",
    sexe: "",
    photo: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGenderSelect = (gender) => {
    setFormData({ ...formData, sexe: gender });
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.includes("@")) errs.email = "Email invalide";
    if (formData.password.length < 8)
      errs.password = "Mot de passe ≥ 8 caractères";
    if (!isLoginMode) {
      if (!formData.nom) errs.nom = "Nom requis";
      if (!formData.prenom) errs.prenom = "Prénom requis";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
    } else {
      setErrors({});
      alert(isLoginMode ? "Connexion réussie ✅" : "Compte créé 🎉");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <div
            className={s.card}
            style={{
              width: isLoginMode && !isMobile ? "70%" : "90%",
              marginTop: isMobile ? "20px" : "0",
            }}
          >
            <h2 className={s.pageTitle}>
              {isLoginMode ? "Se connecter" : "Créer un compte"}
            </h2>
            <div className={s.cardBody}>
              <Form onSubmit={handleSubmit}>
                {!isLoginMode ? (
                  <Row>
                    {/* === Colonne gauche : avatar + mail/mdp === */}
                    <Col
                      lg={6}
                      style={{
                        marginTop: "0px",
                      }}
                    >
                      <div className={s.avatarContainer}>
                        <img
                          src={
                            formData.photo
                              ? URL.createObjectURL(formData.photo)
                              : aviator
                          }
                          alt="avatar"
                          className={s.avatar}
                          onClick={() =>
                            document.getElementById("photoInput").click()
                          }
                        />
                        <input
                          type="file"
                          id="photoInput"
                          name="photo"
                          accept="image/*"
                          onChange={handleChange}
                          style={{ display: "none" }}
                        />
                        <p className={s.avatarText}>
                          Cliquer pour ajouter une photo
                        </p>
                      </div>

                      <Form.Group className={s.formGroup}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="exemple@email.com"
                        />
                        {errors.email && (
                          <p className={s.error}>{errors.email}</p>
                        )}
                      </Form.Group>

                      <Form.Group className={s.formGroup}>
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="********"
                        />
                        {errors.password && (
                          <p className={s.error}>{errors.password}</p>
                        )}
                      </Form.Group>
                    </Col>

                    <Col
                      lg={6}
                      style={{ marginTop: isMobile ? "0px" : "22px" }}
                    >
                      <Form.Group className={s.formGroup}>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          placeholder="Votre nom"
                        />
                        {errors.nom && <p className={s.error}>{errors.nom}</p>}
                      </Form.Group>

                      <Form.Group className={s.formGroup}>
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                          type="text"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          placeholder="Votre prénom"
                        />
                        {errors.prenom && (
                          <p className={s.error}>{errors.prenom}</p>
                        )}
                      </Form.Group>
                      <Form.Group className={s.formGroup}>
                        <Row className="align-items-center">
                          <Col xs={2} lg={2}>
                            <Form.Label>Sexe</Form.Label>
                          </Col>

                          <Col xs={3} lg={3}>
                            <Button
                              icon={GenderFemale}
                              variant={
                                formData.sexe === "fille"
                                  ? "pink"
                                  : "outlinePink"
                              }
                              action={() => handleGenderSelect("fille")}
                            />
                          </Col>

                          <Col xs={3} lg={3}>
                            <Button
                              icon={GenderMale}
                              variant={
                                formData.sexe === "garçon"
                                  ? "blue"
                                  : "outlineBlue"
                              }
                              action={() => handleGenderSelect("garçon")}
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className={s.formGroup}>
                        <Form.Label>Date de naissance</Form.Label>
                        <Form.Control
                          type="date"
                          name="dateNaissance"
                          value={formData.dateNaissance}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Form.Group className={s.formGroup}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="exemple@email.com"
                      />
                    </Form.Group>
                    <Form.Group className={s.formGroup}>
                      <Form.Label>Mot de passe</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="********"
                      />
                    </Form.Group>
                  </Row>
                )}
                <Row>
                  {!isLoginMode ? (
                    <div style={{ margin: "0px auto", textAlign: "center" }}>
                      <Button
                        name="S’inscrire"
                        variant="outlineSuccess"
                        action={handleSubmit}
                      />
                      <p className={s.switchText}>
                        Déjà un compte ?{" "}
                        <BsButton
                          variant="link"
                          className={s.switchButton}
                          onClick={() => setIsLoginMode(true)}
                        >
                          Se connecter
                        </BsButton>
                      </p>
                    </div>
                  ) : (
                    <div style={{ margin: "0px auto", textAlign: "center" }}>
                      <Button
                        name="Se connecter"
                        variant="outlineSuccess"
                        action={handleSubmit}
                      />
                      <p className={s.switchText}>
                        Pas encore de compte ?{" "}
                        <BsButton
                          variant="link"
                          className={s.switchButton}
                          onClick={() => setIsLoginMode(false)}
                        >
                          S’inscrire
                        </BsButton>
                      </p>
                    </div>
                  )}
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
