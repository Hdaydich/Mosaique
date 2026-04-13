import s from "./style.module.css";

export function Logo() {
  const logo = "/favicon.png";
  return (
    <div className={s.logoContainer}>
      <img src={logo} alt="Logo Mosaique" className={s.logoImage} />

      <div className={s.logoTxt}>
        <h1 className={s.logoTitle}>M O S A I Q U E</h1>
        <p className={s.logoSlog}>Chaque enfant, une pièce unique</p>
      </div>
    </div>
  );
}
