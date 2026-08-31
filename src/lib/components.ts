export type ComponentMeta = {
  title: string;
  slug: string;
  href: string;
  description: string;
  status: "available";
  registryName: string;
};

export const COMPONENTS: ComponentMeta[] = [
  {
    title: "JSON Inspector",
    slug: "json-inspector",
    href: "/components/json-inspector",
    description:
      "Inspect nested JSON and JavaScript values with search, expandable nodes, copy actions, and circular reference detection.",
    status: "available",
    registryName: "json-inspector",
  },
  {
    title: "JSON Diff",
    slug: "json-diff",
    href: "/components/json-diff",
    description:
      "Compare two JSON or JavaScript values and visualize added, removed, and modified data.",
    status: "available",
    registryName: "json-diff",
  },
  {
    title: "Request / Response Viewer",
    slug: "request-response-viewer",
    href: "/components/request-response-viewer",
    description:
      "Inspect HTTP requests and responses with headers, query parameters, structured bodies, status information, and sensitive-value redaction.",
    status: "available",
    registryName: "request-response-viewer",
  },
];
