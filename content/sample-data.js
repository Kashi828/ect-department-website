// Fallback content shown until a Sanity project is connected (see README).
// Once NEXT_PUBLIC_SANITY_PROJECT_ID is set, pages fetch this same shape from Sanity instead.
// Poster images referenced here live in /public/posters — once real events are added
// through the Studio, editors can upload posters there instead and this file stops being used.

export const siteSettings = {
  phone: "+91 (0) 4868 273203",
  email: "ect@nssraj.ac.in",
  facebook: "#",
  instagram: "#",
  youtube: "https://www.youtube.com/@nss_electronics_rky",
  accreditation: "NSS College Rajakumari · Affiliated to Mahatma Gandhi University",
  announcement:
    "Photons Day welcomes new members to the Electronics Club | Workshop on Cloud Computing with Dept. of Computer Application | Seminar: The Secret of the Universe",
  heroLine1: "Shaping Minds,",
  heroLine2: "Building the Future",
  heroSubtitle:
    "Empowering students through quality education in Electronics and Computer Technology.",
  heroFacts: [
    {
      label: "Established By",
      heading: "Department of Electronics with Computer Technology",
      detail: "Part of NSS College Rajakumari.",
    },
    {
      label: "Programme Offered",
      heading: "B.Sc (Honours) Electronics with Computer Technology",
      detail: "Four-year MGU-UGP (FYUGP) Honours programme in electronics and computing.",
    },
    {
      label: "Affiliated To",
      heading: "Mahatma Gandhi University, Kottayam",
    },
  ],
  heroQuote: {
    slide2Title: "From transistor to full-stack.",
    slide2Subtitle:
      "A hybrid discipline where circuits, computation, intelligence and interfaces belong in the same room.",
    highlight1: "Embedded systems",
    highlight2: "AI / Machine Learning",
    highlight3: "IoT / Robotics",
    highlight4: "Software engineering",
    signalCommand: "who-we-are",
    signalTitleLine1: "electronics",
    signalTitleLine2: "meets computation",
    signalMeta: "MG UNIVERSITY · NSS COLLEGE RAJAKUMARI · KERALA",
  },
  hodQuote: {
    titleLine1: "Building a lab culture,",
    titleLine2: "one circuit at a time.",
    paragraph1:
      "Our department runs on a simple idea: a concept is only understood once a student has held it. Every course in the programme ends in something measurable — a working circuit, a running program, a connected device. Between semesters, workshops, seminars and the Photons Electronics Club keep that momentum alive.",
    paragraph2:
      "What we ask of every student is consistency. Show up, wire it up, break it, and understand why it broke. That habit outlasts any syllabus.",
  },
};

// Real events, most recent first. "status" (upcoming/past) is no longer stored here —
// it's computed automatically from `date` against today's date, so this list never
// needs manual upkeep as time passes. See lib/dates.js.
export const events = [
  {
    _id: "e15",
    title: "Workshop on Cloud Computing",
    date: "2026-09-23",
    time: "10:00 AM",
    venue: "Seminar Hall, Dept. of ECT",
    resourcePerson: "Dr. Suji Gopinath — Assistant Professor, Dept. of Computer Application",
    organizers: "Department of Electronics & IQAC",
    poster: "/posters/cloud-computing-workshop.jpg",
  },
  {
    _id: "e14",
    title: "Photons Day — Photons Electronics Club",
    subtitle: "Welcome to the Family",
    date: "2026-09-10",
    venue: "Seminar Hall",
    poster: "/posters/photons-day.jpg",
  },
  {
    _id: "e13",
    title: "Seminar: The Secret of the Universe",
    date: "2026-09-09",
    time: "1:30 PM",
    venue: "Seminar Hall",
    resourcePerson: "Dr. Premlal P D — Principal Scientist, Sangama Grama Madhavan Academy of Sciences, Kerala",
    organizers: "Department of Electronics & IQAC",
    poster: "/posters/secret-of-universe-seminar.jpg",
  },
  {
    _id: "e8",
    title: "Seminar: Industrial Automation with PLC",
    date: "2026-03-28",
    time: "10:00 AM",
    resourcePerson: "Amal Saroj — Assistant Professor, BPC College Piravom",
    poster: "/posters/industrial-automation-plc.jpg",
  },
  {
    _id: "e12",
    title: "Hasta La Vista — Farewell Party & Award Ceremony 2K26",
    date: "2026-03-02",
    poster: "/posters/hasta-la-vista-farewell.jpg",
  },
  {
    _id: "e9",
    title: "Workshop on Programmable Logic Controller (PLC)",
    subtitle: "Learn · Automate · Innovate",
    date: "2026-02-21",
    time: "1:30 PM",
    venue: "Computer Lab",
    resourcePerson: "Amarnath R Palloor — Operations Manager, Al Tasawur Fire & Safety LLC, Dubai, UAE",
    poster: "/posters/plc-workshop-colorful.jpg",
  },
  {
    _id: "e11",
    title: "Electro-Spark 2026 — From Theory to Innovation",
    subtitle: "Exhibition of Electronic & Technology Projects",
    date: "2026-02-19",
    venue: "NSS College Rajakumari",
    poster: "/posters/electro-spark-2026.jpg",
  },
  {
    _id: "e6",
    title: "Fundamentals of Chip Design: The RTL-to-GDS Journey",
    date: "2025-12-04",
    time: "11:00 AM",
    venue: "Seminar Hall",
    resourcePerson: "Thejus P Aditya — Dept. of Electrical Engineering, IIT Hyderabad",
    poster: "/posters/chip-design-rtl-gds.jpg",
  },
  {
    _id: "e5",
    title: "Webinar on PLC (Programmable Logic Controller)",
    date: "2025-11-28",
    time: "10:00 AM",
    venue: "Seminar Hall",
    resourcePerson: "Amarnath R Palloor — Operations Manager, Al Tasawur Fire and Safety LLC, Dubai, UAE (BSc Electronics Alumnus, 2001–2004 batch)",
    poster: "/posters/plc-webinar-amarnath.jpg",
  },
  {
    _id: "e10",
    title: "Workshop on Smartphone Troubleshooting",
    date: "2025-09-15",
    time: "1:45 – 3:45 PM",
    venue: "Computer Lab",
    resourcePerson: "Handled by T9 Mobiles Sales and Service, Rajakumari",
    poster: "/posters/smartphone-troubleshooting.jpg",
  },
  {
    _id: "e7",
    title: "Decoding Intelligence: A Journey into AI and Machine Learning",
    date: "2025-08-11",
    time: "10:00 AM",
    venue: "Seminar Hall",
    resourcePerson: "Mr. Harikrishna — Senior Software Engineer (AI), Zerone Consulting Pvt Ltd, Kakkanad, Kochi",
    poster: "/posters/decoding-intelligence-ai-ml.jpg",
  },
  {
    _id: "e3",
    title: "Circuit Masters: From Schematic to PCB",
    subtitle: "Live workshop",
    date: "2025-06-24",
    time: "10:00 AM",
    venue: "Seminar Hall",
    resourcePerson: "Ananthasankar U A — Research Scholar, Dept. of Electronics, NSS College Rajakumari",
    organizers: "with the College Library",
    poster: "/posters/circuit-masters-pcb-workshop.jpg",
  },
  {
    _id: "e4",
    title: "Seminar on AI & Machine Learning",
    date: "2025-06-16",
    venue: "Seminar Hall",
    resourcePerson: "Abhijith M — Application Development Senior Analyst, Accenture, Karnataka",
    poster: "/posters/ai-ml-seminar-abhijith.jpg",
  },
  {
    _id: "e2",
    title: "Workshop on UI/UX Developing",
    date: "2025-05-17",
    time: "10:00 AM",
    venue: "NSS College Rajakumari",
    resourcePerson: "Akhil Surendran — Junior Software Engineer, Infopark Kochi",
    poster: "/posters/uiux-workshop.jpg",
  },
  {
    _id: "e1",
    title: "Orientation & Employability Workshop",
    subtitle: "Connect Career to Campus",
    date: "2025-03-19",
    time: "2:00 PM",
    venue: "Seminar Hall",
    resourcePerson: "Albert Sebastian — TCE, Idukki District, KKEM / K-DISC, Dept. of Planning & EAs, Govt. of Kerala",
    organizers: "with Kerala Knowledge Economy Mission",
    poster: "/posters/orientation-employability-workshop.jpg",
  },
];

export const achievements = [
  {
    _id: "a1",
    title: "3rd Rank, MSc Electronics — MG University",
    detail: "Unnikrishnan P S secured 3rd Rank in the MSc Electronics examination conducted by Mahatma Gandhi University.",
    poster: "/posters/congratulations-unnikrishnan.jpg",
  },
  { _id: "a2", title: "Runner-up, Techfest", detail: "Second place among 40+ participating teams at the intercollegiate technical festival." },
  { _id: "a3", title: "Best Project Award", detail: "Awarded for a final-year embedded systems project at the departmental showcase." },
  { _id: "a4", title: "First Prize, Poster Presentation", detail: "Top honours for a research poster presented at a state-level student symposium." },
  { _id: "a5", title: "Winner, Quiz Competition", detail: "First place in an inter-departmental technical quiz covering electronics and computing." },
];

export const toppers = [
  { _id: "t1", name: "Jayadev", yearLabel: "1st Year PG", sgpa: "9.45" },
  { _id: "t2", name: "Arun Roy", yearLabel: "1st Year UG", sgpa: "9.27" },
  { _id: "t3", name: "Karthik Sanil", yearLabel: "2nd Year UG", sgpa: "9.18", photo: "/people/karthik-sanil.jpg" },
];

export const faculty = [
  { _id: "f1", name: "Dr. Praveen N", role: "Principal", photo: "/people/praveen.jpg" },
  { _id: "f2", name: "Mr. Sunil Kumar K V", role: "Head of Department", photo: "/people/sunil-kumar.jpg" },
  { _id: "f3", name: "Dr. Saritha M", role: "Assistant Professor" },
  { _id: "f4", name: "Dr. Rekha T K", role: "Assistant Professor", photo: "/people/rekha.jpg" },
  { _id: "f5", name: "Dr. Reji A P", role: "Assistant Professor", photo: "/people/reji.jpg" },
  { _id: "f6", name: "Mr. Ananthasankar U A", role: "Assistant Professor", photo: "/people/ananthasankar.jpg" },
  { _id: "f7", name: "Mrs. Sonia Babu", role: "Assistant Professor", photo: "/people/soniya.jpg" },
  { _id: "f8", name: "Ms. Aneesha Shaji", role: "Assistant Professor", photo: "/people/aneesha-shaji.png" },
];

// Curriculum — B.Sc. (Honours) Electronics with Computer Technology, MGU-UGP (FYUGP),
// 2024 admission onwards. Listed by the university exam session in which each semester
// was pursued. Seed data only — live edits via /admin are stored in content/data.json.
export const syllabus = [
  {
    semester: 1,
    session: "November 2024",
    title: "Foundations",
    blurb: "First contact with electronics, robotics and computing — plus the mathematics that underpins it all.",
    courses: [
      { code: "MG1DSCECT100", name: "Emerging Electronics", type: "DSC · ECT" },
      { code: "MG1DSCIAM100", name: "Interactive Robotic Systems", type: "DSC · IAM" },
      { code: "MG1MDCECT101", name: "Foundation of AI Automation", type: "MDC" },
      { code: "MG1DSCECT101", name: "Computer Fundamentals and Basics of PC Hardware", type: "Electronics Minor" },
    ],
  },
  {
    semester: 2,
    session: "April 2025",
    title: "Logic & Automation",
    blurb: "Digital electronics as a language, automation as its hands, Python and mobile development as its voice.",
    courses: [
      { code: "MG2DSCECT100", name: "Essential Concepts in Digital Electronics", type: "DSC · ECT" },
      { code: "MG2DSCIAM100", name: "Intelligent Automation Techniques", type: "DSC · IAM" },
      { code: "MG2MDCECT101", name: "Python for Electronics", type: "MDC" },
      { code: "MG2DSCMOS100", name: "Foundations of Mobile Development Systems", type: "Minor (MOS)" },
    ],
  },
  {
    semester: 3,
    session: "October 2025",
    title: "Circuits & Code",
    blurb: "Analog design, C programming and the fundamentals of AI & machine learning.",
    courses: [
      { code: "MG3DSCECT200", name: "Analog Electronics", type: "DSC · ECT" },
      { code: "MG3DSCECT201", name: "Programming in C", type: "DSC · ECT" },
      { code: "MG3DSEECT203", name: "AI and Machine Learning Fundamentals", type: "DSE" },
      { code: "MG3DSCMOS201", name: "User Interface and User Experience for App Development", type: "Minor (MOS)" },
    ],
  },
  {
    semester: 4,
    session: "March 2026",
    title: "Connected Intelligence",
    blurb: "Python at scale, IoT system design, robotics and single-board computers for real deployments.",
    courses: [
      { code: "MG4DSCECT200", name: "Python Programming", type: "DSC · ECT" },
      { code: "MG4DSCECT202", name: "IoT System Design", type: "DSC · ECT" },
      { code: "MG4DSCIAM200", name: "Principles of Robotics and Automation", type: "DSC · IAM" },
      { code: "MG4DSEECT203", name: "Single Board Computers for IoT Applications", type: "DSE" },
    ],
  },
  {
    semester: 5,
    session: "Ongoing — 2026",
    title: "Specialisation",
    blurb: "Digital design in Verilog, embedded AVR systems and a spread of electives — cloud, cyber security, advanced Python and frontend development.",
    courses: [
      { code: "MG5DSCECT300", name: "Digital Design Using Verilog", type: "DSC · ECT" },
      { code: "MG5DSCECT302", name: "Embedded Systems with AVR Microcontroller", type: "DSC · ECT" },
      { code: "MG5DSEECT300", name: "Cloud Computing", type: "DSE" },
      { code: "MG5DSEECT307", name: "Cyber Security", type: "DSE" },
      { code: "MG5DSEECT308", name: "Advanced Python", type: "DSE" },
      { code: "MG5SECECT300", name: "Responsive Web Design and Frontend Development", type: "SEC" },
    ],
  },
];

export const alumni = [
  {
    _id: "al1",
    name: "Amarnath R Palloor",
    batch: "2001–2004",
    position: "Operations Manager, Al Tasawur Fire and Safety LLC, Dubai, UAE",
  },
  { _id: "al2", name: "Arun Kumar", batch: "2022", position: "Software Developer" },
  { _id: "al3", name: "Meera S.", batch: "2023", position: "Electronics Engineer" },
  { _id: "al4", name: "Rahul P.", batch: "2024", position: "System Engineer" },
];

export const galleryImages = [
  { src: "/gallery/group-traditional-attire.jpg", label: "Students and staff together in traditional attire", wide: true, aspect: "4 / 3" },
  { src: "/gallery/team-with-trophy.jpg", label: "The team celebrating with the trophy and medals", wide: true, aspect: "16 / 9" },
  { src: "/posters/electro-spark-2026.jpg", label: "Electro-Spark 2026" },
  { src: "/posters/hasta-la-vista-farewell.jpg", label: "Hasta La Vista — Farewell 2K26" },
  { src: "/posters/photons-day.jpg", label: "Photons Day" },
];
