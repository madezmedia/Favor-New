import { Button } from "@/components/ui/button";
import { getAuthUrl } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

export function GoogleAuthButton() {
  const { toast } = useToast();

  const handleAuth = async () => {
    try {
      const authUrl = getAuthUrl();
      // Open Google OAuth consent screen in a popup
      const popup = window.open(
        authUrl,
        "Google Auth",
        "width=600,height=600,left=400,top=100"
      );

      // Listen for the OAuth callback
      window.addEventListener("message", async (event) => {
        if (event.origin !== window.location.origin) return;
        if (event.data?.type === "GOOGLE_AUTH_SUCCESS") {
          popup?.close();
          toast({
            title: "Successfully connected to Google Sheets",
            description: "Your betting data will now be synchronized.",
          });
        }
      });
    } catch (error) {
      console.error("Google auth error:", error);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Failed to connect to Google Sheets. Please try again.",
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      className="w-full" 
      onClick={handleAuth}
    >
      <svg
        className="mr-2 h-4 w-4"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      Connect Google Sheets
    </Button>
  );
}