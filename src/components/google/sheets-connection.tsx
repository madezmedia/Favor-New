import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleAuthButton } from "./google-auth-button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

export function SheetsConnection() {
  const { isAuthenticated } = useGoogleAuth();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Google Sheets Connection</CardTitle>
            <CardDescription>
              Connect your betting history spreadsheet
            </CardDescription>
          </div>
          {isAuthenticated ? (
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Connected
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-destructive/10 text-destructive hover:bg-destructive/20">
              <XCircle className="h-4 w-4 mr-1" />
              Not Connected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!isAuthenticated && <GoogleAuthButton />}
      </CardContent>
    </Card>
  );
}