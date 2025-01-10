import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, GraduationCap, Users, Briefcase, Award, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  const careerGuidance = [
    {
      title: "Getting Started",
      description: "Essential steps to begin your film career journey",
      icon: <Lightbulb className="h-6 w-6 text-theme-primary" />,
      content: [
        "Understanding the industry landscape",
        "Building foundational skills",
        "Creating your first portfolio",
        "Networking basics"
      ]
    },
    {
      title: "Education Pathways",
      description: "Educational options to develop your skills",
      icon: <GraduationCap className="h-6 w-6 text-theme-primary" />,
      content: [
        "Film schools and programs",
        "Online courses and certifications",
        "Workshops and masterclasses",
        "Self-directed learning resources"
      ]
    },
    {
      title: "Career Paths",
      description: "Explore different roles in the film industry",
      icon: <Briefcase className="h-6 w-6 text-theme-primary" />,
      content: [
        "Creative roles (Director, Writer, etc.)",
        "Technical roles (DP, Editor, etc.)",
        "Production roles",
        "Business and distribution"
      ]
    },
    {
      title: "Professional Development",
      description: "Grow your career and expertise",
      icon: <Award className="h-6 w-6 text-theme-primary" />,
      content: [
        "Industry certifications",
        "Skill advancement",
        "Leadership development",
        "Project management"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-theme-primary">
            Film Industry Career Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive guide to building a successful career in the film industry.
            Explore educational pathways, career options, and professional development opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {careerGuidance.map((section, index) => (
            <Card key={index} className="bg-card border-border hover:border-theme-primary transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-theme-primary">
                  {section.icon}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-theme-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideUp">
          <div className="bg-card/50 rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold mb-4 text-theme-primary flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Educational Resources
            </h2>
            <p className="text-muted-foreground mb-6">
              Access our curated collection of learning materials, tutorials, and guides
              to help you develop your skills and knowledge.
            </p>
            <Link to="/resources">
              <Button className="bg-theme-primary hover:bg-theme-secondary text-white">
                Browse Resources
              </Button>
            </Link>
          </div>

          <div className="bg-card/50 rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold mb-4 text-theme-primary flex items-center gap-2">
              <Users className="h-6 w-6" />
              Community & Networking
            </h2>
            <p className="text-muted-foreground mb-6">
              Connect with industry professionals, join discussions, and find
              mentorship opportunities to grow your network.
            </p>
            <Link to="/collaborate">
              <Button className="bg-theme-primary hover:bg-theme-secondary text-white">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;