export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "phone", title: "Phone", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "facebook", title: "Facebook URL", type: "url" },
    { name: "instagram", title: "Instagram URL", type: "url" },
    { name: "youtube", title: "YouTube URL", type: "url" },
    { name: "accreditation", title: "Topbar accreditation line", type: "string" },
    { name: "announcement", title: "Announcements ribbon text", type: "text" },
    { name: "heroLine1", title: "Hero heading, line 1", type: "string" },
    { name: "heroLine2", title: "Hero heading, line 2 (gold italic)", type: "string" },
    { name: "heroSubtitle", title: "Hero subtitle", type: "text" },
    {
      name: "heroFacts",
      title: "Hero facts sidebar (max 3-4 look best)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Small label", type: "string" },
            { name: "heading", title: "Heading", type: "string" },
            { name: "detail", title: "Detail (optional)", type: "text" },
          ],
        },
      ],
    },
  ],
};
