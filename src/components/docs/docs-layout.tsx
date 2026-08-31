"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPONENTS } from "@/lib/components";
import { cn } from "@/lib/utils";

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Mobile Header Navigation */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:hidden">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          Varnus
        </Link>
        <nav className="flex items-center gap-3 overflow-x-auto text-xs font-medium scrollbar-none">
          {COMPONENTS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap transition-colors hover:text-foreground",
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden w-60 shrink-0 border-r md:block">
          <div className="sticky top-0 flex h-screen flex-col px-4 py-6">
            {/* Brand Header */}
            <div className="mb-6 px-2">
              <Link
                href="/"
                className="text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
              >
                Varnus
              </Link>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex flex-col gap-1">
              <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Components
              </div>

              {COMPONENTS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-md px-2 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-10 md:py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
