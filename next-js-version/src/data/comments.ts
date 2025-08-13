export interface CommentData {
  id: string;
  author: string;
  date: string;
  content: string;
  avatar: string;
}

export const commentsData: CommentData[] = [
  {
    id: "1",
    author: "User Name",
    date: "December 17, 2024",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "U"
  },
  {
    id: "2",
    author: "Jane Doe",
    date: "December 16, 2024",
    content: "Great post! Really enjoyed reading this. Looking forward to more content like this.",
    avatar: "J"
  },
  {
    id: "3",
    author: "Alex Smith",
    date: "December 15, 2024",
    content: "This is exactly what I was looking for. Thanks for sharing your insights!",
    avatar: "A"
  }
];