"use client";

import React, { useContext } from "react";
import Input from "components/Input";
import { Button } from "components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSigninMutation } from "@/hooks/user-hooks";
import { Store } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Box, LinearProgress } from "@mui/material";
import { Toaster } from "components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import Link from "next/link";
import RootNav from "components/RootNav";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const { mutateAsync: signin, isPending } = useSigninMutation();
  const { dispatch } = useContext(Store);
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );

  React.useEffect(() => {
    const error = searchParams.get("error");
    if (error === "authentication_failed") {
      toast({
        title: "Authentication failed. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast, searchParams]);

  const formDataHandle: SubmitHandler<FormData> = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await signin(data);
      dispatch({ type: "sign-in", payload: res.user });
      localStorage.setItem("user-token", res.token);
      localStorage.setItem("user-info", JSON.stringify(res.user));

      // Redirect back to the original path or to home if no redirect path is set
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      localStorage.removeItem("redirectPath"); // Clean up the redirect path
      router.push(redirectPath);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast({
        title: err.response?.data.message,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                create a new account
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit(formDataHandle)}
            className="mt-8 space-y-6"
          >
            <div className="rounded-md space-y-4">
              <Input
                {...register("email")}
                type="email"
                placeholder="Email address"
                className="text-base w-full"
              />
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="text-base w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                disabled={isPending}
              >
                {isPending ? "Signing in..." : "Sign in"}
              </Button>

              {isPending && (
                <Box sx={{ width: "100%", mt: 2 }}>
                  <LinearProgress />
                </Box>
              )}
            </div>
          </form>
        </div>
        <Toaster />
      </div>
    </>
  );
}
