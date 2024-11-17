import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { Loader2 } from "lucide-react";

export function GoogleAuthCallback() {
  const navigate = useNavigate();
  const { handleAuthSuccess } = useGoogleAuth();

  useEffect(() => {
    const handleCallback = async () => {
      // Get access token from URL hash
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");

      if (accessToken) {
        const success = await handleAuthSuccess(accessToken);
        if (success) {
          // Notify the opener window
          window.opener?.postMessage(
            { type: "GOOGLE_AUTH_SUCCESS" },
            window.location.origin
          );
        }
      }

      // Close the popup after processing
      window.close();
    };

    handleCallback();
  }, [handleAuthSuccess, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  );
}