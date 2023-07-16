export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  image?: string;
};

export type SimpleUser = Pick<User, 'username' | 'image'>;

export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type SearchUser = User & {
  following: number;
  followers: number;
};
