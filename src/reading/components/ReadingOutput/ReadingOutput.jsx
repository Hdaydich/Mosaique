import s from "./style.module.css";

export function ReadingOutput({ segments }) {
  if (!segments || segments.length === 0) {
    return (
      <div
        className={s.scrollContainer}
        dir="rtl"
        lang="ar"
        style={{ height: "100%" }}
      >
        <div className={s.textBlock}>
          <textarea></textarea>
        </div>
      </div>
    );
  }

  return (
    <div
      className={s.scrollContainer}
      dir="rtl"
      lang="ar"
      style={{ height: "100%" }}
    >
      <div className={s.textBlock}>
        {segments.map((seg, i) => (
          <span key={i} className={s.segment}>
            {seg}
          </span>
        ))}
      </div>
    </div>
  );
}
