import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!);

async function Quiz({
  id,
  searchParams,
}: {
  id: string;
  searchParams: { show?: string };
}) {
  let answers = await sql`
 SELECT
    q.quiz_id,
    q.title AS quiz_title,
    q.description AS quiz_description,
    q.question_text AS quiz_question,
    a.answer_id,
    a.answer_text,
    a.is_correct
  FROM quizzes AS q
  JOIN answers AS a ON q.quiz_id = a.quiz_id
  WHERE q.quiz_id = ${id};
  `;

  return (
    <div className="flex flex-col text-center items-center mt-12">
      <h1 className="text-4xl text-gray-100 font-bold mb-2">
        {answers[0].quiz_title}
      </h1>
      <p className="text-2xl text-gray-100 mb-8">
        {answers[0].quiz_description}
      </p>
      <p className="text-xl font-semibold mb-8">{answers[0].question_text}</p>
      <ul>
        {answers.map((answer) => (
          <li key={answer.answer_id}>
            <p className="text-yellow-300 p-3">
              {answer.answer_text}
              {searchParams.show === "true" && answer.is_correct && " ✅"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function QuizPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { show?: string };
}) {
  return (
    <section className="flex flex-col items-center">
      <Quiz id={params.id} searchParams={searchParams} />
      <form
        action={async () => {
          "use server";
          redirect(`/quiz/${params.id}?show=true`);
        }}
      >
        <Button>
          Show Answer
        </Button>
      </form>
    </section>
  );
}
