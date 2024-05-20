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
          speakers: {
            with: {
              speaker: true,
            },
          },
        },
      },
    },
  });

  const parsed = result.map((block) => ({
    type: block.type,
    start: block.start,
    end: block.end,
    edition: block.edition,
    events: block.events.map((event) => ({
      title: event.title,
      summary: event.summary,
      description: event.description,
      location: event.location,
      imageUrl: event.imageUrl,
      linkLabel: event.linkLabel,
      linkUrl: event.linkUrl,
      category: event.category,
      speakers: event.speakers.map(({ speaker }) => ({
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

  const allEditions = new Set(parsed.map((block) => block.edition));

  const groupedByEdition = Array.from(allEditions).map((edition) => ({
    edition,
    data: parsed.filter((block) => block.edition === edition),
  }));

  await Promise.all(
    groupedByEdition.map(async ({ edition, data }) => {
      await Bun.write(
        `./src/server/db/seed/data/${edition}-edition.json`,
        JSON.stringify(data, null, 2),
      );
      process.exit(0);
    }),
  );
};

main()
  .then(() => {
    console.log("Completed download of agenda blocks");
  })
  .catch((err) => {
    console.error("Failed!", err);
  });
