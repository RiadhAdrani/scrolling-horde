import { useContext } from 'react';
import UserContext from './user';

const createUseFn =
  <T = unknown>(ctx: React.Context<T>) =>
  () => {
    const value = useContext(ctx);

    if (!value) {
      throw new Error(`use${ctx.displayName} must be used within a ${ctx.displayName}Provider`);
    }

    return value;
  };

export const useUser = createUseFn(UserContext);
