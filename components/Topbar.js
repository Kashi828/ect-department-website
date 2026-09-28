export default function Topbar({ settings }) {
  return (
    <div className="top-strip">
      <div className="wrap top-strip__inner">
        <div className="top-strip__ticker" aria-label="Department announcement">
          <span className="top-strip__pulse" />
          <span>{settings.announcement}</span>
        </div>
        <div className="top-strip__links">
          <a href={`mailto:${settings.email}`}>EMAIL</a>
          <a href={`tel:${settings.phone}`}>CALL</a>
          <a href={settings.instagram}>INSTAGRAM</a>
        </div>
      </div>
    </div>
  );
}
