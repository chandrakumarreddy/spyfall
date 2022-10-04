import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import globalStyles from "~/styles/global.css";

export const meta = () => ({
  charset: "utf-8",
  title: "spyfall",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    {
      rel: "preload",
      href: "https://www.spyfall.app/assets/spy_black-917b12c1334faadf3cb4aab01573054ccc9e3d284d893c2b3f1bc1f257693682.png",
      as: "image",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
    {
      rel: "stylesheet",
      href: globalStyles,
    },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.6.1/sockjs.min.js" />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
