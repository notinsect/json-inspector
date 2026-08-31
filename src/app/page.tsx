"use client";

import { JsonInspector } from "@/components/ui/json-inspector";

export default function Home() {
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

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          JSON Inspector
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Interactive JSON and JavaScript object inspector.
        </p>
      </div>

      <JsonInspector data={data} searchable defaultExpandedDepth={2} />
    </main>
  );
}
