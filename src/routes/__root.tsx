import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { HauntedShell } from "../components/horror/HauntedShell";

function NotFoundComponent() {
  return (
    <HauntedShell>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h1 className="font-major text-7xl text-blood-bright">SIGNAL LOST</h1>
          <p className="mt-4 font-mono text-sm text-static/60">
            THE FILE YOU REQUESTED HAS BEEN ██████████ OR DOES NOT EXIST.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block border border-crt/40 px-4 py-2 font-mono text-xs text-crt hover:bg-crt/10"
          >
            {"<<"} RETURN TO ARCHIVE
          </Link>
        </div>
      </div>
    </HauntedShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <HauntedShell>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-major text-3xl text-blood-bright">FATAL ERROR</h1>
          <p className="mt-2 font-mono text-xs text-static/60">{error.message}</p>
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="mt-6 border border-crt/40 px-4 py-2 font-mono text-xs text-crt hover:bg-crt/10"
          >
            RETRY TRANSMISSION
          </button>
        </div>
      </div>
    </HauntedShell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ARCHIVE-7 // RESTRICTED ACCESS" },
      { name: "description", content: "Recovered footage and incident reports from facility ██████. Unauthorized viewing is logged." },
      { property: "og:title", content: "ARCHIVE-7" },
      { property: "og:description", content: "DO NOT WATCH ALONE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <HauntedShell>
        <Outlet />
      </HauntedShell>
    </QueryClientProvider>
  );
}
