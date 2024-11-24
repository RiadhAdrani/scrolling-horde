import { z } from 'zod';
import { ReactionType } from '@prisma/client';

const reaction = z.enum(Object.values(ReactionType) as [ReactionType, ...ReactionType[]]);

const create = z.strictObject({
  type: reaction,
});

const reactionValidators = { create };

export default reactionValidators;
