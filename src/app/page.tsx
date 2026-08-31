const data = {
  id: 1042,
  title: "Example Project",
  active: true,
  score: 98.5,

  metadata: null,
  optional: undefined,

  createdAt: new Date("2026-01-15T09:30:00.000Z"),
  pattern: /example/gi,

  largeNumber: BigInt("9007199254740991"),

  greet() {
    return "Hello, world!";
  },

  emptyObject: {},
  emptyArray: [],

  account: {
    username: "demo-user",
    email: "demo@example.com",
    verified: false,
    preferences: {
      language: "en",
      timezone: "UTC",
    },
  },

  projects: [
    {
      id: 1,
      name: "Dashboard",
      status: "active",
    },
    {
      id: 2,
      name: "Mobile App",
      status: "draft",
    },
  ],

  map: new Map([
    ["theme", "dark"],
    ["language", "en"],
    ["region", "global"],
  ]),

  set: new Set(["React", "Next.js", "TypeScript"]),

  error: new Error("Example error message"),
};
