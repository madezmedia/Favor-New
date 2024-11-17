import { useAgentAnalysis } from '@/hooks/useAgents';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';

interface AgentAnalysisProps {
  agentId: string;
}

export function AgentAnalysis({ agentId }: AgentAnalysisProps) {
  const { data: analysis, isLoading, error } = useAgentAnalysis(agentId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[200px] text-destructive gap-2">
        <AlertTriangle className="h-5 w-5" />
        <span>Failed to load analysis</span>
      </div>
    );
  }

  if (!analysis?.length) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground">
        No analysis available
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {analysis.map((item, index) => (
          <Card key={index} className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="capitalize">
                  {item.type}
                </Badge>
                <div className="flex items-center gap-2">
                  {item.confidence >= 0.7 ? (
                    <Badge variant="default" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      High Confidence
                    </Badge>
                  ) : item.confidence >= 0.4 ? (
                    <Badge variant="secondary" className="gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Medium Confidence
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Low Confidence
                    </Badge>
                  )}
                  {item.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-primary" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                </div>
              </div>
              <p className="text-sm">{item.analysis}</p>
              {item.recommendations && (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-sm font-medium mb-1">Recommendations:</p>
                  <ul className="text-sm space-y-1">
                    {item.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}