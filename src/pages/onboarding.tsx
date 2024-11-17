import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Target, TrendingUp, LineChart, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const BETTING_EXPERIENCE = [
  { id: "beginner", label: "Beginner", description: "New to sports betting", icon: Target },
  { id: "intermediate", label: "Intermediate", description: "Some betting experience", icon: TrendingUp },
  { id: "advanced", label: "Advanced", description: "Experienced bettor", icon: Brain },
];

const SPORTS_INTERESTS = [
  { id: "nba", label: "NBA", icon: Target },
  { id: "nfl", label: "NFL", icon: TrendingUp },
  { id: "mlb", label: "MLB", icon: LineChart },
];

export default function Onboarding() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [experience, setExperience] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setInterests(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleComplete = async () => {
    try {
      await user?.update({
        publicMetadata: {
          bettingExperience: experience,
          sportsInterests: interests,
        },
      });
      navigate("/app");
    } catch (error) {
      console.error("Failed to save preferences:", error);
    }
  };

  return (
    <AuthLayout
      heading="Welcome to Favor"
      subheading="Let's personalize your experience"
    >
      <div className="space-y-6">
        {/* Betting Experience */}
        <div className="space-y-4">
          <h2 className="font-semibold">What's your betting experience?</h2>
          <div className="grid gap-4">
            {BETTING_EXPERIENCE.map(level => {
              const Icon = level.icon;
              return (
                <Card 
                  key={level.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:bg-accent",
                    experience === level.id && "border-primary bg-primary/5"
                  )}
                  onClick={() => setExperience(level.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {level.description}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sports Interests */}
        <div className="space-y-4">
          <h2 className="font-semibold">Select your sports interests</h2>
          <div className="grid grid-cols-3 gap-4">
            {SPORTS_INTERESTS.map(sport => {
              const Icon = sport.icon;
              const isSelected = interests.includes(sport.id);
              
              return (
                <Card 
                  key={sport.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:bg-accent",
                    isSelected && "border-primary bg-primary/5"
                  )}
                  onClick={() => toggleInterest(sport.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="font-medium">{sport.label}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Button 
          className="w-full"
          disabled={!experience || interests.length === 0}
          onClick={handleComplete}
        >
          Complete Setup
        </Button>
      </div>
    </AuthLayout>
  );
}