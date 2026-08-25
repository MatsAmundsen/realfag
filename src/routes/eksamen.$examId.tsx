import { createFileRoute, Link } from "@tanstack/react-router";
import { findExam } from "@/data/exams";
import { ExamRunner } from "@/components/ExamRunner";

export const Route = createFileRoute("/eksamen/$examId")({ component: ExamPage });

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
