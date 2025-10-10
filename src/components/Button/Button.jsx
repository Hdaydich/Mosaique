import s from "./style.module.css";

export function Button({
  name = "",
  icon: IconComponent,
  variant,
  size = 24,
  action,
}) {
  return (
    <button className={`${s.button} ${s[variant]}`} onClick={action}>
      {IconComponent && <IconComponent size={size} className={s.buttonIcon} />}
      {name != "" && <span style={{ paddingRight: "5px" }}>{name}</span>}
    </button>
  );
}
