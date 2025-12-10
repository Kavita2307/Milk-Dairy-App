export default function GroupList({
  groups,
  onSelect,
}: {
  groups: any[];
  onSelect: (id: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {groups.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(g.id)}
          className="bg-gray-100 p-4 rounded-lg hover:bg-blue-100 font-semibold"
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
