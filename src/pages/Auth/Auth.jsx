import { useState, useEffect } from "react";
import s from "./style.module.css";
import aviator from "../../assets/aviator.png";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { Button } from "../../components/Button/Button";

export const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    photo: null,
    nom: "",
    prenom: "",
    dateNaissance: "",
    sexe: "",
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [errors, setErrors] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

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

  const validate = () => {
    const errs = {};
    if (!formData.email.includes("@")) errs.email = "Email invalide";
    const pwd = formData.password;
    if (pwd.length < 8 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) {
      errs.password =
        "Le mot de passe doit avoir >8 caractères, 1 majuscule et 1 chiffre";
    }
    if (!formData.nom) errs.nom = "Nom requis";
    if (!formData.prenom) errs.prenom = "Prénom requis";
    if (!formData.dateNaissance) errs.dateNaissance = "Date requise";
    if (!formData.sexe) errs.sexe = "Sexe requis";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Compte créé avec succès !");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert("Connexion réussie !");
    setShowLoginModal(false);
  };

  return (
    <Container className={s.container}>
      <Row>
        <h2 className={s.pageTitle}>Créer un compte</h2>
      </Row>
      <Row className="justify-content-center">
        {/* --- Partie gauche : connexion --- */}
        {!isMobile && (
          <Col lg={5}>
            <Form onSubmit={handleSubmit}>
              <div
                className={s.cardSection}
                style={{ backgroundColor: "#ffea8a80" }}
              >
                <h4 className={s.sectionTitle}>
                  <PersonFill /> Infos de connexion
                </h4>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className={s.error}>{errors.email}</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className={s.error}>{errors.password}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-1">
                  <Form.Control
                    type="password"
                    placeholder="Confirmer le mot de passe"
                  />
                </Form.Group>
              </div>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Button
                  name="Confirmer"
                  variant="warning"
                  action={handleSubmit}
                />
              </div>
            </Form>

            <Row className="justify-content-center mt-2">
              <Col lg={12} style={{ textAlign: "center" }}>
                <p>
                  Déjà un compte ?{" "}
                  <a
                    variant="link"
                    className={s.loginLink}
                    onClick={() => setShowLoginModal(true)}
                  >
                    Se connecter
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
        )}
        {/* --- Partie droite : fiche enfant --- */}
        <Col lg={7}>
          <Form onSubmit={handleSubmit}>
            <div
              className={s.cardSection}
              style={{ backgroundColor: "#ffea8a80" }}
            >
              <h4 className={s.sectionTitle}>
                <PersonFill /> Fiche enfant
              </h4>
              <Row>
                {isMobile && (
                  <Col
                    lg={4}
                    className="d-flex flex-column align-items-center mb-3"
                  >
                    <img
                      src={
                        formData.photo
                          ? URL.createObjectURL(formData.photo)
                          : aviator
                      }
                      alt="Avatar"
                      className={s.avatarLarge}
                      onClick={() =>
                        document.getElementById("photoInput").click()
                      }
                    />
                    <Form.Control
                      type="file"
                      name="photo"
                      id="photoInput"
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                  </Col>
                )}
                <Col lg={8}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                    />
                    {errors.nom && <p className={s.error}>{errors.nom}</p>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Prénom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                    />
                    {errors.prenom && (
                      <p className={s.error}>{errors.prenom}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={s.label}>
                      Date de naissance
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="dateNaissance"
                      value={formData.dateNaissance}
                      onChange={handleChange}
                    />
                    {errors.dateNaissance && (
                      <p className={s.error}>{errors.dateNaissance}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Select
                      name="sexe"
                      value={formData.sexe}
                      onChange={handleChange}
                    >
                      <option value="">Garçon / Fille </option>
                      <option value="homme">Garçon</option>
                      <option value="femme">Fille</option>
                    </Form.Select>
                    {errors.sexe && <p className={s.error}>{errors.sexe}</p>}
                  </Form.Group>
                </Col>

                {!isMobile && (
                  <Col lg={4} className="d-flex flex-column align-items-center">
                    <img
                      src={
                        formData.photo
                          ? URL.createObjectURL(formData.photo)
                          : aviator
                      }
                      alt="Avatar"
                      className={s.avatarLarge}
                      onClick={() =>
                        document.getElementById("photoInput").click()
                      }
                    />
                    <Form.Control
                      type="file"
                      name="photo"
                      id="photoInput"
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                  </Col>
                )}
              </Row>
            </div>
          </Form>
        </Col>

        {isMobile && (
          <Col lg={5}>
            <Form onSubmit={handleSubmit}>
              <div
                className={s.cardSection}
                style={{ backgroundColor: "#ffea8a80" }}
              >
                <h4 className={s.sectionTitle}>
                  <PersonFill /> Infos de connexion
                </h4>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className={s.error}>{errors.email}</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className={s.error}>{errors.password}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-1">
                  <Form.Control
                    type="password"
                    placeholder="Confirmer le mot de passe"
                  />
                </Form.Group>
              </div>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Button
                  name="Confirmer"
                  variant="warning"
                  action={handleSubmit}
                />
              </div>
            </Form>

            <Row className="justify-content-center mt-2">
              <Col lg={12} style={{ textAlign: "center" }}>
                <p>
                  Déjà un compte ?{" "}
                  <a
                    variant="link"
                    className={s.loginLink}
                    onClick={() => setShowLoginModal(true)}
                  >
                    Se connecter
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
        )}
      </Row>

      {/* --- Modal Se connecter --- */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
        dialogClassName={s.customModal}
      >
        <Modal.Header closeButton className={s.modalHeader}>
          <Modal.Title>Connexion</Modal.Title>
        </Modal.Header>

        <Modal.Body className={s.modalBody}>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className={s.label}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre email"
                className={s.inputField}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={s.label}>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
                className={s.inputField}
                required
              />
            </Form.Group>

            <div style={{ textAlign: "center", marginTop: "25px" }}>
              <Button
                name="Se connecter"
                variant="confirmButtonSmall"
                action={handleLoginSubmit}
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
