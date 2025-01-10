import { Metadata } from "@/types/metadata";

export const getArticleMetadata = async (): Promise<Metadata[]> => {
  // In a production environment, this would fetch from your GitHub repository
  // For now, we'll return the metadata for the one article we have
  return [
    {
      title: "Getting Started with Film",
      description: "An introduction to the world of cinema",
      date: "2024-03-14",
      author: "Film Expert",
      category: "Film Articles",
      coverVideo: "/chris-nolan-edit.mp4"
    }
  ];
};