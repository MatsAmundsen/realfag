import { createFileRoute, Link } from "@tanstack/react-router";
import { ExamRunner } from "@/components/ExamRunner";
import { findEksamen1P, kildelinje } from "@/data/1p/eksamener";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/1p/eksamener/$examId")({
  head: ({ params }) => {
    const e = findEksamen1P(params.examId);
    return seoHead(
      `/1p/eksamener/${params.examId}`,
      e ? `${e.title} 1P (MAT1019) med løsningsforslag` : "Eksamen 1P",
      e
        ? `${e.title} i matematikk 1P (MAT1019): oppgavene fra Utdanningsdirektoratet med trinnvise løsningsforslag. Del 1 uten hjelpemidler og Del 2 med hjelpemidler.`
        : "Tidligere eksamener i matematikk 1P med løsningsforslag.",
    );
  },
  component: ExamPage,
});

function ExamPage() {
  const { examId } = Route.useParams();
  const exam = findEksamen1P(examId);
  if (!exam) {
    return (
      <section className="view-section">
        <p>Fant ikke eksamenen.</p>
        <Link to="/1p/eksamener">Tilbake til tidligere eksamener</Link>
      </section>
    );
  }
  const t = (m: number) => (m % 60 === 0 ? `${m / 60} t` : `${Math.floor(m / 60)} t ${m % 60} min`);
  return (
    <section className="view-section full-page exam-page">
      <div className="page-intro">
        <p className="crumb">
          <Link to="/1p/eksamener">Tidligere eksamener 1P</Link> · {exam.date}
        </p>
        <h1>{exam.title}</h1>
        <p>
          Del 1 <strong>Uten hjelpemidler</strong> ({t(exam.del1Minutes)}) · Del 2 med hjelpemidler. Hele eksamen varer {t(exam.totalMinutes)}.
        </p>
        <p className="exam-source">
          {kildelinje(exam)}{" "}
          {exam.source && (
            <a href={exam.source.oppgaveUrl} target="_blank" rel="noopener noreferrer">
              Oppgavehefte (PDF)
            </a>
          )}
          . Løsningsforslagene er skrevet av Matteguiden og er ikke offisielle.
        </p>
      </div>
      <ExamRunner exam={exam} />
    </section>
  );
}
