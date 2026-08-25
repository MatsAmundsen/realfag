import { createFileRoute, redirect } from "@tanstack/react-router";
import { findKap } from "@/data/content";

export const Route = createFileRoute("/oppgaver/$kapId/")({
  beforeLoad: ({ params }) => {
    const kap = findKap(params.kapId);
    const first = kap?.delkapitler[0];
    if (first) {
      throw redirect({
        to: "/oppgaver/$kapId/$subId",
        params: { kapId: params.kapId, subId: first.id },
      });
    }
    throw redirect({ to: "/oppgaver" });
  },
  component: () => null,
});
