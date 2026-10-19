export default function SectionHeading({ number, label, title, emphasis, description }) {
  return (
    <div className="section-heading" data-scroll-reveal>
      <p className="section-label">{number} — {label}</p>
      <h2>{title} <em>{emphasis}</em></h2>
      {description ? <p className="section-lead">{description}</p> : null}
    </div>
  );
}
