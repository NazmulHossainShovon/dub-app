"use client";

import { useContext } from "react";
import Input from "components/Input";
import { Button } from "components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignupMutation } from "@/hooks/user-hooks";
import { Store } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Box, LinearProgress } from "@mui/material";
import { z } from "zod";
import FormErrorMessage from "components/FormErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

import { uploadToS3 } from "utils/uploadToS3";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
  image: z
    .any()
    .refine(
      (files) => files?.[0] === undefined || files?.[0].size <= 512000,
      "Max image size is 500KB."
    ),
});

type SignupFields = z.infer<typeof signupSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
  });
  const { mutateAsync: signup, isPending } = useSignupMutation();
  const { dispatch } = useContext(Store);
  const router = useRouter();
  const { toast } = useToast();

  const formDataHandle: SubmitHandler<SignupFields> = async (
    data: SignupFields
  ) => {
    const imageFile = data.image?.[0];
    let imageUrl = "";
    if (imageFile) {
      const result = await uploadToS3(imageFile, data.name);
      imageUrl = result.imageUrl;
    }
    const res = await signup({
      name: data.name,
      email: data.email,
      password: data.password,
      image: imageUrl,
    });
    dispatch({ type: "sign-in", payload: res.user });
    localStorage.setItem("user-token", res.token);
    localStorage.setItem("user-info", JSON.stringify(res.user));

    // Redirect back to the original path or to home if no redirect path is set
    const redirectPath = localStorage.getItem("redirectPath") || "/";
    localStorage.removeItem("redirectPath"); // Clean up the redirect path
    router.push(redirectPath);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                sign in to your account
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit(formDataHandle)}
            className="mt-8 space-y-6"
          >
            <div className="rounded-md space-y-4">
              <Input
                {...register("name")}
                type="text"
                placeholder="Full name"
                className="text-base w-full"
              />
              {errors?.name?.message && (
                <FormErrorMessage message={errors.name.message} />
              )}
              <Input
                {...register("email")}
                type="email"
                placeholder="Email address"
                className="text-base w-full"
              />
              {errors?.email?.message && (
                <FormErrorMessage message={errors.email.message} />
              )}
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="text-base w-full"
                autoComplete="new-password"
              />
              {errors?.password?.message && (
                <FormErrorMessage message={errors.password.message} />
              )}
              <div className="flex flex-col gap-1">
                <label htmlFor="image" className="text-sm text-gray-700">
                  Profile Image
                </label>
                <input
                  id="image"
                  {...register("image")}
                  type="file"
                  className="text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {errors?.image?.message && (
                  <FormErrorMessage message={errors.image.message as string} />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                disabled={isPending}
              >
                {isPending ? "Creating account..." : "Sign up"}
              </Button>

              {isPending && (
                <Box sx={{ width: "100%", mt: 2 }}>
                  <LinearProgress />
                </Box>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
