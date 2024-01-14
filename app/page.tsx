import Link from "next/link";
import postgres from "postgres";
import QuizForm from "./quiz-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Quiz" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Quizzes</SelectLabel>
            {/* <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem> */}
      {quizzes.map((quiz) => (
        <li key={quiz.quiz_id}>
          <Link href={`/quiz/${quiz.quiz_id}`}>{quiz.title}</Link>
        </li>
      ))}
      </SelectGroup>
    </SelectContent>
  </Select>
    </div>
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
