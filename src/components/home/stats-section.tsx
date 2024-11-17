import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Activity, Target } from "lucide-react";

const stats = [
  {
    label: "Accuracy Rate",
    value: "94%",
    icon: Target,
    description: "Prediction accuracy",
  },
  {
    label: "Active Users",
    value: "10K+",
    icon: Users,
    description: "Growing community",
  },
  {
    label: "Daily Predictions",
    value: "500+",
    icon: Activity,
    description: "AI-powered insights",
  },
  {
    label: "Success Rate",
    value: "89%",
    icon: Trophy,
    description: "Winning picks",
  },
];

export function StatsSection() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card 
              key={stat.label}
              className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}