import { Metadata } from "@/types/metadata";

const GITHUB_REPO = "mattbarr1/mattbarr-blog";
const GITHUB_BRANCH = "main";

export const getArticleMetadata = async (): Promise<Metadata[]> => {
  try {
    // Fetch the list of files from the content/articles directory
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/articles?ref=${GITHUB_BRANCH}`
    );
    
    if (!response.ok) {
      console.error("Failed to fetch articles from GitHub");
      return [];
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
    return [];
  }
};