import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Code2, GraduationCap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const agents = [
  {
    title: "AI Code Reviewer",
    description: "Automated PR analysis and bug detection.",
    icon: Code2,
    buttonText: "Start Review",
    variant: "default",
    border: "border-primary/20 hover:border-primary/50",
    bg: "bg-primary/10",
    iconColor: "text-primary",
    features: ["Security checks", "Code Optimization"],
  },
  {
    title: "Learning Web Agent",
    description: "Personalized web research assistant.",
    icon: GraduationCap,
    buttonText: "Start Learning",
    variant: "secondary",
    border: "border-secondary/20 hover:border-primary/50",
    bg: "bg-secondary/10",
    iconColor: "text-secondary-foreground",
    content: "Scrapes and synthesizes content automatically.",
  },
];

const AgentCards = () => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-6 md:grid-cols-2 p-6">
      {agents.map((agent, index) => {
        const Icon = agent.icon;

        return (
          <Card
            key={index}
            className={`flex flex-col h-full relative overflow-hidden transition-colors ${agent.border}`}
          >
            {/* Background Icon */}
            <div className="absolute top-2 right-2 opacity-10">
              <Icon size={80} />
            </div>

            <CardHeader>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${agent.bg}`}
              >
                <Icon className={agent.iconColor} />
              </div>

              <CardTitle>{agent.title}</CardTitle>
              <CardDescription>{agent.description}</CardDescription>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground">
              {agent.features ? (
                <ul className="space-y-2">
                  {agent.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Sparkles size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                agent.content
              )}
            </CardContent>

            <CardFooter className="mt-auto">
              {agent.buttonText === "Start Review" ? (
                <Button
                  onClick={() => {
                    location.pathname.includes("/code-review")
                      ? null
                      : navigate("/code-review");
                  }}
                  className="w-full"
                >
                  {agent.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    location.pathname.includes("/web-agent")
                      ? null
                      : navigate("/web-agent");
                  }}
                  className="w-full"
                >
                  {agent.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default AgentCards;
