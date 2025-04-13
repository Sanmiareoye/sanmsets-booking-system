import { Button } from "@/components/ui/button";
import { RiGoogleFill } from "react-icons/ri";
import styles from "./form/auth.module.css";
import { signIn } from "next-auth/react";
import { boolean } from "zod";
import { useState } from "react";

interface GoogleSignInButtonProps {
  children: React.ReactNode;
}
const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google", {
        callbackUrl: "https://www.sanmsets.com/bookings",
      });
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        disabled={isLoading}
        onClick={loginWithGoogle}
        className={`${styles.authButton}`}
      >
        {isLoading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 mr-2 animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <RiGoogleFill className="h-4 w-4 mr-2" />
        )}

        {children}
      </Button>
    </>
  );
};

export default GoogleSignInButton;
