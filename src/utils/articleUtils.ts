import { Metadata } from "@/types/metadata";

const GITHUB_REPO = "matthewanthony777/flicks-and-frames";
const GITHUB_BRANCH = "main";
const ARTICLES_PATH = "content/articles";

export const getArticleMetadata = async (): Promise<Metadata[]> => {
  try {
    console.log("Starting article fetch...");
    console.log(`Repository: ${GITHUB_REPO}`);
    console.log(`Branch: ${GITHUB_BRANCH}`);
    console.log(`Path: ${ARTICLES_PATH}`);
    
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${ARTICLES_PATH}?ref=${GITHUB_BRANCH}`;
    console.log(`Making request to: ${apiUrl}`);
    
    const response = await fetch(apiUrl);
    const responseClone = response.clone(); // Clone response before first use
    
    // Check for rate limit first
    if (response.status === 403) {
      const errorText = await responseClone.text();
      if (errorText.includes("API rate limit exceeded")) {
        console.error("GitHub API rate limit exceeded. Please try again later.");
        throw new Error("GitHub API rate limit exceeded. Please try again later.");
      }
    }

    if (!response.ok) {
      const errorText = await responseClone.text();
      console.error("GitHub API Error Details:");
      console.error(`Status: ${response.status}`);
      console.error(`Status Text: ${response.statusText}`);
      console.error(`Response body: ${errorText}`);
      throw new Error(`GitHub API request failed: ${errorText}`);
    }

    const files = await response.json();
    const mdxFiles = files.filter((file: any) => file.name.endsWith('.mdx'));
    
    console.log(`Found ${mdxFiles.length} MDX files`);

    // Fetch and parse each MDX file
    const articles = await Promise.all(
      mdxFiles.map(async (file: any) => {
        try {
          console.log(`Fetching content for: ${file.name}`);
          const contentResponse = await fetch(file.download_url);
          
          if (!contentResponse.ok) {
            console.error(`Failed to fetch content for ${file.name}`);
            return null;
          }
          
          const contentText = await contentResponse.text();
          
          // Parse frontmatter from MDX content
          const frontmatterMatch = contentText.match(/---\n([\s\S]*?)\n---/);
          if (!frontmatterMatch) {
            console.error(`No frontmatter found in ${file.name}`);
            return null;
          }

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
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          return null;
        }
      })
    );

    // Filter out any null values and return valid articles
    const validArticles = articles.filter((article): article is Metadata => article !== null);
    
    if (validArticles.length === 0) {
      throw new Error("No valid articles found");
    }
    
    console.log(`Successfully processed ${validArticles.length} articles`);
    return validArticles;
    
  } catch (error) {
    console.error("Error in getArticleMetadata:", error);
    throw error;
  }
};