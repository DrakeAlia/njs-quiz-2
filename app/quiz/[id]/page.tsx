export default function QuizPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Quiz {params.id}</h1>
    </div>
  );
}
