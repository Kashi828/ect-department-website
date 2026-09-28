export default {
  name: "person",
  title: "Topper / Faculty",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (r) => r.required() },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["topper", "faculty"] },
      validation: (r) => r.required(),
    },
    { name: "role", title: "Role (faculty)", type: "string", description: "e.g. Principal, Assistant Professor" },
    { name: "yearLabel", title: "Year (topper)", type: "string", description: "e.g. 2nd Year UG" },
    { name: "sgpa", title: "SGPA (topper)", type: "string" },
    { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
    { name: "order", title: "Display order", type: "number" },
  ],
};
