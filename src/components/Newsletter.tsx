import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  return (
    <section className="py-20 bg-cinema-gray/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Stay Updated with Cinema News
        </h2>
        <p className="text-gray-400 mb-8">
          Get the latest reviews, articles, and insights delivered directly to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-cinema-black/50 border-cinema-gray/20 text-white placeholder:text-gray-500 focus:border-cinema-gold"
            required
          />
          <Button
            type="submit"
            className="bg-cinema-gold hover:bg-cinema-gold/90 text-cinema-black font-semibold whitespace-nowrap"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;