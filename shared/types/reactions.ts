import type { Reaction } from './prisma.js';

export type AddReactionBody = Pick<Reaction, 'type'>;
