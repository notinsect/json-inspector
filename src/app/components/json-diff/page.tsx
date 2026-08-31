"use client";

import { JsonDiff } from "@/components/ui/json-diff";
import { CodeBlock } from "@/components/docs/code-block";

const before = {
  id: 42,
  name: "Example Project",
  status: "draft",
  version: 1,
  settings: {
    theme: "dark",
    notifications: true,
  },
  tags: ["react", "nextjs"],
};

const after = {
  id: 42,
  name: "Example Project",
  status: "published",
  version: 2,
  settings: {
    theme: "dark",
    notifications: false,
  },
  tags: ["react", "nextjs", "typescript"],
  published: true,
};

const installCommand =
  "bunx shadcn@latest add notinsect/varnus/json-diff";

const usageCode = `import { JsonDiff } from "@/components/ui/json-diff"

const before = {
  status: "draft",
  version: 1,
}

const after = {
  status: "published",
  version: 2,
}

export default function Example() {
  return (
    <JsonDiff
      before={before}
      after={after}
    />
  )
}`;

export default function JsonDiffPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <div className="mb-2 text-sm text-muted-foreground">
          Components /{" "}
          <span className="font-medium text-foreground">JSON Diff</span>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            JSON Diff
          </h1>

          <span className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-xs text-muted-foreground">
            Available
          </span>

          <span className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-xs text-muted-foreground">
            registry:ui
          </span>

          <span className="rounded-md border px-2 py-0.5 font-mono text-xs text-muted-foreground">
            v0.3.0
          </span>
        </div>

        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          Compare JSON and JavaScript values with an expandable, developer-friendly diff.
        </p>
      </div>

      {/* Preview */}
      <section className="scroll-mt-8" id="preview">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Preview</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Explore added, removed, and modified values in nested objects and arrays.
          </p>
        </div>

        <div className="rounded-xl border bg-muted/20 p-4 md:p-8">
          <div className="mx-auto max-w-3xl">
            <JsonDiff
              before={before}
              after={after}
              defaultExpandedDepth={3}
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
            Import the component and pass the before and after values to compare.
          </p>
        </div>

        <CodeBlock copyValue={usageCode}>{usageCode}</CodeBlock>
      </section>

      {/* Edge Cases Section */}
      <section className="scroll-mt-8" id="edge-cases">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Edge cases</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Handling missing properties, type mismatches, empty objects, and root primitives.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Edge case 1: Added undefined property */}
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <span className="text-xs font-semibold text-muted-foreground">
              1. Added undefined property
            </span>

            <JsonDiff
              before={{}}
              after={{ optional: undefined }}
              defaultExpandedDepth={2}
            />
          </div>

          {/* Edge case 2: Type change */}
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <span className="text-xs font-semibold text-muted-foreground">
              2. Type change
            </span>

            <JsonDiff
              before={{ retries: 3 }}
              after={{ retries: "3" }}
              defaultExpandedDepth={2}
            />
          </div>

          {/* Edge case 3: Empty values */}
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <span className="text-xs font-semibold text-muted-foreground">
              3. Empty values
            </span>

            <JsonDiff
              before={{ config: {} }}
              after={{ config: { enabled: true } }}
              defaultExpandedDepth={2}
            />
          </div>

          {/* Edge case 4: Root primitive */}
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <span className="text-xs font-semibold text-muted-foreground">
              4. Root primitive
            </span>

            <JsonDiff
              before="draft"
              after="published"
              defaultExpandedDepth={2}
            />
          </div>
        </div>
      </section>

      {/* Current Features */}
      <section className="scroll-mt-8" id="features">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Features
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
          {[
            ["Added value detection", "Highlights newly added object keys or array items."],
            ["Removed value detection", "Highlights removed keys or items with negative diff styling."],
            ["Modified value detection", "Shows changed primitive values on two separate lines."],
            ["Nested object diffing", "Recursively diffs objects and highlights modified children."],
            ["Array comparison by index", "Compares arrays element-by-element by index."],
            ["Expand/collapse", "Toggle visibility of nested data structures."],
            ["Configurable expansion depth", "Control initial tree depth via defaultExpandedDepth prop."],
            ["Optional unchanged values", "Filter or show unchanged fields using showUnchanged prop."],
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
                  <code>before</code>
                </td>

                <td className="px-4 py-3 font-mono">
                  <code>unknown</code>
                </td>

                <td className="px-4 py-3 text-muted-foreground">—</td>

                <td className="px-4 py-3 text-muted-foreground">
                  The original value to compare.
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 font-mono">
                  <code>after</code>
                </td>

                <td className="px-4 py-3 font-mono">
                  <code>unknown</code>
                </td>

                <td className="px-4 py-3 text-muted-foreground">—</td>

                <td className="px-4 py-3 text-muted-foreground">
                  The target value to compare against.
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
                  Initial expansion depth for nested containers.
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 font-mono">
                  <code>showUnchanged</code>
                </td>

                <td className="px-4 py-3 font-mono">
                  <code>boolean</code>
                </td>

                <td className="px-4 py-3 font-mono">
                  <code>true</code>
                </td>

                <td className="px-4 py-3 text-muted-foreground">
                  Show or hide unchanged fields in the diff view.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Limitations */}
      <section className="scroll-mt-8" id="limitations">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Limitations
          </h2>
        </div>

        <ul className="list-disc pl-5 text-sm leading-7 text-muted-foreground">
          <li>Arrays are currently compared element-by-element by index.</li>
          <li>Advanced array item move detection is not performed.</li>
          <li>Special container types such as Map and Set are not recursively diffed yet.</li>
        </ul>
      </section>
    </div>
  );
}
