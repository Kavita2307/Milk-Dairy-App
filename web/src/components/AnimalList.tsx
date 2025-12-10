export default function AnimalList({
  animals,
  onSelect,
}: {
  animals: any[];
  onSelect: (num: string) => void;
}) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      {animals.map((a) => (
        <button
          key={a.id}
          onClick={() => onSelect(a.animalNumber)}
          className="bg-white border p-3 rounded hover:bg-green-100"
        >
          Animal #{a.animalNumber}
        </button>
      ))}
    </div>
  );
}
