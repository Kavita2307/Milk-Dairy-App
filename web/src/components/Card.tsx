export default function Card({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white p-8 rounded-xl shadow hover:shadow-lg border hover:border-blue-500 transition"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">{title}</h2>
    </div>
  );
}
