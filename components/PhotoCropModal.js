"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";

// Decode a File into an image source, baking in EXIF orientation so phone
// photos (which rely on EXIF rotation) appear upright in the cropper.
async function decodeImage(file) {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      /* fall through to <img> decoding */
    }
  }
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

// Render the decoded image into a canvas cropped by the cropper's output,
// returning a JPEG blob ready for upload.
async function cropToBlob(image, croppedArea, { rotation = 0, maxSide = 1200 } = {}) {
  const rad = (rotation * Math.PI) / 180;
  const iw = image.width ?? image.naturalWidth;
  const ih = image.height ?? image.naturalHeight;

  // Bounding box of the rotated image.
  const rotW = Math.abs(iw * Math.cos(rad)) + Math.abs(ih * Math.sin(rad));
  const rotH = Math.abs(iw * Math.sin(rad)) + Math.abs(ih * Math.cos(rad));

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(rotW);
  canvas.height = Math.round(rotH);
  const ctx = canvas.getContext("2d");
  ctx.translate(rotW / 2, rotH / 2);
  ctx.rotate(rad);
  ctx.drawImage(image, -iw / 2, -ih / 2);

  const sx = croppedArea.x; // already pixels, relative to the rotated bounding box
  const sy = croppedArea.y;
  const sw = croppedArea.width;
  const sh = croppedArea.height;

  const out = document.createElement("canvas");
  const scale = Math.min(1, maxSide / Math.max(sw, sh));
  out.width = Math.max(1, Math.round(sw * scale));
  out.height = Math.max(1, Math.round(sh * scale));
  out.getContext("2d").drawImage(canvas, sx, sy, sw, sh, 0, 0, out.width, out.height);

  return new Promise((resolve, reject) => {
    out.toBlob((b) => (b ? resolve(b) : reject(new Error("Crop failed"))), "image/jpeg", 0.9);
  });
}

export default function PhotoCropModal({ file, label = "Photo", aspect = 1, onCancel, onConfirm }) {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [busy, setBusy] = useState(false);
  const areaRef = useRef(null);

  // Object URL owned by this effect: created here, revoked on change/unmount.
  // StrictMode's double mount gets a fresh URL on the second run, so the
  // cropper never ends up pointing at a revoked blob.
  const [objectUrl, setObjectUrl] = useState(null);
  useEffect(() => {
    const u = URL.createObjectURL(file);
    setObjectUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  useEffect(() => {
    let alive = true;
    decodeImage(file).then((img) => alive && setImage(img)).catch(() => alive && onCancel());
    return () => {
      alive = false;
    };
  }, [file, onCancel]);

  const onCropComplete = useCallback((_, px) => {
    areaRef.current = px;
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  async function confirm() {
    if (!image || !areaRef.current) return;
    setBusy(true);
    try {
      const blob = await cropToBlob(image, areaRef.current, { rotation });
      await onConfirm(blob); // parent closes the modal on success
    } catch {
      setBusy(false); // keep the modal open so the user can retry
    }
  }

  return (
    <div className="crop-modal" role="dialog" aria-modal="true" aria-label={`Align ${label}`}>
      <div className="crop-modal__card">
        <div className="crop-modal__head">
          <strong>Align {label}</strong>
          <span>Drag to position · pinch or slider to zoom</span>
        </div>

        <div className="crop-modal__stage">
          {image && (
            <Cropper
              image={objectUrl}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              objectFit="contain"
            />
          )}
        </div>

        <div className="crop-modal__controls">
          <label className="crop-modal__slider">
            <span>Zoom</span>
            <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
          </label>
          <label className="crop-modal__slider">
            <span>Rotate</span>
            <input type="range" min={-180} max={180} step={1} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} />
          </label>
        </div>

        <div className="crop-modal__actions">
          <button className="admin-btn" onClick={onCancel} disabled={busy}>Cancel</button>
          <button className="admin-btn admin-btn--primary" onClick={confirm} disabled={busy || !image}>
            {busy ? "Processing…" : "Use this photo"}
          </button>
        </div>
      </div>
    </div>
  );
}
