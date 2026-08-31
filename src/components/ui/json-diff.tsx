"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type JsonDiffProps = {
  before: unknown;
  after: unknown;
  defaultExpandedDepth?: number;
  showUnchanged?: boolean;
};

type DiffStatus = "unchanged" | "added" | "removed" | "changed";

type BaseDiffNode = {
  key?: string | number;
  status: DiffStatus;
};

type PrimitiveDiffNode = BaseDiffNode & {
  kind: "primitive";
  before?: unknown;
  after?: unknown;
  hasBefore: boolean;
  hasAfter: boolean;
};

type CompositeDiffNode = BaseDiffNode & {
  kind: "object" | "array";
  children: DiffNode[];
  hasChanges: boolean;
  beforeCount: number;
  afterCount: number;
};

type TypeChangeDiffNode = BaseDiffNode & {
  kind: "type-change";
  beforeNode: DiffNode;
  afterNode: DiffNode;
  hasChanges: true;
};

type DiffNode = PrimitiveDiffNode | CompositeDiffNode | TypeChangeDiffNode;

function isPlainObject(val: unknown): val is Record<string, unknown> {
  if (typeof val !== "object" || val === null) return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto === Object.prototype;
}

function isSpecialLeaf(val: unknown): boolean {
  return (
    val instanceof Date ||
    val instanceof RegExp ||
    val instanceof Map ||
    val instanceof Set ||
    val instanceof Error
  );
}

function getValueKind(val: unknown): "object" | "array" | "primitive" {
  if (val === null || val === undefined) return "primitive";
  if (Array.isArray(val)) return "array";
  if (isPlainObject(val) && !isSpecialLeaf(val)) return "object";
  return "primitive";
}

function buildDiff(
  before: unknown,
  after: unknown,
  key?: string | number,
  forcedStatus?: "added" | "removed",
): DiffNode {
  if (forcedStatus === "added") {
    const kind = getValueKind(after);
    if (kind === "primitive") {
      return {
        kind: "primitive",
        key,
        status: "added",
        hasBefore: false,
        hasAfter: true,
        after,
      };
    } else if (kind === "array") {
      const arr = after as unknown[];
      const children = arr.map((item, index) =>
        buildDiff(undefined, item, index, "added"),
      );
      return {
        kind: "array",
        key,
        status: "added",
        hasChanges: true,
        children,
        beforeCount: 0,
        afterCount: arr.length,
      };
    } else {
      const obj = after as Record<string, unknown>;
      const keys = Object.keys(obj);
      const children = keys.map((k) =>
        buildDiff(undefined, obj[k], k, "added"),
      );
      return {
        kind: "object",
        key,
        status: "added",
        hasChanges: true,
        children,
        beforeCount: 0,
        afterCount: keys.length,
      };
    }
  }

  if (forcedStatus === "removed") {
    const kind = getValueKind(before);
    if (kind === "primitive") {
      return {
        kind: "primitive",
        key,
        status: "removed",
        hasBefore: true,
        hasAfter: false,
        before,
      };
    } else if (kind === "array") {
      const arr = before as unknown[];
      const children = arr.map((item, index) =>
        buildDiff(item, undefined, index, "removed"),
      );
      return {
        kind: "array",
        key,
        status: "removed",
        hasChanges: true,
        children,
        beforeCount: arr.length,
        afterCount: 0,
      };
    } else {
      const obj = before as Record<string, unknown>;
      const keys = Object.keys(obj);
      const children = keys.map((k) =>
        buildDiff(obj[k], undefined, k, "removed"),
      );
      return {
        kind: "object",
        key,
        status: "removed",
        hasChanges: true,
        children,
        beforeCount: keys.length,
        afterCount: 0,
      };
    }
  }

  const kindBefore = getValueKind(before);
  const kindAfter = getValueKind(after);

  if (kindBefore === "primitive" && kindAfter === "primitive") {
    const isSame = Object.is(before, after);
    return {
      kind: "primitive",
      key,
      status: isSame ? "unchanged" : "changed",
      hasBefore: true,
      hasAfter: true,
      before,
      after,
    };
  }

  if (kindBefore !== kindAfter) {
    const beforeNode = buildDiff(before, undefined, key, "removed");
    const afterNode = buildDiff(undefined, after, key, "added");
    return {
      kind: "type-change",
      key,
      status: "changed",
      hasChanges: true,
      beforeNode,
      afterNode,
    };
  }

  if (kindBefore === "object" && kindAfter === "object") {
    const objBefore = before as Record<string, unknown>;
    const objAfter = after as Record<string, unknown>;

    const keysBefore = Object.keys(objBefore);
    const keysAfter = Object.keys(objAfter);
    const allKeys = Array.from(new Set([...keysBefore, ...keysAfter]));

    const children = allKeys.map((k) => {
      const hasB = Object.prototype.hasOwnProperty.call(objBefore, k);
      const hasA = Object.prototype.hasOwnProperty.call(objAfter, k);

      if (!hasB && hasA) {
        return buildDiff(undefined, objAfter[k], k, "added");
      }
      if (hasB && !hasA) {
        return buildDiff(objBefore[k], undefined, k, "removed");
      }
      return buildDiff(objBefore[k], objAfter[k], k);
    });

    const hasChanges = children.some(
      (c) => c.status !== "unchanged" || (c.kind !== "primitive" && c.hasChanges),
    );

    return {
      kind: "object",
      key,
      status: hasChanges ? "changed" : "unchanged",
      hasChanges,
      children,
      beforeCount: keysBefore.length,
      afterCount: keysAfter.length,
    };
  }

  if (kindBefore === "array" && kindAfter === "array") {
    const arrBefore = before as unknown[];
    const arrAfter = after as unknown[];
    const maxLen = Math.max(arrBefore.length, arrAfter.length);

    const children: DiffNode[] = [];
    for (let i = 0; i < maxLen; i++) {
      const hasB = i < arrBefore.length && i in arrBefore;
      const hasA = i < arrAfter.length && i in arrAfter;

      if (!hasB && hasA) {
        children.push(buildDiff(undefined, arrAfter[i], i, "added"));
      } else if (hasB && !hasA) {
        children.push(buildDiff(arrBefore[i], undefined, i, "removed"));
      } else if (hasB && hasA) {
        children.push(buildDiff(arrBefore[i], arrAfter[i], i));
      }
    }

    const hasChanges = children.some(
      (c) => c.status !== "unchanged" || (c.kind !== "primitive" && c.hasChanges),
    );

    return {
      kind: "array",
      key,
      status: hasChanges ? "changed" : "unchanged",
      hasChanges,
      children,
      beforeCount: arrBefore.length,
      afterCount: arrAfter.length,
    };
  }

  return {
    kind: "primitive",
    key,
    status: "unchanged",
    hasBefore: true,
    hasAfter: true,
    before,
    after,
  };
}

function JsonValueLeaf({ value }: { value: unknown }) {
  if (value === null) {
    return <span className="italic text-muted-foreground">null</span>;
  }
  if (value === undefined) {
    return <span className="italic text-muted-foreground">undefined</span>;
  }
  if (typeof value === "string") {
    return (
      <span className="text-emerald-700 dark:text-emerald-400">
        {JSON.stringify(value)}
      </span>
    );
  }
  if (typeof value === "number") {
    return (
      <span className="text-blue-700 dark:text-blue-400">
        {Object.is(value, -0) ? "-0" : String(value)}
      </span>
    );
  }
  if (typeof value === "boolean") {
    return (
      <span className="text-violet-700 dark:text-violet-400">
        {String(value)}
      </span>
    );
  }
  if (typeof value === "bigint") {
    return (
      <span className="text-blue-700 dark:text-blue-400">{`${value}n`}</span>
    );
  }
  if (value instanceof Date) {
    const dateText = Number.isNaN(value.getTime())
      ? "Invalid Date"
      : value.toISOString();
    return (
      <span className="text-amber-700 dark:text-amber-400">
        Date(&quot;{dateText}&quot;)
      </span>
    );
  }
  if (value instanceof RegExp) {
    return (
      <span className="text-pink-700 dark:text-pink-400">
        {value.toString()}
      </span>
    );
  }
  return <span>{String(value)}</span>;
}

type DiffNodeViewProps = {
  node: DiffNode;
  depth: number;
  defaultExpandedDepth: number;
  showUnchanged: boolean;
};

function SingleRow({
  keyName,
  value,
  status,
  depth,
}: {
  keyName?: string | number;
  value: unknown;
  status: DiffStatus;
  depth: number;
}) {
  let prefixChar = " ";
  let prefixColor = "text-muted-foreground";
  let bgClass =
    "bg-transparent text-foreground border-l-2 border-transparent";

  if (status === "added") {
    prefixChar = "+";
    prefixColor = "text-emerald-600 dark:text-emerald-400 font-bold";
    bgClass =
      "bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 border-l-2 border-emerald-500";
  } else if (status === "removed") {
    prefixChar = "-";
    prefixColor = "text-red-600 dark:text-red-400 font-bold";
    bgClass =
      "bg-red-500/10 dark:bg-red-950/30 text-red-950 dark:text-red-100 border-l-2 border-red-500";
  } else if (status === "changed") {
    prefixChar = "~";
    prefixColor = "text-amber-600 dark:text-amber-400 font-bold";
    bgClass =
      "bg-amber-500/10 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100 border-l-2 border-amber-500";
  }

  return (
    <div
      className={cn(
        "flex min-h-6 items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-sm leading-6 select-text transition-colors",
        bgClass,
      )}
      style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
    >
      <span
        className={cn(
          "w-4 shrink-0 font-mono font-bold text-center select-none",
          prefixColor,
        )}
      >
        {prefixChar}
      </span>

      <span className="whitespace-pre-wrap break-all">
        {keyName !== undefined && (
          <span className="font-medium text-foreground">{keyName}: </span>
        )}

        <JsonValueLeaf value={value} />
      </span>
    </div>
  );
}

function CompositeRow({
  node,
  depth,
  defaultExpandedDepth,
  showUnchanged,
}: {
  node: CompositeDiffNode;
  depth: number;
  defaultExpandedDepth: number;
  showUnchanged: boolean;
}) {
  const count =
    node.status === "added"
      ? node.afterCount
      : node.status === "removed"
        ? node.beforeCount
        : node.children.length;
  const isExpandable = node.children.length > 0;
  const [isExpanded, setIsExpanded] = useState(
    () => depth < defaultExpandedDepth,
  );

  let prefixChar = " ";
  let prefixColor = "text-muted-foreground";
  let bgClass =
    "bg-transparent text-foreground hover:bg-muted/30 border-l-2 border-transparent";

  if (node.status === "added") {
    prefixChar = "+";
    prefixColor = "text-emerald-600 dark:text-emerald-400 font-bold";
    bgClass =
      "bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 border-l-2 border-emerald-500";
  } else if (node.status === "removed") {
    prefixChar = "-";
    prefixColor = "text-red-600 dark:text-red-400 font-bold";
    bgClass =
      "bg-red-500/10 dark:bg-red-950/30 text-red-950 dark:text-red-100 border-l-2 border-red-500";
  } else if (node.status === "changed") {
    prefixChar = "~";
    prefixColor = "text-amber-600 dark:text-amber-400 font-bold";
    bgClass =
      "bg-amber-500/10 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100 border-l-2 border-amber-500";
  }

  const typeLabel =
    node.kind === "object" ? `Object {${count}}` : `Array(${count})`;

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex min-h-6 items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-sm leading-6 select-text transition-colors",
          bgClass,
        )}
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
      >
        <span
          className={cn(
            "w-4 shrink-0 font-mono font-bold text-center select-none",
            prefixColor,
          )}
        >
          {prefixChar}
        </span>

        {isExpandable ? (
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 rounded-sm text-left hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {isExpanded ? (
              <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
            )}

            {node.key !== undefined && (
              <span className="font-medium text-foreground">{node.key}: </span>
            )}

            <span className="text-muted-foreground">{typeLabel}</span>

            {node.status === "changed" && (
              <span className="ml-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                modified
              </span>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <span className="w-3.5 shrink-0" />

            {node.key !== undefined && (
              <span className="font-medium text-foreground">{node.key}: </span>
            )}

            <span className="text-muted-foreground">{typeLabel}</span>

            {node.status === "changed" && (
              <span className="ml-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                modified
              </span>
            )}
          </div>
        )}
      </div>

      {isExpandable && isExpanded && (
        <div className="flex flex-col">
          {node.children.map((child, idx) => (
            <DiffNodeView
              key={child.key ?? idx}
              node={child}
              depth={depth + 1}
              defaultExpandedDepth={defaultExpandedDepth}
              showUnchanged={showUnchanged}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DiffNodeView({
  node,
  depth,
  defaultExpandedDepth,
  showUnchanged,
}: DiffNodeViewProps) {
  if (!showUnchanged) {
    if (node.kind === "primitive" && node.status === "unchanged") {
      return null;
    }
    if (
      (node.kind === "object" || node.kind === "array") &&
      node.status === "unchanged" &&
      !node.hasChanges
    ) {
      return null;
    }
  }

  if (node.kind === "type-change") {
    return (
      <>
        <DiffNodeView
          node={node.beforeNode}
          depth={depth}
          defaultExpandedDepth={defaultExpandedDepth}
          showUnchanged={showUnchanged}
        />

        <DiffNodeView
          node={node.afterNode}
          depth={depth}
          defaultExpandedDepth={defaultExpandedDepth}
          showUnchanged={showUnchanged}
        />
      </>
    );
  }

  if (node.kind === "primitive") {
    if (node.status === "changed") {
      return (
        <>
          <SingleRow
            keyName={node.key}
            value={node.before}
            status="removed"
            depth={depth}
          />

          <SingleRow
            keyName={node.key}
            value={node.after}
            status="added"
            depth={depth}
          />
        </>
      );
    }

    return (
      <SingleRow
        keyName={node.key}
        value={node.status === "removed" ? node.before : node.after}
        status={node.status}
        depth={depth}
      />
    );
  }

  return (
    <CompositeRow
      node={node}
      depth={depth}
      defaultExpandedDepth={defaultExpandedDepth}
      showUnchanged={showUnchanged}
    />
  );
}

export function JsonDiff({
  before,
  after,
  defaultExpandedDepth = 2,
  showUnchanged = true,
}: JsonDiffProps) {
  const diffTree = useMemo(() => buildDiff(before, after), [before, after]);

  return (
    <div className="overflow-hidden rounded-lg border bg-background font-mono text-sm">
      <div className="flex items-center justify-between border-b bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="font-bold">+</span> added
          </span>

          <span className="flex items-center gap-1 font-medium text-red-600 dark:text-red-400">
            <span className="font-bold">-</span> removed
          </span>

          <span className="flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
            <span className="font-bold">~</span> modified
          </span>
        </div>
      </div>

      <div className="overflow-x-auto p-3">
        <DiffNodeView
          node={diffTree}
          depth={0}
          defaultExpandedDepth={defaultExpandedDepth}
          showUnchanged={showUnchanged}
        />
      </div>
    </div>
  );
}
