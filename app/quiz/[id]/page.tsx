import { headers } from "next/headers";

export default function QuizPage() {
  const heads = headers();

  const pathname = heads.get("next-url");

  console.log(pathname);

  const id = pathname?.split("/")[2];

  console.log(id);

  return (
    <div className="flex flex-col items-center text-center py-4">
      <h1 className="font-semibold text-4xl p-12">{`Quiz ${id}`}</h1>
      <p>This is a quiz about the first quiz</p>
    </div>
  );
}
