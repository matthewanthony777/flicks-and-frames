declare module '*.mdx' {
  import { ComponentType } from 'react';
  
  export type ResourceType = 'book' | 'podcast' | 'screenplay' | 'tool' | 'product';
  
  interface MDXContent extends ComponentType {
    metadata: {
      title: string;
      type: ResourceType;
      description: string;
    };
  }
  
  const Component: MDXContent;
  export default Component;
}