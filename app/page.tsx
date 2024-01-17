import Link from "next/link";
import postgres from "postgres";
import QuizForm from "./quiz-form";

const sql = postgres(process.env.POSTGRES_URL!);

type Quiz = {
  quiz_id: number;
  title: string;
};

async function Quizzes() {
  const quizzes: Quiz[] = await sql`
    SELECT * FROM quizzes
  `;

  return (
    <ul>
      {quizzes.map((quiz) => (
        <li key={quiz.quiz_id} className="flex flex-col underline">
          <Link href={`/quiz/${quiz.quiz_id}`}>{quiz.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <section className="rounded-2xl border-2 border-gray-600 m-2">
      <h1 className="text-2xl font-bold p-4 mb-4">All Quizzes</h1>
      <Quizzes />
      <QuizForm />
    </section>
  );
}
