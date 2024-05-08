export {
  events,
  categoryEnum,
  locationEnum,
  statusEnum,
  insertEventSchema,
  eventRelations,
} from "./events";
export {
  speakers,
  insertSpeakerSchema,
  speakerRelations,
  speakersToEvents,
  speakersToEventsRelations,
} from "./speakers";
export { blocks, blockEnum, insertBlockSchema, blockRelations } from "./blocks";

export type { NewBlock, Block, InsertBlockSchema } from "./blocks";
export type { NewEvent, Event, InsertEventSchema } from "./events";
export type { NewSpeaker, Speaker, InsertSpeakerSchema } from "./speakers";
