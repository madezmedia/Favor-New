import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, LineChart, Brain } from "lucide-react";

const features = [
  {
    title: "AI-Powered Analysis",
    description: "Get intelligent insights and predictions based on comprehensive data analysis",
    icon: Brain,
  },
  {
    title: "Real-Time Odds",
    description: "Track live odds movements across multiple sportsbooks",
    icon: TrendingUp,
  },
  {
    title: "Advanced Statistics",
    description: "Deep dive into team and player performance metrics",
    icon: LineChart,
  },
  {
    title: "Smart Predictions",
    description: "Receive data-driven betting recommendations",
    icon: Target,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Why Choose Favor
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology with comprehensive sports data 
            to give you the edge in sports betting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}