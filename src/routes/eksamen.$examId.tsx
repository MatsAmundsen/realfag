import { createFileRoute, Link } from "@tanstack/react-router";
import { findExam } from "@/data/exams";
import { ExamRunner } from "@/components/ExamRunner";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/eksamen/$examId")({
  head: ({ params }) => {
    const e = findExam(params.examId);
    return seoHead(
      `/eksamen/${params.examId}`,
      e ? `${e.title} – eksamen 1T med løsning` : "Eksamen 1T",
      e
        ? `Øv på 1T-eksamen ${e.title.toLowerCase()} i matematikk 1T: oppgaver i del 1 og del 2 med hint og løsningsforslag.`
        : "Tidligere eksamensoppgaver i matematikk 1T med hint og løsningsforslag.",
    );
  },
  component: ExamPage,
});

function ExamPage() {
  const { examId } = Route.useParams();
  const exam = findExam(examId);
  if (!exam) {
    return (
      <section className="view-section">
        <p>Fant ikke eksamenen.</p>
        <Link to="/eksamen">Tilbake til arkivet</Link>
      </section>
    );
  }
  return (
    <section className="view-section full-page exam-page">
      <div className="page-intro">
        <p className="crumb">
          <Link to="/eksamen">Eksamensarkiv</Link> · {exam.date}
        </p>
        <h1>{exam.title} · MAT1021</h1>
        <p>
          Del 1 uten hjelpemidler ({exam.del1Minutes} min i originalen) · Del 2 med hjelpemidler. Totalt 5 timer.
          {exam.officialNote ? ` ${exam.officialNote}` : ""}
        </p>
      </div>
      <ExamRunner exam={exam} />
    </section>
  );
}
