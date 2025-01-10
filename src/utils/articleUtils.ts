import { Metadata } from "@/types/metadata";

// Update these constants to match your actual GitHub repository
const GITHUB_REPO = "matthewanthony777/flicks-and-frames";
const GITHUB_BRANCH = "main";
const ARTICLES_PATH = "content/articles"; // Updated to match new repository structure

export const getArticleMetadata = async (): Promise<Metadata[]> => {
  try {
    // First try the default articles directory
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${ARTICLES_PATH}?ref=${GITHUB_BRANCH}`
    );
    
    if (!response.ok) {
      console.error(`Failed to fetch articles from GitHub: ${response.statusText}`);
      console.error(`URL attempted: ${response.url}`);
      console.error(`Response status: ${response.status}`);
      
      // Return mock data for development
      return [
        {
          title: "All Things Christopher",
          description: "An exploration of Christopher Nolan's filmmaking techniques",
          date: "2024-01-10",
          author: "Matt Barr",
          category: "Film Articles",
          coverVideo: "/chris-nolan-edit.mp4"
        },
        {
          title: "Getting Started with Film",
          description: "A beginner's guide to understanding cinema",
          date: "2024-01-09",
          author: "Matt Barr",
          category: "Film Articles",
          coverImage: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1"
        }
      ];
    }

    const files = await response.json();
    const mdxFiles = files.filter((file: any) => file.name.endsWith('.mdx'));

    // Fetch and parse each MDX file
    const articles = await Promise.all(
      mdxFiles.map(async (file: any) => {
        const contentResponse = await fetch(file.download_url);
        const content = await contentResponse.text();
        
        // Parse frontmatter from MDX content
        const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) return null;

        const frontmatter = frontmatterMatch[1];
        const metadata: Partial<Metadata> = {};

        // Extract metadata fields
        const fields = [
          { key: 'title', regex: /title:\s*"([^"]*)"/ },
          { key: 'description', regex: /description:\s*"([^"]*)"/ },
          { key: 'date', regex: /date:\s*"([^"]*)"/ },
          { key: 'author', regex: /author:\s*"([^"]*)"/ },
          { key: 'category', regex: /category:\s*"([^"]*)"/ },
          { key: 'coverVideo', regex: /coverVideo:\s*"([^"]*)"/ },
          { key: 'coverImage', regex: /coverImage:\s*"([^"]*)"/ }
        ];

        fields.forEach(({ key, regex }) => {
          const match = frontmatter.match(regex);
          if (match) {
            metadata[key as keyof Metadata] = match[1];
          }
        });

        // Ensure all required fields are present
        if (!metadata.title || !metadata.description || !metadata.date || 
            !metadata.author || !metadata.category) {
          console.error(`Missing required metadata in ${file.name}`);
          return null;
        }

        return metadata as Metadata;
      })
    );

    // Filter out any null values and return valid articles
    return articles.filter((article): article is Metadata => article !== null);
  } catch (error) {
    console.error("Error fetching articles:", error);
    
    // Return mock data for development
    return [
      {
        title: "All Things Christopher",
        description: "An exploration of Christopher Nolan's filmmaking techniques",
        date: "2024-01-10",
        author: "Matt Barr",
        category: "Film Articles",
        coverVideo: "/chris-nolan-edit.mp4"
      },
      {
        title: "Getting Started with Film",
        description: "A beginner's guide to understanding cinema",
        date: "2024-01-09",
        author: "Matt Barr",
        category: "Film Articles",
        coverImage: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1"
      }
    ];
  }
};