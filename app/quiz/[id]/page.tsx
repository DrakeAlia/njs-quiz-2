import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="flex flex-col text-center items-center mt-4 ">
      <h1 className="text-4xl font-bold text-blue-500 mb-2 underline">
        {answers[0].quiz_title}
      </h1>
      <p className="text-2xl mb-4 hover:text-blue-500">
        {answers[0].quiz_description}
      </p>
      <p className="text-xl font-semibold mb-8 hover:text-blue-500">
        {answers[0].quiz_question}
      </p>
      <ul>
        {answers.map((answer) => (
          <li key={answer.answer_id}>
            <p className="p-3">
              {answer.answer_text}
              {searchParams.show === "true" && answer.is_correct && " ✅"}
              {searchParams.show === "true" && !answer.is_correct && " ❌"}
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
    <Card className="flex flex-col items-center gap-4 m-5 p-6 justify-between">
      <CardHeader>
        <CardTitle>
          <Quiz id={params.id} searchParams={searchParams} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardFooter className="flex flex-col items-center justify-betwee gap-4 m-5 p-6">
          <form
            action={async () => {
              "use server";
              redirect(`/quiz/${params.id}?show=true`);
            }}
          >
            <div className="items-center mx-auto max-w-3xl">
              <Button>Show Answer</Button>
            </div>
          </form>
          <form
            action={async () => {
              "use server";
              redirect(`/quiz/${params.id}`);
            }}
          >
            <div className="items-center mx-auto max-w-3xl">
              <Button variant="destructive">Hide Answer</Button>
            </div>
          </form>
          <form
            action={async () => {
              "use server";
              redirect("/");
            }}
          >
            <div className="items-center mx-auto max-w-3xl">
              <Button variant="outline">Back to All Quizzes</Button>
            </div>
          </form>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

