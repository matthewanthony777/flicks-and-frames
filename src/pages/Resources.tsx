import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type ResourceType = 'book' | 'podcast' | 'screenplay' | 'tool' | 'product';

const Resources = () => {
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);

  const resourceTypes: ResourceType[] = ['book', 'podcast', 'screenplay', 'tool', 'product'];

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
        {/* Resources will be dynamically loaded from MDX files */}
      </div>
    </div>
  );
};

export default Resources;