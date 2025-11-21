// prisma/seed.ts
import prisma from "../src/prisma/client";

async function main() {
  // groups we want to ensure exist
  const groups = [
    { name: "Group 1 - High Yielder", category: "milking" },
    { name: "Group 2 - Medium Yielder", category: "milking" },
    { name: "Group 3 - Low Yielder", category: "milking" },
    { name: "Group 4 - Milk fed calfs", category: "non-milking" },
    { name: "Group 5 - Starter calf", category: "non-milking" },
  ];

  // createMany with skipDuplicates (safe if names are not unique in schema)
  // skipDuplicates works for unique columns; if none of the provided columns are unique,
  // it will still attempt to insert — in most cases this is used together with a unique field.
  // But it's still convenient: if duplicates exist based on unique constraints, they will be skipped.
  try {
    await prisma.group.createMany({
      data: groups,
      skipDuplicates: true,
    });
    console.log("Groups ensured (createMany done).");
  } catch (err) {
    // createMany may throw if no unique constraint applies for duplicates — fallback to upsert-like logic
    console.warn(
      "createMany failed (falling back to per-item upsert).",
      (err as any).message
    );

    for (const g of groups) {
      const existing = await prisma.group.findFirst({
        where: { name: g.name },
      });
      if (!existing) {
        await prisma.group.create({ data: g });
        console.log(`Created group "${g.name}"`);
      } else {
        console.log(`Group "${g.name}" already exists`);
      }
    }
  }

  // Ensure at least one group exists so groupId = 1 is valid for demo animal.
  const firstGroup = await prisma.group.findFirst();
  if (!firstGroup) {
    throw new Error("No groups found after seeding. Something went wrong.");
  }

  // Upsert a sample animal using the unique field animalNumber
  await prisma.animal.upsert({
    where: { animalNumber: "001" }, // animalNumber is unique in your schema
    update: {
      details: { note: "sample updated" },
      groupId: firstGroup.id,
    },
    create: {
      animalNumber: "001",
      groupId: firstGroup.id,
      details: { note: "sample created" },
    },
  });

  console.log("Sample animal upsert completed.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
