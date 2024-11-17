import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { AlertCircle } from 'lucide-react';

interface ErrorCardProps {
  title?: string;
  description?: string;
}

export function ErrorCard({ 
  title = 'Error', 
  description = 'An error occurred while fetching data. Please try again later.' 
}: ErrorCardProps) {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-4 w-4" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <button 
          onClick={() => window.location.reload()}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Click here to refresh the page
        </button>
      </CardContent>
    </Card>
  );
}