"use client";

import { JsonInspector } from "@/components/ui/json-inspector";
import { CodeBlock } from "@/components/docs/code-block";

const demoData = {
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

const installCommand =
  "bunx shadcn@latest add notinsect/json-inspector/json-inspector";

const usageCode = `import { JsonInspector } from "@/components/ui/json-inspector"

const data = {
  name: "Example",
  active: true,
  user: {
    email: "demo@example.com",
    roles: ["admin", "developer"],
  },
}

export default function Example() {
  return (
    <JsonInspector
      data={data}
      searchable
      defaultExpandedDepth={2}
    />
  )
}`;

export default function JsonInspectorPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <div className="mb-2 text-sm text-muted-foreground">
          Components /{" "}
          <span className="font-medium text-foreground">JSON Inspector</span>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            JSON Inspector
          </h1>

          <span className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-xs text-muted-foreground">
            registry:ui
          </span>

          <span className="rounded-md border px-2 py-0.5 font-mono text-xs text-muted-foreground">
            v0.2.0
          </span>
        </div>

        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          An interactive JSON and JavaScript object inspector for shadcn/ui.
        </p>
      </div>

      {/* Preview */}
      <section className="scroll-mt-8" id="preview">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Preview</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Search, expand, collapse, and inspect the example data.
          </p>
        </div>

        <div className="rounded-xl border bg-muted/20 p-4 md:p-8">
          <div className="mx-auto max-w-3xl">
            <JsonInspector
              data={demoData}
              searchable
              defaultExpandedDepth={2}
            />
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="scroll-mt-8" id="installation">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Installation
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add the component directly using the shadcn CLI.
          </p>
        </div>

        <CodeBlock copyValue={installCommand}>{installCommand}</CodeBlock>
      </section>

      {/* Usage */}
      <section className="scroll-mt-8" id="usage">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Usage</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Import the component and pass any inspectable value through the data
            prop.
          </p>
        </div>

        <CodeBlock copyValue={usageCode}>{usageCode}</CodeBlock>
      </section>

      {/* Features */}
      <section className="scroll-mt-8" id="features">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Features</h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
          {[
            ["Search", "Search through keys and values."],
            ["Expandable", "Explore deeply nested objects and arrays."],
            ["Copy", "Copy primitive values and object paths."],
            ["Circular safe", "Detect circular references automatically."],
            ["JavaScript types", "Inspect Map, Set, Date, RegExp and more."],
            ["Dark mode", "Uses shadcn/ui theme tokens."],
          ].map(([title, description]) => (
            <div key={title} className="bg-background p-5">
              <h3 className="text-sm font-medium">{title}</h3>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported types */}
      <section className="scroll-mt-8" id="supported-types">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Supported types
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            JSON Inspector supports JSON values and common JavaScript types.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            "Object",
            "Array",
            "String",
            "Number",
            "Boolean",
            "null",
            "undefined",
            "Date",
            "RegExp",
            "BigInt",
            "Function",
            "Map",
            "Set",
            "Error",
            "Circular references",
          ].map((type) => (
            <code
              key={type}
              className="rounded-md border bg-muted/40 px-2.5 py-1.5 font-mono text-xs"
            >
              {type}
            </code>
          ))}
        </div>
      </section>

      {/* API Reference */}
      <section className="scroll-mt-8" id="api-reference">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">
            API Reference
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium">Prop</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Default</th>
                <th className="px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-3 font-mono">
                  <code>data</code>
                </td>

                <td className="px-4 py-3 font-mono">
                  <code>unknown</code>
                </td>

                <td className="px-4 py-3 text-muted-foreground">—</td>

                <td className="px-4 py-3 text-muted-foreground">
                  The value to inspect.
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 font-mono">
                  <code>searchable</code>
                </td>

                <td className="px-4 py-3 font-mono">
                  <code>boolean</code>
                </td>

                <td className="px-4 py-3 font-mono">
                  <code>true</code>
                </td>

                <td className="px-4 py-3 text-muted-foreground">
                  Show or hide search.
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 font-mono">
                  <code>defaultExpandedDepth</code>
                </td>

                <td className="px-4 py-3 font-mono">
                  <code>number</code>
                </td>

                <td className="px-4 py-3 font-mono">
                  <code>2</code>
                </td>

                <td className="px-4 py-3 text-muted-foreground">
                  Initial expansion depth.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
