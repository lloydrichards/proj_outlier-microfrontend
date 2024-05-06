import { db } from ".";
import { blocks, events, speakers, type NewBlock } from "./schema";

const agendaBlocks: [string, NewBlock["type"]][] = [
  // Day 1
  ["2024-06-12 08:00", "ANNOUNCEMENT"],
  ["2024-06-12 09:00", "ANNOUNCEMENT"],
  ["2024-06-12 09:10", "SPEAKER"],
  ["2024-06-12 09:30", "SPEAKER"],
  ["2024-06-12 10:30", "PAUSE"],
  ["2024-06-12 11:00", "SPEAKER"],
  ["2024-06-12 11:30", "SPEAKER"],
  ["2024-06-12 12:00", "LIGHTNING"],
  ["2024-06-12 12:10", "LIGHTNING"],
  ["2024-06-12 12:20", "LIGHTNING"],
  ["2024-06-12 12:30", "PAUSE"],
  ["2024-06-12 14:00", "SPEAKER"],
  ["2024-06-12 15:00", "SPEAKER"],
  ["2024-06-12 15:30", "PAUSE"],
  ["2024-06-12 16:00", "SPEAKER"],
  ["2024-06-12 16:30", "LIGHTNING"],
  ["2024-06-12 16:40", "LIGHTNING"],
  ["2024-06-12 16:50", "LIGHTNING"],
  ["2024-06-12 17:05", "UNCONF"],
  ["2024-06-12 17:50", "NETWORKING"],
  ["2024-06-12 19:20", "ANNOUNCEMENT"],
  // Day 2
  ["2024-06-13 08:30", "ANNOUNCEMENT"],
  ["2024-06-13 09:00", "SPEAKER"],
  ["2024-06-13 09:10", "SPEAKER"],
  ["2024-06-13 10:10", "LIGHTNING"],
  ["2024-06-13 10:20", "LIGHTNING"],
  ["2024-06-13 10:30", "PAUSE"],
  ["2024-06-13 11:00", "SPEAKER"],
  ["2024-06-13 11:30", "LIGHTNING"],
  ["2024-06-13 11:40", "SPEAKER"],
  ["2024-06-13 12:10", "SPEAKER"],
  ["2024-06-13 12:40", "PAUSE"],
  ["2024-06-13 14:10", "SPEAKER"],
  ["2024-06-13 15:10", "SPEAKER"],
  ["2024-06-13 15:40", "PAUSE"],
  ["2024-06-13 15:55", "SPEAKER"],
  ["2024-06-13 16:25", "SPEAKER"],
  ["2024-06-13 17:05", "UNCONF"],
  ["2024-06-13 17:50", "ANNOUNCEMENT"],
  ["2024-06-13 18:00", "ANNOUNCEMENT"],
  // Day 3
  ["2024-06-14 08:30", "ANNOUNCEMENT"],
  ["2024-06-14 09:00", "ANNOUNCEMENT"],
  ["2024-06-14 09:10", "SPEAKER"],
  ["2024-06-14 09:50", "LIGHTNING"],
  ["2024-06-14 10:00", "SPEAKER"],
  ["2024-06-14 10:30", "PAUSE"],
  ["2024-06-14 10:50", "LIGHTNING"],
  ["2024-06-14 11:00", "SPEAKER"],
  ["2024-06-14 11:30", "SPEAKER"],
  ["2024-06-14 12:00", "SPEAKER"],
  ["2024-06-14 12:30", "PAUSE"],
  ["2024-06-14 14:00", "NETWORKING"],
  ["2024-06-14 16:00", "ANNOUNCEMENT"],
  ["2024-06-14 16:10", "ANNOUNCEMENT"],
];

const main = async () => {
  // eslint-disable-next-line
  await db.delete(blocks);
  // eslint-disable-next-line
  await db.delete(events);
  // eslint-disable-next-line
  await db.delete(speakers);

  const offsetDate = (date: Date, hours: number) => {
    const newDate = new Date(date.getTime() + hours * 60 * 60 * 1000);
    return newDate;
  };
  const calculatedBlocks = agendaBlocks.map(([time, type], idx) => ({
    type,
    edition: "2024",
    start: offsetDate(new Date(time), 5),
    end: offsetDate(new Date(agendaBlocks[idx + 1]?.[0] ?? time), 5),
  }));

  for (const block of calculatedBlocks) {
    await db
      .insert(blocks)
      .values(block)
      .onConflictDoUpdate({
        target: [blocks.start],
        set: block,
      });
  }

  process.exit(0);
};

main()
  .then(() => {
    console.log("Seeded database with agenda blocks");
  })
  .catch((err) => {
    console.error("Failed to seed database with agenda blocks", err);
  });
