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
          {settings.youtube && settings.youtube !== "#" ? (
            <a href={settings.youtube} target="_blank" rel="noopener noreferrer">YOUTUBE</a>
          ) : null}
          {settings.instagram && settings.instagram !== "#" ? (
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
