export default {
  name: "achievement",
  title: "Achievement",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r) => r.required() },
    { name: "detail", title: "Detail", type: "text" },
    { name: "poster", title: "Poster / photo (optional)", type: "image", options: { hotspot: true } },
    { name: "order", title: "Display order", type: "number" },
  ],
};
