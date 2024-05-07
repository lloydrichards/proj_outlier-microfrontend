import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "../src/env";
import * as schema from "../src/server/db/schema";

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

const db = drizzle(conn, { schema });

const main = async () => {
  const result = await db.query.blocks.findMany({
    orderBy: (blocks, { asc }) => [asc(blocks.start)],
    with: {
      events: {
        with: {
          speakers: true,
        },
      },
    },
  });

  const parsed = result.map((block) => ({
    type: block.type,
    start: block.start,
    end: block.end,
    events: block.events.map((event) => ({
      title: event.title,
      description: event.description,
      location: event.location,
      imageUrl: event.imageUrl,
      linkLabel: event.linkLabel,
      linkUrl: event.linkUrl,
      category: event.category,
      speakers: event.speakers.map((speaker) => ({
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        title: speaker.title,
        pronouns: speaker.pronouns,
        email: speaker.email,
        organization: speaker.organization,
        imageUrl: speaker.imageUrl,
        bio: speaker.bio,
      })),
    })),
  }));

  await Bun.write(
    "./src/server/db/seed/2024-edition.json",
    JSON.stringify(parsed, null, 2),
  );
  process.exit(0);
};

main()
  .then(() => {
    console.log("Completed download of agenda blocks");
  })
  .catch((err) => {
    console.error("Failed!", err);
  });
