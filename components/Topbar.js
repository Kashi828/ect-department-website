export default function Topbar({ settings }) {
  // tel: links must contain only digits (and an optional leading +): spaces or
  // brackets make some phone browsers refuse to open the dialer. The stored
  // number includes the trunk prefix "(0)", which is dropped when the country
  // code is present.
  const telHref = `tel:${String(settings.phone || "").replace(/\(0\)/g, "").replace(/[^+\d]/g, "")}`;
  return (
    <div className="top-strip">
      <div className="wrap top-strip__inner">
        <div className="top-strip__ticker" aria-label="Department announcement">
          <span className="top-strip__pulse" />
          <span>{settings.announcement}</span>
        </div>
        <div className="top-strip__links">
          <a href={`mailto:${settings.email}`}>EMAIL</a>
          <a href={telHref}>CALL · {settings.phone}</a>
          {settings.youtube && settings.youtube !== "#" ? (
            <a href={settings.youtube} target="_blank" rel="noopener noreferrer">YOUTUBE</a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
