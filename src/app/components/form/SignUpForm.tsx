import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import styles from "./auth.module.css";
import GoogleSignInButton from "../GoogleSignInButton";
import { Button } from "@/components/ui/button";

const FormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100)
      .refine((val) => val.trim().split(" ").filter(Boolean).length >= 2, {
        message: "Please enter your first and last name",
      }),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(8, "Password must have at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      toast({
        title: "Error",
        description: "Oops! something went wrong, try again :/.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.authTitle}>Create Account</h1>
        <p className={styles.authSubtitle}>
          Register to make a booking today 💕
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.authForm}
        >
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Name</label>
            <input
              {...form.register("name")}
              type="text"
              className={styles.inputField}
            />
            {form.formState.errors.name && (
              <p className={styles.errorText}>
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email</label>
            <input
              {...form.register("email")}
              type="email"
              className={styles.inputField}
            />
            {form.formState.errors.email && (
              <p className={styles.errorText}>
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>
            <input
              {...form.register("password")}
              type="password"
              className={styles.inputField}
            />
            {form.formState.errors.password && (
              <p className={styles.errorText}>
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Confirm Password</label>
            <input
              {...form.register("confirmPassword")}
              type="password"
              className={styles.inputField}
            />
            {form.formState.errors.confirmPassword && (
              <p className={styles.errorText}>
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className={`${styles.authButton} mt-4`}>
            Register
          </Button>
        </form>

        <div
          className="mx-auto my-6 flex w-full items-center justify-center 
            before:mr-4 before:block before:h-px before:flex-grow before:bg-[var(--secondary-color)] 
            after:ml-4 after:block after:h-px after:flex-grow after:bg-[var(--secondary-color)]"
        >
          or
        </div>
        <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
        <p className={styles.authFooter}>
          Already have an account?{" "}
          <a href="/login" className={styles.authLink}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
