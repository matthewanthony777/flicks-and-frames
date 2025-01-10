declare module '*.mdx' {
  import { ComponentType } from 'react';
  
  const Component: ComponentType & {
    metadata: {
      title: string;
      type: string;
      description: string;
    };
  };
  
  export default Component;
}