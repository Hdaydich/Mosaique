import s from "./style.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Col } from "react-bootstrap";
export function Logo({
  subtitle,
  width = 180,
  police = 10,
  align = "center",
  marg = "auto",
}) {
  const navigate = useNavigate();
  return (
    <div className={s.logoContainer}>
      <img
        src={logo}
        style={{
          maxWidth: width,
          height: "auto",
          alignitems: align,
          margin: marg,
        }}
        alt="Mosaique"
      />
      {subtitle && (
        <span
          className={s.subtitle}
          style={{ fontSize: police, alignItems: align }}
        >
          <i>{subtitle}</i>
        </span>
      )}
    </div>
  );
}
