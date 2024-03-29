/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const ButtonLoading = () => {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    Email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    Password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  localStorage.removeItem("token");
  localStorage.removeItem("userId");

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      // Make a POST request to the login endpoint using Axios
      const response = await axios.post(
        "https://rippleback.onrender.com/login",
        data
      );

      if (response.status === 200) {
        // If login is successful, navigate to the home page
        const { token, user } = response.data;

        // Store token and user data in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user._id);

        toast.success("Login successful");
        navigate("/");
      } else {
        // If login fails, display an error message
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-auto">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-balance text-muted-foreground">
                Login to your account
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("Email")}
                  className={` ${errors.Email && "border-red-500"}`}
                />
                {errors.Email && (
                  <p className="text-red-500 text-sm">{errors.Email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("Password")}
                  className={` ${errors.Password && "border-red-500"}`}
                />
                {errors.Password && (
                  <p className="text-red-500 text-sm">
                    {errors.Password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2"></div>
              {loading ? (
                <ButtonLoading />
              ) : (
                <Button type="submit" className="w-full">
                  Login
                </Button>
              )}
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link to="/register" className="underline">
                Register
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="https://images.unsplash.com/photo-1559056961-1f4dbbf9d36a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image"
            width="1920"
            height="1080"
            className="h-screen object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
