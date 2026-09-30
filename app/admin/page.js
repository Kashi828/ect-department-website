"use client";

import { useEffect, useRef, useState } from "react";
import PhotoCropModal from "@/components/PhotoCropModal";

function SnapshotsPanel() {
  const [snaps, setSnaps] = useState(null);
  const [msg, setMsg] = useState("");

  const load = () => {
    api("/admin/api/snapshots").then((r) => setSnaps(r.ok ? r.snapshots : []));
  };
  useEffect(load, []);

  async function restore(i, at) {
    if (!confirm("Replace ALL current content with the snapshot from " + new Date(at).toLocaleString() + "?")) return;
    const r = await api("/admin/api/snapshots", { index: i });
    setMsg(r.ok ? "Restored ✓ — switch tabs to see the restored content" : r.error || "Restore failed");
    setTimeout(() => setMsg(""), 4000);
  }

  return (
    <article className="admin-card">
      <div className="admin-card__head"><strong>Backup &amp; history (last 20 saves)</strong></div>
      <p style={{ fontSize: ".8rem", opacity: .7, margin: "4px 0 10px" }}>
        Every save keeps a snapshot of the content from just before it. If an edit goes wrong, restore one of these.
      </p>
      {msg && <p className="admin-saved">{msg}</p>}
      {!snaps && <p style={{ fontSize: ".8rem", opacity: .6 }}>Loading…</p>}
      {snaps?.length === 0 && <p style={{ fontSize: ".8rem", opacity: .6 }}>No snapshots yet — they appear here after your first save.</p>}
      {snaps?.map((s, i) => (
        <div key={s.at + i} className="admin-row" style={{ justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderTop: "1px solid rgba(128,128,128,.2)" }}>
          <span style={{ fontSize: ".8rem" }}>{new Date(s.at).toLocaleString()}</span>
          <button className="admin-btn admin-btn--small" onClick={() => restore(i, s.at)}>Restore</button>
        </div>
      ))}
    </article>
  );
}

const EMPTY = {
  siteSettings: {},
  events: [],
  achievements: [],
  toppers: [],
  faculty: [],
  alumni: [],
  gallery: [],
  syllabus: [],
};

const TABS = [
  ["siteSettings", "Settings"],
  ["faculty", "Faculty"],
  ["toppers", "Toppers"],
  ["events", "Activity"],
  ["achievements", "Wins"],
  ["alumni", "Alumni"],
  ["gallery", "Gallery"],
  ["syllabus", "Syllabus"],
];

async function api(path, body) {
  const res = await fetch(path, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : undefined);
  return res.json();
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("faculty");
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api("/admin/api/content").then((r) => {
      if (r.ok) { setAuthed(true); setData({ ...EMPTY, ...r.data }); }
    });
  }, []);

  async function login(e) {
    e.preventDefault();
    setError("");
    const r = await api("/admin/api/login", { password });
    if (!r.ok) { setError(r.error || "Login failed"); return; }
    const c = await api("/admin/api/content");
    if (c.ok) { setAuthed(true); setData({ ...EMPTY, ...c.data }); }
  }

  async function logout() {
    await api("/admin/api/logout", {});
    setAuthed(false);
    setData(null);
  }

  async function save(section) {
    setBusy(true);
    const r = await api("/admin/api/content", { section, value: data[section] });
    setBusy(false);
    setSaved(r.ok ? `${section} saved ✓` : r.error || "Save failed");
    setTimeout(() => setSaved(""), 2500);
  }

  async function upload(blob, cb) {
    const fd = new FormData();
    const name = blob.name || `photo-${Date.now()}.jpg`;
    fd.append("file", blob, name);
    const res = await fetch("/admin/api/upload", { method: "POST", body: fd });
    const r = await res.json();
    if (r.ok) cb(r.url);
    else alert(r.error || "Upload failed");
    return Boolean(r.ok); // lets PhotoCropModal keep the crop open on failure
  }

  if (!authed) {
    return (
      <div className="admin-login">
        <form className="admin-login__card" onSubmit={login}>
          <span className="admin-kicker">ECT / ADMIN</span>
          <h1>Department control room</h1>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button className="admin-btn admin-btn--primary" type="submit">Sign in →</button>
          {error && <p className="admin-error">{error}</p>}
        </form>
      </div>
    );
  }

  if (!data) return <div className="admin-login"><p className="admin-kicker">Loading…</p></div>;

  const setSection = (section, value) => setData((d) => ({ ...d, [section]: value }));

  return (
    <div className="admin">
      <header className="admin-top">
        <div>
          <span className="admin-kicker">ECT / ADMIN</span>
          <h1>Content control room</h1>
        </div>
        <div className="admin-top__right">
          {saved && <span className="admin-saved">{saved}</span>}
          <button className="admin-btn" onClick={logout}>Log out</button>
        </div>
      </header>

      <nav className="admin-tabs">
        {TABS.map(([key, label]) => (
          <button key={key} className={`admin-tab ${tab === key ? "is-active" : ""}`} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </nav>

      {tab === "siteSettings" && <SettingsEditor data={data.siteSettings} onChange={(v) => setSection("siteSettings", v)} save={save} upload={upload} busy={busy} />}
      {tab === "faculty" && <ListEditor section="faculty" items={data.faculty} onChange={(v) => setSection("faculty", v)} save={save} upload={upload} busy={busy}
        fields={{ name: "Name", role: "Role" }} photoKey="photo" />}
      {tab === "toppers" && <ListEditor section="toppers" items={data.toppers} onChange={(v) => setSection("toppers", v)} save={save} upload={upload} busy={busy}
        fields={{ name: "Name", yearLabel: "Year / Class", sgpa: "SGPA" }} photoKey="photo" />}
      {tab === "events" && <ListEditor section="events" items={data.events} onChange={(v) => setSection("events", v)} save={save} upload={upload} busy={busy}
        fields={{ title: "Title", subtitle: "Subtitle (optional)", date: "Start date (YYYY-MM-DD)", endDate: "End date — last day only for 2+ day events (optional)", time: "Time (optional)", venue: "Venue (optional)", resourcePerson: "Resource person (optional)", organizers: "Organisers (optional)" }} photoKey="poster" photoLabel="Poster" titleKey="title" crop={false} />}
      {tab === "achievements" && <ListEditor section="achievements" items={data.achievements} onChange={(v) => setSection("achievements", v)} save={save} upload={upload} busy={busy}
        fields={{ title: "Title", detail: "Detail" }} photoKey="poster" photoLabel="Poster" titleKey="title" crop={false} />}
      {tab === "alumni" && <ListEditor section="alumni" items={data.alumni} onChange={(v) => setSection("alumni", v)} save={save} upload={upload} busy={busy}
        fields={{ name: "Name", batch: "Batch", position: "Current position" }} titleKey="name" />}
      {tab === "gallery" && <GalleryEditor items={data.gallery} onChange={(v) => setSection("gallery", v)} save={save} upload={upload} busy={busy} />}
      {tab === "syllabus" && <SyllabusEditor items={data.syllabus} onChange={(v) => setSection("syllabus", v)} save={save} upload={upload} busy={busy} />}
    </div>
  );
}

/* ---------- shared bits ---------- */

function Field({ label, value, onChange, textarea }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {textarea ? (
        <textarea rows={2} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function PhotoPicker({ label, value, onChange, upload, aspect = 1, crop = true }) {
  const inputRef = useRef(null);
  const [pickedFile, setPickedFile] = useState(null);
  // Person photos (faculty, toppers) get the align/crop dialog so faces stay
  // in frame; posters and gallery images must upload exactly as-is.
  const pickerId = crop ? "crop" : "direct";
  const doUpload = (file) => {
    if (crop) setPickedFile(file);
    else upload(file, onChange);
  };
  return (
    <div className="admin-photo">
      <span className="admin-field__label">{label || "Photo"}</span>
      <div className="admin-photo__row">
        {value ? <img src={value} alt="" /> : <span className="admin-photo__empty">No image</span>}
        <input placeholder="/people/… or /uploads/…" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
        {/* A real button that clicks the input: more reliable than a styled
            <label> wrapper on phone browsers. */}
        <button type="button" className="admin-btn admin-btn--small" onClick={() => inputRef.current?.click()}>
          Upload
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) doUpload(f);
            e.target.value = "";
          }}
        />
        {value && <button className="admin-btn admin-btn--small" onClick={() => onChange("")}>Clear</button>}
      </div>
      {pickedFile && pickerId === "crop" && (
        <PhotoCropModal
          file={pickedFile}
          label={label || "Photo"}
          aspect={aspect}
          onCancel={() => setPickedFile(null)}
          onConfirm={async (blob) => {
            const ok = await upload(blob, onChange);
            if (ok) setPickedFile(null); // close only after a successful upload
          }}
        />
      )}
    </div>
  );
}

function ListEditor({ section, items = [], onChange, save, upload, busy, fields, photoKey, photoLabel, titleKey = "name", crop = true }) {
  const move = (i, dir) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const update = (i, key, val) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  const blank = Object.fromEntries(Object.keys(fields).map((k) => [k, ""]));

  return (
    <section className="admin-section">
      {items.map((item, i) => (
        <article key={i} className="admin-card">
          <div className="admin-card__head">
            <strong>{String(i + 1).padStart(2, "0")} · {item[titleKey] || `Untitled ${section}`}</strong>
            <div className="admin-card__actions">
              <button onClick={() => move(i, -1)} title="Move up">↑</button>
              <button onClick={() => move(i, 1)} title="Move down">↓</button>
              <button className="admin-danger" onClick={() => onChange(items.filter((_, j) => j !== i))}>Delete</button>
            </div>
          </div>
          <div className="admin-grid">
            {Object.entries(fields).map(([key, label]) => (
              <Field key={key} label={label} value={item[key]} textarea={key === "detail" || key === "blurb"} onChange={(v) => update(i, key, v)} />
            ))}
          </div>
          {photoKey && <PhotoPicker label={photoLabel || "Photo"} value={item[photoKey]} onChange={(v) => update(i, photoKey, v)} upload={upload} crop={crop} />}
        </article>
      ))}
      <div className="admin-row">
        <button className="admin-btn" onClick={() => onChange([...items, { _id: `n${Date.now()}`, ...blank }])}>+ Add {section.replace(/s$/, "")}</button>
        <button className="admin-btn admin-btn--primary" disabled={busy} onClick={() => save(section)}>{busy ? "Saving…" : "Save changes"}</button>
      </div>
    </section>
  );
}

/* ---------- settings ---------- */

function SettingsEditor({ data, onChange, upload, save, busy }) {
  return (
    <section className="admin-section">
      <article className="admin-card">
        <div className="admin-grid">
          <Field label="Phone" value={data.phone} onChange={(v) => onChange({ ...data, phone: v })} />
          <Field label="Email" value={data.email} onChange={(v) => onChange({ ...data, email: v })} />
          <Field label="Announcement ticker" value={data.announcement} textarea onChange={(v) => onChange({ ...data, announcement: v })} />
          <Field label="Hero line 1" value={data.heroLine1} onChange={(v) => onChange({ ...data, heroLine1: v })} />
          <Field label="Hero line 2" value={data.heroLine2} onChange={(v) => onChange({ ...data, heroLine2: v })} />
          <Field label="Hero subtitle" value={data.heroSubtitle} textarea onChange={(v) => onChange({ ...data, heroSubtitle: v })} />
          <Field label="YouTube channel URL" value={data.youtube} onChange={(v) => onChange({ ...data, youtube: v })} />
        </div>
      </article>

      <article className="admin-card">
        <div className="admin-card__head"><strong>Hero quotes · slide 2</strong></div>
        <div className="admin-grid">
          <Field label="Slide 2 title" value={data.heroQuote?.slide2Title} onChange={(v) => onChange({ ...data, heroQuote: { ...data.heroQuote, slide2Title: v } })} />
          <Field label="Slide 2 subtitle" value={data.heroQuote?.slide2Subtitle} textarea onChange={(v) => onChange({ ...data, heroQuote: { ...data.heroQuote, slide2Subtitle: v } })} />
          <Field label="Highlight 1" value={data.heroQuote?.highlight1} onChange={(v) => onChange({ ...data, heroQuote: { ...data.heroQuote, highlight1: v } })} />
          <Field label="Highlight 2" value={data.heroQuote?.highlight2} onChange={(v) => onChange({ ...data, heroQuote: { ...data.heroQuote, highlight2: v } })} />
          <Field label="Highlight 3" value={data.heroQuote?.highlight3} onChange={(v) => onChange({ ...data, heroQuote: { ...data.heroQuote, highlight3: v } })} />
          <Field label="Highlight 4" value={data.heroQuote?.highlight4} onChange={(v) => onChange({ ...data, heroQuote: { ...data.heroQuote, highlight4: v } })} />
        </div>
      </article>

      <article className="admin-card">
        <div className="admin-card__head"><strong>From the HOD's desk · About page quote</strong></div>
        <div className="admin-grid">
          <Field label="Title line 1" value={data.hodQuote?.titleLine1} onChange={(v) => onChange({ ...data, hodQuote: { ...data.hodQuote, titleLine1: v } })} />
          <Field label="Title line 2" value={data.hodQuote?.titleLine2} onChange={(v) => onChange({ ...data, hodQuote: { ...data.hodQuote, titleLine2: v } })} />
          <Field label="Paragraph 1" value={data.hodQuote?.paragraph1} textarea onChange={(v) => onChange({ ...data, hodQuote: { ...data.hodQuote, paragraph1: v } })} />
          <Field label="Paragraph 2" value={data.hodQuote?.paragraph2} textarea onChange={(v) => onChange({ ...data, hodQuote: { ...data.hodQuote, paragraph2: v } })} />
        </div>
      </article>

      <article className="admin-card">
        <div className="admin-card__head"><strong>DEPT_SIGNAL.log terminal (hero right)</strong></div>
        <div className="admin-grid">
          <Field label="Command line" value={data.heroQuote?.signalCommand} onChange={(v) => onChange({ ...data, heroQuote: { ...data.heroQuote, signalCommand: v } })} />
          <Field label="Title line 1" value={data.heroQuote?.signalTitleLine1} onChange={(v) => onChange({ ...data, heroQuote: { ...data.heroQuote, signalTitleLine1: v } })} />
          <Field label="Title line 2 (starts with 'meets…')" value={data.heroQuote?.signalTitleLine2} onChange={(v) => onChange({ ...data, heroQuote: { ...data.heroQuote, signalTitleLine2: v } })} />
          <Field label="Meta line" value={data.heroQuote?.signalMeta} onChange={(v) => onChange({ ...data, heroQuote: { ...data.heroQuote, signalMeta: v } })} />
        </div>
      </article>

      <div className="admin-row">
        <a className="admin-btn" href="/api/content-export" download="ect-content.json">Download backup (JSON)</a>
        <button className="admin-btn admin-btn--primary" disabled={busy} onClick={() => save("siteSettings")}>{busy ? "Saving…" : "Save changes"}</button>
      </div>
      <SnapshotsPanel />
    </section>
  );
}

/* ---------- gallery ---------- */

function GalleryEditor({ items = [], onChange, save, upload, busy }) {
  const update = (i, key, val) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  return (
    <section className="admin-section">
      {items.map((g, i) => (
        <article key={i} className="admin-card">
          <div className="admin-card__head">
            <strong>{String(i + 1).padStart(2, "0")} · {g.label || "Untitled"}</strong>
            <button className="admin-danger" onClick={() => onChange(items.filter((_, j) => j !== i))}>Delete</button>
          </div>
          <div className="admin-grid">
            <Field label="Caption" value={g.label} onChange={(v) => update(i, "label", v)} />
          </div>
          <PhotoPicker label="Image" value={g.src} onChange={(v) => update(i, "src", v)} upload={upload} crop={false} />
        </article>
      ))}
      <div className="admin-row">
        <button className="admin-btn" onClick={() => onChange([...items, { src: "", label: "" }])}>+ Add photo</button>
        <button className="admin-btn admin-btn--primary" disabled={busy} onClick={() => save("gallery")}>{busy ? "Saving…" : "Save changes"}</button>
      </div>
    </section>
  );
}

/* ---------- syllabus ---------- */

function SyllabusEditor({ items = [], onChange, save, upload, busy }) {
  const updateSem = (i, key, val) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  const updateCourse = (si, ci, key, val) => {
    const next = [...items];
    const courses = [...next[si].courses];
    courses[ci] = { ...courses[ci], [key]: val };
    next[si] = { ...next[si], courses };
    onChange(next);
  };
  return (
    <section className="admin-section">
      {items.map((sem, si) => (
        <article key={si} className="admin-card">
          <div className="admin-card__head">
            <strong>Semester {sem.semester} · {sem.title}</strong>
            <button className="admin-danger" onClick={() => onChange(items.filter((_, j) => j !== si))}>Delete semester</button>
          </div>
          <div className="admin-grid admin-grid--4">
            <Field label="Semester no." value={sem.semester} onChange={(v) => updateSem(si, "semester", Number(v) || v)} />
            <Field label="Exam session" value={sem.session} onChange={(v) => updateSem(si, "session", v)} />
            <Field label="Title" value={sem.title} onChange={(v) => updateSem(si, "title", v)} />
            <Field label="Blurb" value={sem.blurb} textarea onChange={(v) => updateSem(si, "blurb", v)} />
          </div>
          <div className="admin-courses">
            {sem.courses?.map((c, ci) => (
              <div key={ci} className="admin-course">
                <Field label="Code (optional)" value={c.code} onChange={(v) => updateCourse(si, ci, "code", v)} />
                <Field label="Course name" value={c.name} onChange={(v) => updateCourse(si, ci, "name", v)} />
                <Field label="Type" value={c.type} onChange={(v) => updateCourse(si, ci, "type", v)} />
                <button className="admin-btn admin-btn--small" onClick={() => {
                  const next = [...items];
                  next[si] = { ...next[si], courses: next[si].courses.filter((_, j) => j !== ci) };
                  onChange(next);
                }}>Remove</button>
              </div>
            ))}
          </div>
          <button className="admin-btn admin-btn--small" onClick={() => updateSem(si, "courses", [...(sem.courses || []), { code: "", name: "", type: "DSC · ECT" }])}>+ Add course</button>
        </article>
      ))}
      <div className="admin-row">
        <button className="admin-btn" onClick={() => onChange([...items, { semester: items.length + 1, session: "", title: "New semester", blurb: "", courses: [] }])}>+ Add semester</button>
        <button className="admin-btn admin-btn--primary" disabled={busy} onClick={() => save("syllabus")}>{busy ? "Saving…" : "Save changes"}</button>
      </div>
    </section>
  );
}
