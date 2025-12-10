export default function AnimalDetails({ details }: { details: any }) {
  if (!details) return null;

  const daysInMilk = details.dateOfCalving
    ? Math.floor(
        (Date.now() - new Date(details.dateOfCalving).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-bold mb-4 border-b pb-2">Animal Details</h3>

      <p>Age: {details.ageMonths} months</p>
      <p>Weight: {details.bodyWeightKg} kg</p>
      <p>Lactation No: {details.lactationNo}</p>
      <p>Date of Calving: {details.dateOfCalving}</p>
      <p>Days in Milk: {daysInMilk}</p>

      <h4 className="mt-4 font-semibold">Health</h4>
      <p>BCS: {details.health?.bcs}</p>
      <p>Dung Score: {details.health?.dungScore}</p>

      <h4 className="mt-4 font-semibold">Pedigree</h4>
      <p>Dam No: {details.pedigree?.damNo}</p>
      <p>Bull: {details.pedigree?.bullName}</p>
    </div>
  );
}
