"use client";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { onCompleteUserRegistration } from "@/actions/auth";
import { useToast } from "@/components/ui/use-toast";

export default function SSOCallback() {
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isSignInLoaded || !isSignUpLoaded) return;

    const handleCallback = async () => {
      try {
        // For OAuth, we need to check the URL for the OAuth state
        const searchParams = new URLSearchParams(window.location.search);
        const strategy = searchParams.get("strategy");

        if (strategy === "oauth_google") {
          // The OAuth flow is handled by Clerk's middleware
          // We just need to check if we're in a sign-up flow
          if (signUp?.status === "complete" && signUp.createdUserId) {
            // For sign-up, we need to create the user in our database
            const registered = await onCompleteUserRegistration(
              signUp.createdSessionId || "User", // Use session ID as fallback
              signUp.createdUserId,
              "owner" // Default type for Google sign-ups
            );

            if (registered?.status === 200) {
              router.push("/dashboard");
            } else {
              toast({
                title: "Error",
                description: "Failed to complete registration",
                variant: "destructive",
              });
              router.push("/auth/sign-up");
            }
          } else {
            // For sign-in, just redirect to dashboard
            router.push("/dashboard");
          }
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.errors?.[0]?.longMessage || "Authentication failed",
          variant: "destructive",
        });
        router.push("/auth/sign-in");
      }
    };

    handleCallback();
  }, [isSignInLoaded, isSignUpLoaded, signIn, signUp, router, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
} 