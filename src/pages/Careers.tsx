import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Users } from "lucide-react";

const Careers = () => {
  const careerPaths = [
    {
      title: "Film Direction",
      description: "Lead creative vision and manage production teams",
      icon: <Users className="h-6 w-6" />,
      steps: ["Assistant Director", "Second Unit Director", "Feature Film Director"],
    },
    {
      title: "Cinematography",
      description: "Master the art of visual storytelling through camera work",
      icon: <BookOpen className="h-6 w-6" />,
      steps: ["Camera Assistant", "Camera Operator", "Director of Photography"],
    },
    {
      title: "Production",
      description: "Oversee film projects from concept to completion",
      icon: <Briefcase className="h-6 w-6" />,
      steps: ["Production Assistant", "Production Coordinator", "Producer"],
    },
    {
      title: "Film Education",
      description: "Shape the next generation of filmmakers",
      icon: <GraduationCap className="h-6 w-6" />,
      steps: ["Teaching Assistant", "Film Instructor", "Department Head"],
    },
  ];

  return (
    <div className="min-h-screen bg-theme-dark text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-theme-primary">
            Film Industry Careers
          </h1>
          <p className="text-lg text-theme-neutral max-w-2xl mx-auto">
            Explore diverse career paths in the film industry and discover resources
            to help you succeed in your chosen direction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {careerPaths.map((path, index) => (
            <Card key={index} className="bg-theme-dark border border-theme-secondary hover:border-theme-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-theme-primary">
                  {path.icon}
                  {path.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-theme-neutral mb-4">{path.description}</p>
                <div className="flex items-center gap-3">
                  {path.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center">
                      <span className="text-sm text-theme-light">{step}</span>
                      {stepIndex < path.steps.length - 1 && (
                        <ArrowRight className="h-4 w-4 mx-2 text-theme-secondary" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideUp">
          <div className="bg-theme-secondary/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-theme-primary">Educational Resources</h2>
            <ul className="space-y-3 text-theme-neutral">
              <li>• Online Film Schools and Courses</li>
              <li>• Industry Workshops and Seminars</li>
              <li>• Technical Certification Programs</li>
              <li>• Mentorship Opportunities</li>
            </ul>
            <Button className="mt-6 bg-theme-primary hover:bg-theme-secondary text-white">
              Browse Resources
            </Button>
          </div>

          <div className="bg-theme-secondary/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-theme-primary">Success Stories</h2>
            <p className="text-theme-neutral mb-4">
              Get inspired by real stories from industry professionals who've built
              successful careers in film.
            </p>
            <Button className="bg-theme-primary hover:bg-theme-secondary text-white">
              Read Stories
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;