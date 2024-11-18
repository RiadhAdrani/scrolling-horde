import { PublicUserData } from '@shared/types/user';

const profile = (user: PublicUserData) => ({
  fallback: () => `${user.firstname[0]}${user.lastname[0]}`.toUpperCase(),
  fullname: () => `${user.firstname} ${user.lastname}`,
});

export default profile;
