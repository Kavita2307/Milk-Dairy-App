// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Seeding database...");

//   // 1. Create default user
//   const user = await prisma.user.upsert({
//     where: { email: "admin@example.com" },
//     update: {},
//     create: {
//       name: "Admin",
//       email: "admin@example.com",
//       password: "admin@1234", // put bcrypt hash here if needed
//     },
//   });

//   console.log("👤 User created:", user.email);

//   // 2. GROUP SEED DATA (milking + non-milking)
//   const groups = [
//     { name: "Group 1 (High Yielder)", type: "milking" },
//     { name: "Group 2 (Medium Yielder)", type: "milking" },
//     { name: "Group 3 (Low Yielder)", type: "milking" },
//     { name: "Group 4 – Starter calf (0–2 months)", type: "non-milking" },
//     { name: "Group 5 – Starter calf (3–6 months)", type: "non-milking" },
//     { name: "Group 6 – Grower calf (6–12 months)", type: "non-milking" },
//     { name: "Group 7 – Heifer (12–24 months)", type: "non-milking" },
//     { name: "Group 8 – Dry cow (Far off)", type: "non-milking" },
//     { name: "Group 9 – Dry cow (Close up)", type: "non-milking" },
//   ];

//   console.log("📌 Creating Groups...");

//   const createdGroups = [];
//   for (const g of groups) {
//     const created = await prisma.group.create({
//       data: {
//         name: g.name,
//         type: g.type,
//         userId: user.id,
//       },
//     });
//     createdGroups.push(created);
//   }

//   console.log("🐄 Groups created:", createdGroups.length);

//   // 3. Animals for each group (sample data)
//   console.log("🐮 Adding sample animals...");

//   for (const group of createdGroups) {
//     await prisma.animal.create({
//       data: {
//         animalNumber: `AN-${group.id}01`,
//         groupId: group.id,
//         userId: user.id,
//       },
//     });
//   }

//   console.log("✅ Seed completed successfully!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ----------------------------------------------------------
  // 1. USER
  // ----------------------------------------------------------
  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password: "admin@1234", // In production: bcrypt hash
    },
  });

  console.log("👤 User:", user.email);

  // ----------------------------------------------------------
  // 2. GROUPS (milking + non-milking)
  // ----------------------------------------------------------
  const groups = [
    { id: 1, name: "Group 1 (High Yielder)", type: "milking" },
    { id: 2, name: "Group 2 (Medium Yielder)", type: "milking" },
    { id: 3, name: "Group 3 (Low Yielder)", type: "milking" },
    { id: 4, name: "Group 4 – Starter calf (0–2 months)", type: "non-milking" },
    { id: 5, name: "Group 5 – Starter calf (3–6 months)", type: "non-milking" },
    { id: 6, name: "Group 6 – Grower calf (6–12 months)", type: "non-milking" },
    { id: 7, name: "Group 7 – Heifer (12–24 months)", type: "non-milking" },
    { id: 8, name: "Group 8 – Dry cow (Far off)", type: "non-milking" },
    { id: 9, name: "Group 9 – Dry cow (Close up)", type: "non-milking" },
  ];

  console.log("📌 Seeding Groups...");

  const createdGroups = [];
  for (const g of groups) {
    const created = await prisma.group.upsert({
      where: { id: g.id },
      update: {},
      create: {
        id: g.id,
        name: g.name,
        type: g.type,
        userId: user.id,
      },
    });

    createdGroups.push(created);
  }

  console.log("🐄 Groups:", createdGroups.length);

  // ----------------------------------------------------------
  // 3. SAMPLE ANIMALS 1 per group
  // ----------------------------------------------------------
  console.log("🐮 Seeding animals...");

  for (const group of createdGroups) {
    await prisma.animal.upsert({
      where: { id: group.id }, // 1 animal per group
      update: {},
      create: {
        id: group.id,
        animalNumber: `AN-${group.id}01`,
        userId: user.id,
        groupId: group.id,
        details: {
          age: 2 + group.id,
          weight: 350 + group.id * 10,
          color: "Brown",
        },
      },
    });
  }

  console.log("🐄 Animals Added");

  // ----------------------------------------------------------
  // 4. RATION SEED (only for milking groups)
  // ----------------------------------------------------------
  console.log("🍽 Seeding ration...");

  const sampleRation = {
    name: "Group Ration",
    no: 120,
    kg: 50,
    total: 3000,
    thisLoad: 3000,
    lastLoad: 2980,
    diff: 20,
    rationSize: 45.0,
    days: 1,
  };

  for (const g of createdGroups.filter((g) => g.type === "milking")) {
    await prisma.ration.upsert({
      where: { id: g.id },
      update: {},
      create: {
        id: g.id,
        groupId: g.id,
        userId: user.id,
        ...sampleRation,
        name: `${g.name} Ration`,
      },
    });
  }

  console.log("🥣 Ration added for milking groups");

  // ----------------------------------------------------------
  // 5. INGREDIENTS per group
  // ----------------------------------------------------------
  console.log("🌾 Adding ingredients...");

  const ingredientSeed = [
    { name: "Wheat Straw", kg: 1.4, total: 89, price: 12 },
    { name: "Premix Milk", kg: 15, total: 959, price: 50 },
    { name: "Sodium Bicarbonate", kg: 0.15, total: 9, price: 40 },
    { name: "Corn Silage", kg: 28.5, total: 1822, price: 8 },
    { name: "Water", kg: 20, total: 127, price: 0 },
  ];

  for (const g of createdGroups.filter((g) => g.type === "milking")) {
    for (const ing of ingredientSeed) {
      await prisma.ingredient.upsert({
        where: { name: `${ing.name} G${g.id}` },
        update: {},
        create: {
          name: `${ing.name} G${g.id}`,
          groupId: g.id,
          currentStock: ing.total,
          details: { pricePerKg: ing.price },
        },
      });
    }
  }

  console.log("🌿 Ingredients added with stock");

  // ----------------------------------------------------------
  // 6. Leftover + Milk sample entries
  // ----------------------------------------------------------
  console.log("🥛 Seeding leftover + milk...");

  await prisma.leftover.create({
    data: {
      groupId: 1,
      leftoverKg: 15,
    },
  });

  await prisma.milk.createMany({
    data: [
      { groupId: 1, shift: "morning", milkLit: 185 },
      { groupId: 1, shift: "evening", milkLit: 165 },
    ],
  });

  console.log("✨ Leftover & Milk seed added");

  // ----------------------------------------------------------
  console.log("🌱 Seed Complete!");
}

main()
  .catch((err) => {
    console.error("❌ SEED ERROR:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
