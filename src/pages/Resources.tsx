import { useState } from 'react';
import { Button } from "@/components/ui/button";
import nosferatuScreenplay from '@/content/resources/nosferatu-screenplay.mdx';

type ResourceType = 'book' | 'podcast' | 'screenplay' | 'tool' | 'product';

interface ResourceComponent {
  default: React.ComponentType;
  metadata: {
    title: string;
    type: ResourceType;
    description: string;
  };
}

const Resources = () => {
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);
  const resourceTypes: ResourceType[] = ['book', 'podcast', 'screenplay', 'tool', 'product'];

  // Create an array of MDX modules
  const mdxModules: ResourceComponent[] = [nosferatuScreenplay];

  // Filter resources based on selected type
  const filteredResources = mdxModules.filter(
    resource => !selectedType || resource.metadata.type === selectedType
  );

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">Resources</h1>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {resourceTypes.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            onClick={() => setSelectedType(selectedType === type ? null : type)}
            className="capitalize"
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => {
          const ResourceComponent = resource.default;
          return (
            <div key={index}>
              <ResourceComponent />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;