import { z } from 'zod';
import common from './common.js';

const signup = z.strictObject({
  email: common.email,
  password: common.password,
  firstname: common.name,
  lastname: common.name,
});

const signin = z.strictObject({
  email: common.email,
  password: common.password,
});

const userValidators = { signup, signin };

export default userValidators;
