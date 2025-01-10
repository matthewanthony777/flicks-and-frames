declare module '*.mdx' {
  import type { ComponentType } from 'react';
  
  export type ResourceType = 'book' | 'podcast' | 'screenplay' | 'tool' | 'product';
  
  export interface MDXContent extends ComponentType<{}> {
    metadata: {
      title: string;
      type: ResourceType;
      description: string;
    };
  }
  
  const Component: MDXContent;
  export default Component;
}