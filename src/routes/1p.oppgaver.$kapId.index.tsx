import { createFileRoute, redirect } from "@tanstack/react-router";
import { findKap1P } from "@/data/1p";

export const Route = createFileRoute("/1p/oppgaver/$kapId/")({
  beforeLoad: ({ params }) => {
    const first = findKap1P(params.kapId)?.delkapitler[0];
    if (first) {
      throw redirect({
        to: "/1p/oppgaver/$kapId/$subId",
        params: { kapId: params.kapId, subId: first.id },
      });
    }
    throw redirect({ to: "/1p/oppgaver" });
  },
  component: () => null,
});
