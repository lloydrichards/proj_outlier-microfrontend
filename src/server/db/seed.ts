import { db } from ".";
import { blocks, NewBlock } from "./schema";

const agendaBlocks: [string, NewBlock["type"]][] = [
  // Day 1
  ["2024-06-12 08:30", "ANNOUNCEMENT"],
  ["2024-06-12 09:00", "ANNOUNCEMENT"],
  ["2024-06-12 09:10", "SPEAKER"],
  ["2024-06-12 09:30", "SPEAKER"],
  ["2024-06-12 10:30", "PAUSE"],
  ["2024-06-12 11:00", "SPEAKER"],
  ["2024-06-12 11:30", "SPEAKER"],
  ["2024-06-12 12:00", "LIGHTENING"],
  ["2024-06-12 12:10", "LIGHTENING"],
  ["2024-06-12 12:20", "LIGHTENING"],
  ["2024-06-12 12:30", "PAUSE"],
  ["2024-06-12 14:00", "SPEAKER"],
  ["2024-06-12 15:00", "SPEAKER"],
  ["2024-06-12 15:30", "PAUSE"],
  ["2024-06-12 16:00", "SPEAKER"],
  ["2024-06-12 16:30", "LIGHTENING"],
  ["2024-06-12 16:40", "LIGHTENING"],
  ["2024-06-12 16:50", "LIGHTENING"],
  ["2024-06-12 17:00", "UNCONF"],
  ["2024-06-12 17:45", "NETWORKING"],
  ["2024-06-12 19:15", "ANNOUNCEMENT"],
  // Day 2
  ["2024-06-13 09:00", "ANNOUNCEMENT"],
  ["2024-06-13 09:10", "SPEAKER"],
  ["2024-06-13 10:10", "SPEAKER"],
  ["2024-06-13 10:40", "PAUSE"],
  ["2024-06-13 11:00", "LIGHTENING"],
  ["2024-06-13 11:10", "LIGHTENING"],
  ["2024-06-13 11:20", "LIGHTENING"],
  ["2024-06-13 11:30", "SPEAKER"],
  ["2024-06-13 12:00", "SPEAKER"],
  ["2024-06-13 12:30", "PAUSE"],
  ["2024-06-13 14:00", "SPEAKER"],
  ["2024-06-13 15:00", "SPEAKER"],
  ["2024-06-13 15:30", "PAUSE"],
  ["2024-06-13 15:50", "UNCONF"],
  ["2024-06-13 16:50", "SPEAKER"],
  ["2024-06-13 17:00", "ANNOUNCEMENT"],
  // Day 3
  ["2024-06-14 09:00", "ANNOUNCEMENT"],
  ["2024-06-14 09:10", "SPEAKER"],
  ["2024-06-14 09:50", "LIGHTENING"],
  ["2024-06-14 10:00", "SPEAKER"],
  ["2024-06-14 10:30", "PAUSE"],
  ["2024-06-14 10:50", "LIGHTENING"],
  ["2024-06-14 11:00", "SPEAKER"],
  ["2024-06-14 11:30", "SPEAKER"],
  ["2024-06-14 12:00", "LIGHTENING"],
  ["2024-06-14 12:10", "ANNOUNCEMENT"],
  ["2024-06-14 12:30", "PAUSE"],
  ["2024-06-14 13:30", "NETWORKING"],
  ["2024-06-14 15:30", "ANNOUNCEMENT"],
];

const main = async () => {
  await db.delete(blocks);

  const offsetDate = (date: Date, hours: number) => {
    const newDate = new Date(date.getTime() + hours * 60 * 60 * 1000);
    return newDate;
  };
  const calculatedBlocks = agendaBlocks.map(([time, type], idx) => ({
    type,
    start: offsetDate(new Date(time), 5),
    end: offsetDate(new Date(agendaBlocks[idx + 1]?.[0] || time), 5),
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

main();
