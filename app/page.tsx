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
    <ul className="m-2 px-40">
      {quizzes.map((quiz) => (
        <li
          key={quiz.quiz_id}
          className="underline font-semibold text-xl mb-4 hover:text-blue-500"
        >
          <Link href={`/quiz/${quiz.quiz_id}`}>{quiz.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <section className="flex flex-col items-center text-center m-2 py-16 rounded-2xl border-2 border-gray-600">
      <h1 className="text-4xl font-bold p-4">Welcome to Quiz App!</h1>
      <h1 className="text-2xl font-bold p-4 mb-4 text-gray-600">All Created Quizzes:</h1>
      <Quizzes />
      <QuizForm />
    </section>
  );
}
