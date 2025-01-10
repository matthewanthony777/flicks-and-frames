declare module '*.mdx' {
  import type { ComponentType } from 'react';
  
  export type ResourceType = 'book' | 'podcast' | 'screenplay' | 'tool' | 'product';
  
  export interface MDXMetadata {
    title: string;
    type: ResourceType;
    description: string;
  }

  export interface MDXModule extends ComponentType {
    metadata: MDXMetadata;
  }
  
  const Component: MDXModule;
  export default Component;
}