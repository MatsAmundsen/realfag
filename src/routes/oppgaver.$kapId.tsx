import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/oppgaver/$kapId")({
  component: () => <Outlet />,
});
