import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { JsonDiff } from "./json-diff";

describe("JsonDiff", () => {
  it("TEST 1 — unchanged primitive", () => {
    render(
      <JsonDiff
        before={{ name: "Example" }}
        after={{ name: "Example" }}
      />,
    );

    expect(screen.getByText(/name:/)).toBeInTheDocument();
    expect(screen.getByText(/"Example"/)).toBeInTheDocument();
  });

  it("TEST 2 — changed primitive", () => {
    render(
      <JsonDiff
        before={{ status: "draft" }}
        after={{ status: "published" }}
      />,
    );

    expect(screen.getByText(/"draft"/)).toBeInTheDocument();
    expect(screen.getByText(/"published"/)).toBeInTheDocument();
  });

  it("TEST 3 — added property", () => {
    render(
      <JsonDiff
        before={{}}
        after={{ published: true }}
      />,
    );

    expect(screen.getByText(/published:/)).toBeInTheDocument();
    expect(screen.getByText("true")).toBeInTheDocument();
  });

  it("TEST 4 — removed property", () => {
    render(
      <JsonDiff
        before={{ deprecated: true }}
        after={{}}
      />,
    );

    expect(screen.getByText(/deprecated:/)).toBeInTheDocument();
    expect(screen.getByText("true")).toBeInTheDocument();
  });

  it("TEST 5 — missing vs undefined (added)", () => {
    render(
      <JsonDiff
        before={{}}
        after={{ optional: undefined }}
      />,
    );

    expect(screen.getByText(/optional:/)).toBeInTheDocument();
    expect(screen.getByText("undefined")).toBeInTheDocument();
  });

  it("TEST 6 — undefined removed", () => {
    render(
      <JsonDiff
        before={{ optional: undefined }}
        after={{}}
      />,
    );

    expect(screen.getByText(/optional:/)).toBeInTheDocument();
    expect(screen.getByText("undefined")).toBeInTheDocument();
  });

  it("TEST 7 — nested object", () => {
    render(
      <JsonDiff
        before={{
          settings: {
            theme: "dark",
            enabled: false,
          },
        }}
        after={{
          settings: {
            theme: "dark",
            enabled: true,
          },
        }}
      />,
    );

    expect(screen.getAllByText(/enabled:/).length).toBeGreaterThan(0);
    expect(screen.getByText("false")).toBeInTheDocument();
    expect(screen.getByText("true")).toBeInTheDocument();
  });

  it("TEST 8 — arrays", () => {
    render(
      <JsonDiff
        before={["react", "nextjs"]}
        after={["react", "nextjs", "typescript"]}
      />,
    );

    expect(screen.getByText(/"typescript"/)).toBeInTheDocument();
  });

  it("TEST 9 — type change", () => {
    render(
      <JsonDiff
        before={{ retries: 3 }}
        after={{ retries: "3" }}
      />,
    );

    expect(screen.getAllByText(/retries:/).length).toBe(2);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText(/"3"/)).toBeInTheDocument();
  });

  it("TEST 10 — null", () => {
    render(
      <JsonDiff
        before={{ value: null }}
        after={{ value: "active" }}
      />,
    );

    expect(screen.getByText("null")).toBeInTheDocument();
    expect(screen.getByText(/"active"/)).toBeInTheDocument();
  });

  it("TEST 11 — NaN", () => {
    render(
      <JsonDiff
        before={{ value: NaN }}
        after={{ value: NaN }}
      />,
    );

    expect(screen.getByText("NaN")).toBeInTheDocument();
  });

  it("TEST 12 — root primitive", () => {
    render(
      <JsonDiff
        before="draft"
        after="published"
      />,
    );

    expect(screen.getByText(/"draft"/)).toBeInTheDocument();
    expect(screen.getByText(/"published"/)).toBeInTheDocument();
  });

  it("TEST 13 — showUnchanged false", () => {
    render(
      <JsonDiff
        before={{ name: "Example", status: "draft" }}
        after={{ name: "Example", status: "published" }}
        showUnchanged={false}
      />,
    );

    expect(screen.getByText(/"draft"/)).toBeInTheDocument();
    expect(screen.getByText(/"published"/)).toBeInTheDocument();
    expect(screen.queryByText(/"Example"/)).not.toBeInTheDocument();
  });

  it("TEST 14 — empty containers", () => {
    render(
      <JsonDiff
        before={{ obj: {}, arr: [] }}
        after={{ obj: {}, arr: [] }}
      />,
    );

    expect(screen.getByText(/Object \{0\}/)).toBeInTheDocument();
    expect(screen.getByText(/Array\(0\)/)).toBeInTheDocument();
  });

  it("TEST 15 — expansion", () => {
    render(
      <JsonDiff
        before={{ settings: { enabled: false } }}
        after={{ settings: { enabled: true } }}
        defaultExpandedDepth={1}
      />,
    );

    const toggleButton = screen.getByRole("button", { name: /settings:/ });
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("false")).not.toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("false")).toBeInTheDocument();
    expect(screen.getByText("true")).toBeInTheDocument();
  });
});
