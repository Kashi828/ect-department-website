export default {
  name: "alumnus",
  title: "Alumnus",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (r) => r.required() },
    { name: "batch", title: "Batch year", type: "string" },
    { name: "position", title: "Current position", type: "string" },
  ],
};
