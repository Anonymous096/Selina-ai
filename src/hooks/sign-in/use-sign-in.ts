import { useToast } from "@/components/ui/use-toast";
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const result = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          toast({
            title: "Success",
            description: "Welcome back!",
          });
          router.push("/dashboard");
        } else {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
          });
        }
      } catch (error: any) {
        console.error("Sign in error:", error);
        setLoading(false);
        if (error.errors?.[0]?.code === "form_password_incorrect") {
          toast({
            title: "Error",
            description: "Email/password is incorrect. Please try again.",
          });
        } else if (error.errors?.[0]?.code === "form_identifier_not_found") {
          toast({
            title: "Error",
            description:
              "No account found with this email. Please sign up first.",
          });
        } else {
          toast({
            title: "Error",
            description: "An error occurred. Please try again.",
          });
        }
      } finally {
        setLoading(false);
      }
    }
  );

  return {
    methods,
    onHandleSubmit,
    loading,
  };
};
