import { PublicUserData } from '@shared/types/user';
import { useState } from 'react';
import UserContext from './user';

export const UserProvider = ({ children, data }: { children: React.ReactNode; data: PublicUserData }) => {
  const [user] = useState<PublicUserData>(data);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
