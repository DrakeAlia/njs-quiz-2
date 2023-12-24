import Link from "next/link";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!);

const quizzes = [
    {
      id: 1,
      title: 'Quiz 1',
      description: 'This is a quiz about the first quiz',
    },
    {
      id: 2,
      title: 'Quiz 2',
      description: 'This is a quiz about the second quiz',
    },
    {
      id: 3,
      title: 'Quiz 3',
      description: 'This is a quiz about the third quiz',
    },
    {
      id: 4,
      title: 'Quiz 4',
      description: 'This is a quiz about the fourth quiz',
    },
    {
      id: 5,
      title: 'Quiz 5',
      description: 'This is a quiz about the fifth quiz',
    },
  ];


export default function Home() {
  return (
    <div className="flex flex-col items-center text-center py-4">
      <h1 className="font-semibold text-4xl">All Quizzes</h1>
      <div className="flex flex-col items-center">
        {quizzes.map((quiz) => {
          return (
            <div key={quiz.id} className="flex flex-col items-center">
              <Link href={`/quiz/${quiz.id}`}>
                <p className="text-xl underline">{quiz.title}</p>
              </Link>
              <p className="text-lg">{quiz.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
