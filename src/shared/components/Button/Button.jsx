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
        padding: name ? " 10px " : "5px 10px",
      }}
    >
      {IconComponent && <IconComponent size={size} />}
      {name && <span style={{ padding: "0px 5px" }}>{name}</span>}
    </button>
  );
}
