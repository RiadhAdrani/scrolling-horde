import { z } from 'zod';

const textContent = z.string().max(10000);

const create = z.strictObject({
  text: textContent,
});

const update = z.strictObject({
  text: textContent.optional(),
});

const share = z.strictObject({
  text: textContent.optional(),
});

export const postValidators = { create, update, share };
