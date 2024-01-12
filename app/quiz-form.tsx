import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const sql = postgres(process.env.POSTGRES_URL!);

function Answer({ id }: { id: number }) {
  return (
    <Label>
      Answer {id}:
      <Input type="text" name={`answer-${id}`} />
      {/* <Input type="checkbox" name={`checkbox-${id}`} /> */}
      <Checkbox name={`checkbox-${id}`} />
    </Label>
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
        INSERT INTO quizzes (title, description, question_text, created_at)
        VALUES (${title}, ${description}, ${question}, NOW())
        RETURNING quiz_id
      )
      INSERT INTO answers (quiz_id, answer_text, is_correct)
      VAlUES (
        (SELECT quiz_id FROM new_quiz),
        ${answers[0].answer},
        ${answers[0].isCorrect}
      ),
      (
        (SELECT quiz_id FROM new_quiz),
        ${answers[1].answer},
        ${answers[1].isCorrect}
      ),
      (
        (SELECT quiz_id FROM new_quiz),
        ${answers[2].answer},
        ${answers[2].isCorrect}
      )
      )
    `;

    revalidatePath("/");
  }

  return (
    <form className="flex flex-col p-2 mt-2 max-w-xs" action={createQuiz}>
      <h3 className="text-lg font-bold text-center">Create Quiz</h3>
      <Label>
        Title:
        <Input type="text" name="title" />
      </Label>
      <Label>
        Description:
        <Input type="text" name="description" />
      </Label>
      <Label>
        Question:
        <Input type="text" name="question" />
      </Label>
      <div className="my-4" />
      <Answer id={1} />
      <Answer id={2} />
      <Answer id={3} />
      <Button type="submit">Create Quiz</Button>
    </form>
  );
}
