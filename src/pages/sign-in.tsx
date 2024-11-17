import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignIn() {
  const { theme } = useTheme();

  return (
    <AuthLayout
      heading="Welcome back"
      subheading="May the odds be in your Favor"
      showSignUpLink
    >
      <ClerkSignIn 
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
          elements: {
            card: "shadow-none bg-transparent",
            footer: "hidden",
            formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
            formFieldInput: "bg-background border-border",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            socialButtonsIconButton: "bg-background border-border hover:bg-accent",
            socialButtonsBlockButton: "bg-background border-border hover:bg-accent",
            formFieldLabel: "text-foreground",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            otpCodeFieldInput: "bg-background border-border",
          },
          layout: {
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "iconButton",
            privacyPageUrl: "https://favor.com/privacy",
            termsPageUrl: "https://favor.com/terms",
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/app"
        afterSignInUrl="/app"
      />
    </AuthLayout>
  );
}