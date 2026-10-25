import { createFileRoute, Link } from "@tanstack/react-router";
import { findExam1P } from "@/data/1p/exams";
import { ExamRunner } from "@/components/ExamRunner";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/1p/eksamen/$examId")({
  head: ({ params }) => {
    const e = findExam1P(params.examId);
    return seoHead(
      `/1p/eksamen/${params.examId}`,
      e ? `${e.title} – eksamen 1P med løsning` : "Eksamen 1P",
      e
        ? `Øv på 1P-eksamen ${e.title.toLowerCase()} i matematikk 1P: oppgaver i del 1 og del 2 med hint og løsningsforslag.`
        : "Egne øvingsoppgaver til eksamen i matematikk 1P med hint og løsningsforslag.",
    );
  },
  component: ExamPage,
});

function ExamPage() {
  const { examId } = Route.useParams();
  const exam = findExam1P(examId);
  if (!exam) {
    return (
      <section className="view-section">
        <p>Fant ikke eksamenen.</p>
        <Link to="/1p/eksamen">Tilbake til eksamenstrening</Link>
      </section>
    );
  }
  return (
    <section className="view-section full-page exam-page">
      <div className="page-intro">
        <p className="crumb">
          <Link to="/1p/eksamen">Eksamensøving 1P</Link> · {exam.date}
        </p>
        <h1>{exam.title}</h1>
        <p>
          Del 1 <strong>Uten hjelpemidler</strong> ({exam.del1Minutes} min) · Del 2 med hjelpemidler. Totalt 5 timer.
          {exam.officialNote ? ` ${exam.officialNote}` : ""}
        </p>
      </div>
      <ExamRunner exam={exam} />
    </section>
  );
}
