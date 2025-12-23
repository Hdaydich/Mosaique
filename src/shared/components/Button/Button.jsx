import s from "./style.module.css";

export function Button({
  name = "",
  icon: IconComponent,
  variant,
  size = 20,
  fontsize = 16,
  action,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (typeof action === "function") action();
  };

  return (
    <button
      type="button"
      className={`${s.button} ${s[variant]}`}
      onClick={handleClick}
      style={{
        fontSize: `${fontsize}px`,
        padding: name ? " 10px 20px" : "5px 10px",
      }}
    >
      {IconComponent && <IconComponent size={size} className={s.buttonIcon} />}
      {name && <span style={{ padding: "0px 10px" }}>{name}</span>}
    </button>
  );
}
