import Link from "next/link";

function Quizzes() {
  return (
    <section>
      <ul className="underline">
        <li>
          <Link href="/quiz/1">Quiz 1</Link>
        </li>
        <li>
          <Link href="/quiz/2">Quiz 2</Link>
        </li>
        <li>
          <Link href="/quiz/3">Quiz 3</Link>
        </li>
      </ul>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold">All Quizzes</h1>
      <Quizzes />
    </div>
  );
}
