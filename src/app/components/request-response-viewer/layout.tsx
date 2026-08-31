import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request / Response Viewer",
  description:
    "Inspect HTTP requests and responses with headers, query parameters, structured bodies, status information, and sensitive-value redaction.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
