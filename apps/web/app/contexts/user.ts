import { PublicUserData } from '@shared/types/user';
import { createContext } from 'react';

type UserContextType = {
  user: PublicUserData;
};

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
