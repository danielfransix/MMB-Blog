export interface Author {
  id: string;
  name: string;
  bio: string;
  picture: string;
}

export const authorsData: Author[] = [
  {
    id: "daniel-fransix",
    name: "Daniel Fransix",
    bio: "Daniel is a passionate technology writer and software engineer with over 8 years of experience in web development. He specializes in modern JavaScript frameworks and enjoys sharing his knowledge about emerging technologies and best practices in software development.",
    picture: "/img/dain.webp"
  },
  {
    id: "stephanie-ani",
    name: "Stephanie Ani",
    bio: "Stephanie is a creative designer and UX specialist who brings a unique perspective to digital storytelling. With a background in visual arts and human-computer interaction, she focuses on creating engaging user experiences and exploring the intersection of design and technology.",
    picture: "/img/OIP.webp"
  }
];

// Helper function to get author by ID
export function getAuthorById(id: string): Author | undefined {
  return authorsData.find(author => author.id === id);
}

// Helper function to get author by name
export function getAuthorByName(name: string): Author | undefined {
  return authorsData.find(author => author.name === name);
}