import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/1p/eksamen")({ component: () => <Outlet /> });
