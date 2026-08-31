import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { RequestResponseViewer } from "./request-response-viewer";

describe("RequestResponseViewer", () => {
  it("renders request only", () => {
    render(
      <RequestResponseViewer
        request={{
          method: "get",
          url: "/api/users",
        }}
      />,
    );

    expect(screen.getByText("GET")).toBeInTheDocument();
    expect(screen.getByText("/api/users")).toBeInTheDocument();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("renders response only", () => {
    render(
      <RequestResponseViewer
        response={{
          status: 404,
          statusText: "Not Found",
        }}
      />,
    );

    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("renders empty state when neither request nor response is provided", () => {
    render(<RequestResponseViewer />);

    expect(screen.getByText("No request or response data.")).toBeInTheDocument();
  });

  it("handles defaultTab fallback safely when target tab is missing", () => {
    render(
      <RequestResponseViewer
        defaultTab="request"
        response={{
          status: 200,
          statusText: "OK",
        }}
      />,
    );

    expect(screen.getByText("200 OK")).toBeInTheDocument();
  });

  it("renders lowercase method as uppercase", () => {
    render(
      <RequestResponseViewer
        request={{
          method: "post",
          url: "https://api.example.com/login",
        }}
      />,
    );

    expect(screen.getByText("POST")).toBeInTheDocument();
  });

  it("renders status without statusText when statusText is absent", () => {
    render(
      <RequestResponseViewer
        response={{
          status: 404,
        }}
      />,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("formats duration 0 as 0 ms and duration 1500 as 1.5 s", () => {
    const { rerender } = render(
      <RequestResponseViewer
        response={{
          status: 200,
          duration: 0,
        }}
      />,
    );

    expect(screen.getByText("0 ms")).toBeInTheDocument();

    rerender(
      <RequestResponseViewer
        response={{
          status: 200,
          duration: 1500,
        }}
      />,
    );

    expect(screen.getByText("1.5 s")).toBeInTheDocument();
  });

  it("renders valid bodies such as false, 0, and empty string", () => {
    const { rerender } = render(
      <RequestResponseViewer
        request={{
          method: "POST",
          url: "/api/toggle",
          body: false,
        }}
      />,
    );

    expect(screen.getByText("false")).toBeInTheDocument();

    rerender(
      <RequestResponseViewer
        request={{
          method: "POST",
          url: "/api/count",
          body: 0,
        }}
      />,
    );

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("parses JSON object string into structured viewer and plain text as raw text", () => {
    const { rerender } = render(
      <RequestResponseViewer
        request={{
          method: "POST",
          url: "/api/json",
          body: '{"ok":true}',
        }}
      />,
    );

    expect(screen.getByText(/ok:/)).toBeInTheDocument();

    rerender(
      <RequestResponseViewer
        request={{
          method: "POST",
          url: "/api/text",
          body: "   hello world   ",
        }}
      />,
    );

    expect(
      screen.getByText((content) => content.includes("hello world")),
    ).toBeInTheDocument();
  });

  it("hides empty headers section but renders headers with empty string values", () => {
    const { rerender } = render(
      <RequestResponseViewer
        request={{
          method: "GET",
          url: "/api/test",
          headers: {},
        }}
      />,
    );

    expect(screen.queryByText("Headers")).not.toBeInTheDocument();

    rerender(
      <RequestResponseViewer
        request={{
          method: "GET",
          url: "/api/test",
          headers: {
            "x-empty": "",
          },
        }}
      />,
    );

    expect(screen.getByText("Headers")).toBeInTheDocument();
    expect(screen.getByText("x-empty")).toBeInTheDocument();
  });

  it("redacts authorization and custom sensitive headers case-insensitively", () => {
    render(
      <RequestResponseViewer
        request={{
          method: "GET",
          url: "/api/secret",
          headers: {
            Authorization: "Bearer secret-token",
            "X-Api-Key": "my-secret-key",
          },
        }}
      />,
    );

    expect(screen.getByText("Bearer ••••••••")).toBeInTheDocument();
    expect(screen.getByText("••••••••")).toBeInTheDocument();
    expect(screen.queryByText("Bearer secret-token")).not.toBeInTheDocument();
    expect(screen.queryByText("my-secret-key")).not.toBeInTheDocument();
  });

  it("copies redacted headers by default when copy headers action is clicked", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(
      <RequestResponseViewer
        request={{
          method: "GET",
          url: "/api/secret",
          headers: {
            Authorization: "Bearer secret-token",
          },
        }}
      />,
    );

    const copyBtn = screen.getByRole("button", { name: "Copy headers" });
    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith(
      JSON.stringify({ Authorization: "Bearer ••••••••" }, null, 2),
    );
  });

  it("handles copy failure gracefully without throwing or crashing", async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error("Permission denied"));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(
      <RequestResponseViewer
        request={{
          method: "GET",
          url: "/api/secret",
        }}
      />,
    );

    const copyBtn = screen.getByRole("button", { name: "Copy URL" });
    expect(() => fireEvent.click(copyBtn)).not.toThrow();
  });
});
