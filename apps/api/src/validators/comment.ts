import { z } from 'zod';

const text = z.string().max(5000);

const create = z.strictObject({
  text,
});

const update = z.strictObject({
  text: text.optional(),
});

export const commentValidators = { create, update };
