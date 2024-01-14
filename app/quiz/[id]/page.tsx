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
    <div className="flex flex-col text-center items-center mt-4">
      <h1 className="text-4xl font-bold mb-2">{answers[0].quiz_title}</h1>
      <p className="text-2xl mb-4 hover:text-blue-500">{answers[0].quiz_description}</p>
      <p className="text-xl font-semibold mb-8 hover:text-blue-500">{answers[0].quiz_question}</p>
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
        <CardFooter className="flex justify-between">
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
              redirect("/");
            }}
          >
            <div className="items-center mx-auto max-w-3xl">
              <Button variant="outline">Go Back</Button>
            </div>
          </form>
        </CardFooter>
      </CardContent>
      {/* <section className="flex flex-col items-center gap-4 m-5 p-6 justify-between">
        <Quiz id={params.id} searchParams={searchParams} />
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
            redirect("/");
          }}
        >
          <div className="items-center mx-auto max-w-3xl">
            <Button>Go Back</Button>
          </div>
        </form>
      </section> */}
    </Card>
  );
}

// export function CardWithForm() {
//   return (
//     <Card className="w-[350px]">
//       <CardHeader>
//         <CardTitle>Create project</CardTitle>
//         <CardDescription>Deploy your new project in one-click.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="grid w-full items-center gap-4">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="name">Name</Label>
//               <Input id="name" placeholder="Name of your project" />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="framework">Framework</Label>
//               <Select>
//                 <SelectTrigger id="framework">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   <SelectItem value="next">Next.js</SelectItem>
//                   <SelectItem value="sveltekit">SvelteKit</SelectItem>
//                   <SelectItem value="astro">Astro</SelectItem>
//                   <SelectItem value="nuxt">Nuxt.js</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button variant="outline">Cancel</Button>
//         <Button>Deploy</Button>
//       </CardFooter>
//     </Card>
//   );
// }
