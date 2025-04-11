import { Button } from "@/components/ui/button";
import { RiGoogleFill } from "react-icons/ri";
import styles from "./form/auth.module.css";

interface GoogleSignInButtonProps {
  children: React.ReactNode;
}
const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  children,
}) => {
  const loginWithGoogle = () => console.log("login With Google");
  return (
    <>
      <Button onClick={loginWithGoogle} className={styles.authButton}>
        <RiGoogleFill />
        {children}
      </Button>
    </>
  );
};

export default GoogleSignInButton;
