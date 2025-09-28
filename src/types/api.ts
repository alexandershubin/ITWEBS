export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Album {
  id: number;
  title: string;
  userId: number;
}