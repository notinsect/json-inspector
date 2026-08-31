"use client";

import { RequestResponseViewer } from "@/components/ui/request-response-viewer";
import { CodeBlock } from "@/components/docs/code-block";

const sampleRequest = {
  method: "POST",
  url: "https://api.example.com/users?page=1",
  query: {
    page: "1",
  },
  headers: {
    "content-type": "application/json",
    authorization: "Bearer example-secret-token",
    "x-request-id": "req_01HXYZ123",
  },
  body: {
    name: "Example User",
    email: "user@example.com",
    role: "developer",
  },
};

const sampleResponse = {
  status: 201,
  statusText: "Created",
  duration: 124,
  headers: {
    "content-type": "application/json",
    "x-request-id": "req_01HXYZ123",
  },
  body: {
    id: 42,
    name: "Example User",
    email: "user@example.com",
    role: "developer",
    created: true,
  },
};

const usageCode = `import { RequestResponseViewer } from "@/components/ui/request-response-viewer"

const request = {
  method: "POST",
  url: "https://api.example.com/users",
  headers: {
    "content-type": "application/json",
    authorization: "Bearer secret-token",
  },
  body: {
    name: "John Doe",
  },
}

const response = {
  status: 201,
  statusText: "Created",
  duration: 120,
  body: {
    id: 1,
    name: "John Doe",
  },
}

export default function Example() {
  return (
    <RequestResponseViewer
      request={request}
      response={response}
    />
  )
}`;

export default function RequestResponseViewerPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <div className="mb-2 text-sm text-muted-foreground">
          Components /{" "}
          <span className="font-medium text-foreground">
            Request / Response Viewer
          </span>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Request / Response Viewer
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
          A compact HTTP request and response viewer for developer-facing interfaces.
        </p>
      </div>

      {/* Installation */}
      <section className="scroll-mt-8" id="installation">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Installation</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Install directly using the shadcn CLI.
          </p>
        </div>

        <CodeBlock copyValue="bunx shadcn@latest add notinsect/json-inspector/request-response-viewer">
          bunx shadcn@latest add notinsect/json-inspector/request-response-viewer
        </CodeBlock>
      </section>

      {/* Preview */}
      <section className="scroll-mt-8" id="preview">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Preview</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Inspect HTTP method, status codes, query parameters, headers, and structured bodies.
          </p>
        </div>

        <div className="rounded-xl border bg-muted/20 p-4 md:p-8">
          <div className="mx-auto max-w-3xl">
            <RequestResponseViewer
              request={sampleRequest}
              response={sampleResponse}
            />
          </div>
        </div>
      </section>

      {/* Edge Cases Section */}
      <section className="scroll-mt-8" id="edge-cases">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Edge cases</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Response-only views, plain text bodies, zero/boolean payloads, and sensitive redaction.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Edge case 1: Response only */}
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <span className="text-xs font-semibold text-muted-foreground">
              1. Response only
            </span>

            <RequestResponseViewer
              response={{
                status: 404,
                statusText: "Not Found",
                duration: 32,
                body: {
                  error: "User not found",
                },
              }}
            />
          </div>

          {/* Edge case 2: Plain text response */}
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <span className="text-xs font-semibold text-muted-foreground">
              2. Plain text response
            </span>

            <RequestResponseViewer
              response={{
                status: 200,
                headers: {
                  "content-type": "text/plain",
                },
                body: "Hello from the server",
              }}
            />
          </div>

          {/* Edge case 3: Empty body value (false / 0) */}
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <span className="text-xs font-semibold text-muted-foreground">
              3. Primitive boolean body
            </span>

            <RequestResponseViewer
              request={{
                method: "POST",
                url: "https://api.example.com/toggle",
                body: false,
              }}
            />
          </div>

          {/* Edge case 4: Sensitive header redaction */}
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <span className="text-xs font-semibold text-muted-foreground">
              4. Sensitive header redaction
            </span>

            <RequestResponseViewer
              request={{
                method: "GET",
                url: "https://api.example.com/profile",
                headers: {
                  Authorization: "Bearer example-secret",
                },
              }}
            />
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="scroll-mt-8" id="usage">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Usage</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Import the component and pass HTTP request and response objects.
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
            ["Request & Response tabs", "Seamlessly toggle between request and response details."],
            ["HTTP method badges", "Method-specific color coding for GET, POST, PUT, DELETE, and custom methods."],
            ["Status code indicators", "Color-coded response status codes for 2xx, 3xx, 4xx, and 5xx responses."],
            ["Sensitive value redaction", "Automatic redaction for Authorization, Cookie, and API Key headers."],
            ["Query parameters & headers", "Formatted key/value tables for headers and query string parameters."],
            ["Structured body inspection", "Integrates JsonInspector for interactive nested JSON bodies."],
            ["Copy actions", "One-click copy for URL, formatted headers, and body payloads."],
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

        <div className="flex flex-col gap-6">
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
                    <code>request</code>
                  </td>

                  <td className="px-4 py-3 font-mono">
                    <code>HttpMessage</code>
                  </td>

                  <td className="px-4 py-3 text-muted-foreground">—</td>

                  <td className="px-4 py-3 text-muted-foreground">
                    Optional HTTP request details to display.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 font-mono">
                    <code>response</code>
                  </td>

                  <td className="px-4 py-3 font-mono">
                    <code>HttpMessage</code>
                  </td>

                  <td className="px-4 py-3 text-muted-foreground">—</td>

                  <td className="px-4 py-3 text-muted-foreground">
                    Optional HTTP response details to display.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 font-mono">
                    <code>defaultTab</code>
                  </td>

                  <td className="px-4 py-3 font-mono">
                    <code>&quot;request&quot; | &quot;response&quot;</code>
                  </td>

                  <td className="px-4 py-3 font-mono">
                    <code>&quot;request&quot;</code>
                  </td>

                  <td className="px-4 py-3 text-muted-foreground">
                    Initial active tab. Defaults to request if present, else response.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-3 text-sm font-semibold">HttpMessage Object Fields</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/40">
                  <tr>
                    <th className="px-3 py-2 font-medium">Field</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 font-mono"><code>method</code></td>
                    <td className="px-3 py-2 font-mono"><code>string</code></td>
                    <td className="px-3 py-2 text-muted-foreground">HTTP method (GET, POST, etc.)</td>
                  </tr>

                  <tr>
                    <td className="px-3 py-2 font-mono"><code>url</code></td>
                    <td className="px-3 py-2 font-mono"><code>string</code></td>
                    <td className="px-3 py-2 text-muted-foreground">Target URL endpoint</td>
                  </tr>

                  <tr>
                    <td className="px-3 py-2 font-mono"><code>status</code></td>
                    <td className="px-3 py-2 font-mono"><code>number</code></td>
                    <td className="px-3 py-2 text-muted-foreground">HTTP status code (200, 201, 404, etc.)</td>
                  </tr>

                  <tr>
                    <td className="px-3 py-2 font-mono"><code>statusText</code></td>
                    <td className="px-3 py-2 font-mono"><code>string</code></td>
                    <td className="px-3 py-2 text-muted-foreground">HTTP status text (OK, Created, etc.)</td>
                  </tr>

                  <tr>
                    <td className="px-3 py-2 font-mono"><code>headers</code></td>
                    <td className="px-3 py-2 font-mono"><code>Record&lt;string, string&gt;</code></td>
                    <td className="px-3 py-2 text-muted-foreground">Header key/value pairs</td>
                  </tr>

                  <tr>
                    <td className="px-3 py-2 font-mono"><code>query</code></td>
                    <td className="px-3 py-2 font-mono"><code>Record&lt;string, ...&gt;</code></td>
                    <td className="px-3 py-2 text-muted-foreground">Query string parameter pairs</td>
                  </tr>

                  <tr>
                    <td className="px-3 py-2 font-mono"><code>body</code></td>
                    <td className="px-3 py-2 font-mono"><code>unknown</code></td>
                    <td className="px-3 py-2 text-muted-foreground">Payload body (object, array, JSON string, or text)</td>
                  </tr>

                  <tr>
                    <td className="px-3 py-2 font-mono"><code>duration</code></td>
                    <td className="px-3 py-2 font-mono"><code>number</code></td>
                    <td className="px-3 py-2 text-muted-foreground">Response round-trip duration in milliseconds</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
