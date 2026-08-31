import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Inspector",
  description:
    "Inspect nested JSON and JavaScript values with search, expandable nodes, copy actions, and circular reference detection.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
