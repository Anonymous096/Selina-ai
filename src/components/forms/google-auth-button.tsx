"use client";
import { Button } from "@/components/ui/button";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { onCompleteUserRegistration } from "@/actions/auth";
import Image from "next/image";

type Props = {
  mode: "sign-in" | "sign-up";
};

const GoogleAuthButton = ({ mode }: Props) => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();
  const { toast } = useToast();

  const handleGoogleAuth = async () => {
    try {
      if (mode === "sign-in") {
        const result = await signIn?.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/dashboard",
        });
      } else {
        const result = await signUp?.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/dashboard",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.errors?.[0]?.longMessage || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleGoogleAuth}
    >
      <Image
        src="/google.svg"
        alt="Google"
        width={20}
        height={20}
        className="object-contain"
      />
      Continue with Google
    </Button>
  );
};

export default GoogleAuthButton; 