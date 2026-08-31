import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff",
  description:
    "Compare two JSON or JavaScript values and visualize added, removed, and modified data.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
