import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!);

function Answer({ id }: { id: number }) {
  return (
    <div className="flex w-auto items-center space-x-2">
      <Checkbox name={`check-${id}`} />
      <Label>
        <Input
          type="text"
          placeholder={`Answer ${id}:`}
          name={`answer-${id}`}
          className="border-gray-700"
        />
      </Label>
    </div>
  );
}

export default function QuizForm() {
  async function createQuiz(formData: FormData) {
    "use server";
    let title = formData.get("title") as string;
    let description = formData.get("description") as string;
    let question = formData.get("question") as string;
    let answers = [1, 2, 3].map((id) => {
      return {
        answer: formData.get(`answer-${id}`) as string,
        isCorrect: formData.get(`check-${id}`) === "on",
      };
    });

    await sql`
    WITH new_quiz AS (
      INSERT INTO quizzes (title, description, question_text, 
        created_at)
        VALUES (${title}, ${description}, ${question}, NOW())
        RETURNING quiz_id
        )
        INSERT INTO answers (quiz_id, answer_text, is_correct)
        VALUES
        ( (SELECT quiz_id FROM new_quiz), ${answers[0].answer}, 
        ${answers[0].isCorrect}),
        ( (SELECT quiz_id FROM new_quiz), ${answers[1].answer}, 
        ${answers[1].isCorrect}),
        ( (SELECT quiz_id FROM new_quiz), ${answers[2].answer}, 
        ${answers[2].isCorrect})
        `;
    revalidatePath("/");
  }

  return (
    
    <form
      className="flex flex-col gap-4 m-5 p-6 rounded-2xl border-2 border-gray-400"
      action={createQuiz}
    >
      <h3 className="text-lg font-bold text-center">Create Quiz</h3>
      <Label>
        <Input
          type="title"
          placeholder="Title"
          name="title"
          className="border-gray-700"
        />
      </Label>
      <Label>
        <Input
          type="description"
          placeholder="Description"
          name="description"
          className="border-gray-700"
        />
      </Label>
      <Label>
        <Input
          type="text"
          placeholder="Question"
          name="question"
          className="border-gray-700"
        />
      </Label>
      <h1 className="text-md font-bold p-4 text-gray-600">
        Select a Answer for your Quiz
      </h1>
      <div className="flex gap-6 py-4 mt-6">
        <Answer id={1} />
        <Answer id={2} />
        <Answer id={3} />
      </div>
      <div className="flex flex-col items-center mx-auto max-w-3xl">
        <Button type="submit">Create Quiz</Button>
      </div>
    </form>
  );
}
