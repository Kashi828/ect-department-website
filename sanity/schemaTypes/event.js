export default {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r) => r.required() },
    { name: "subtitle", title: "Subtitle (optional)", type: "string" },
    { name: "date", title: "Date", type: "date", validation: (r) => r.required(),
      description: "Upcoming vs. past on the site is worked out automatically from this date." },
    { name: "time", title: "Time (optional)", type: "string", description: "e.g. 10:00 AM" },
    { name: "venue", title: "Venue (optional)", type: "string" },
    { name: "resourcePerson", title: "Resource person (optional)", type: "string" },
    { name: "organizers", title: "Organised with (optional)", type: "string" },
    { name: "poster", title: "Poster image", type: "image", options: { hotspot: true } },
  ],
  preview: { select: { title: "title", subtitle: "date", media: "poster" } },
};
