"use client";
import { useEffect, useState } from "react"; // Added useState and useEffect
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useEmployeesServices";
import { Login } from "../types/employee";
import BitePointLogo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ADMIN_REDIRECT_LINK, CASHIER_REDIRECT_LINK, KITCHEN_REDIRECT_LINK, WAITER_REDIRECT_LINK } from "@/constants/redirectUrls";


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const { mutate, isPending } = useLogin(); // Removed unused `data`
  const router = useRouter();
  const [isLoginSuccess, setIsLoginSuccess] = useState(false); // New state for login success

  const onSubmit = (form: { email: string; password: string }) => {
    mutate(form, {
      onSuccess: ({ role }) => {
        setIsLoginSuccess(true); // Set success state to show loader
        toast.success("✅ Login successful");
        // Small delay to ensure session is properly set
        setTimeout(() => {
          switch (role) {
            case "admin":
              router.push(ADMIN_REDIRECT_LINK);
              break;
            case "cashier":
              router.push(CASHIER_REDIRECT_LINK);
              break;
            case "cook":
            case "chef":
              router.push(KITCHEN_REDIRECT_LINK);
              break;
            case "waiter":
              router.push(WAITER_REDIRECT_LINK);
              break;
            default:
              router.push("/unauthorized");
          }
        }, 100);
      },
      onError: (error) => {
        toast.error(`❌ ${error.message}`);
      },
    });
  };

  // Optional: Reset success state if navigation fails or user returns
  useEffect(() => {
    return () => {
      setIsLoginSuccess(false); // Cleanup on unmount
    };
  }, []);

  // Show loader on successful login
  if (isLoginSuccess) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-red-50 px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-red-50 px-4">
      <div className="bg-blue-50 w-full max-w-sm rounded-xl shadow-md p-6 border border-blue-200">
        <div className="flex flex-col items-center mb-5">
          <BitePointLogo />
          <h1 className="text-xl font-semibold mt-3 text-blue-800">
            Welcome Back
          </h1>
          <p className="text-xs text-gray-600 text-center">
            Please sign in to continue
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message as string}
          />
          <Input
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={errors.password?.message as string}
          />
          <button
            disabled={isPending}
            type="submit"
            className={`w-full h-11 cursor-pointer rounded-lg font-medium shadow-sm text-[15px] transition-all duration-200 ${
              isPending
                ? "bg-gray-300 text-gray-100 cursor-not-allowed"
                : "bg-blue-600 text-white active:scale-95 hover:bg-blue-700"
            }`}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-[10px] text-center text-gray-500 mt-5">
          &copy; {new Date().getFullYear()} CRAVINGS
        </p>
      </div>
    </div>
  );
}