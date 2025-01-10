declare module '*.mdx' {
  import { ComponentType } from 'react';
  
  interface MDXContent extends ComponentType {
    metadata: {
      title: string;
      type: string;
      description: string;
    };
  }
  
  const Component: MDXContent;
  export default Component;
}