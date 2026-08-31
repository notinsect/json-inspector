import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 py-4">
      {/* Hero */}
      <section className="flex flex-col items-start gap-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Components for developer-facing interfaces
        </h1>

        <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          A collection of reusable shadcn/ui components for debugging,
          inspecting, and visualizing developer data.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/components/json-inspector"
            className="inline-flex h-9 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Browse Components
          </Link>

          <a
            href="https://github.com/notinsect/json-inspector"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            GitHub
            <ExternalLink className="size-3.5 text-muted-foreground" />
          </a>
        </div>
      </section>

      {/* Components Section */}
      <section className="flex flex-col gap-6">
        <div className="border-b pb-3">
          <h2 className="text-xl font-semibold tracking-tight">Components</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Card 1: JSON Inspector */}
          <Link
            href="/components/json-inspector"
            className="group flex flex-col justify-between rounded-lg border p-5 transition-colors hover:border-foreground/40 hover:bg-muted/30"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold tracking-tight text-foreground group-hover:underline">
                  JSON Inspector
                </h3>

                <span className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  Available
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Inspect nested JSON and JavaScript values with search, expandable
                nodes, copy actions, and circular reference detection.
              </p>
            </div>
          </Link>

          {/* Card 2: JSON Diff */}
          <Link
            href="/components/json-diff"
            className="group flex flex-col justify-between rounded-lg border p-5 transition-colors hover:border-foreground/40 hover:bg-muted/30"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold tracking-tight text-foreground group-hover:underline">
                  JSON Diff
                </h3>

                <span className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  Available
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Compare two JSON or JavaScript values and visualize added, removed,
                and modified data.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
