import { createId } from '@paralleldrive/cuid2';

export const $id = () => createId();

export const duration = {
  seconds: (count = 1) => new Date(Date.now() + 1000 * count),
  minutes: (count = 1) => new Date(Date.now() + 1000 * 60 * count),
  hours: (count = 1) => new Date(Date.now() + 1000 * 60 * 60 * count),
  days: (count = 1) => new Date(Date.now() + 1000 * 60 * 60 * 24 * count),
  weeks: (count = 1) => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * count),
  months: (count = 1) => new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * count),
  years: (count = 1) => new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * count),
};
