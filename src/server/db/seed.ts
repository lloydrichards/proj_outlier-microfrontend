import { type Table, getTableName, sql } from "drizzle-orm";
import { db } from ".";
import { blocks, events, speakers, speakersToEvents } from "./schema";
import { seed2024Edition } from "./seed/2024-edition";

async function resetTable(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

const main = async () => {
  for (const table of [speakers, events, blocks, speakersToEvents]) {
    await resetTable(db, table);
  }
  await seed2024Edition(db);

  process.exit(0);
};

main()
  .then(() => {
    console.log("Seeded database with agenda blocks");
  })
  .catch((err) => {
    console.error("Failed to seed database with agenda blocks", err);
  });
