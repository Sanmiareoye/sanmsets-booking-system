import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import styles from "./auth.module.css";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Oops! something went wrong, try again :/.",
        variant: "destructive",
      });
    } else {
      router.push("/bookings");
      router.refresh();
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.authTitle}>Sign In</h1>
        <p className={styles.authSubtitle}>
          Welcome back! Login to make a booking 💕
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.authForm}
        >
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email</label>
            <input
              {...form.register("email")}
              type="email"
              className={styles.inputField}
            />
            {form.formState.errors.email && (
              <span className={styles.errorText}>
                {form.formState.errors.email.message}
              </span>
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
              <span className={styles.errorText}>
                {form.formState.errors.password.message}
              </span>
            )}
          </div>

          <button type="submit" className={styles.authButton}>
            Sign In
          </button>
        </form>

        <p className={styles.authFooter}>
          Don&apos;t have an account?{" "}
          <a href="/register" className={styles.authLink}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
