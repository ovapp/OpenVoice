import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import  { titleFont }  from "@/fonts/fonts";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <>
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-white drop-shadow-md",
          titleFont.className
          )}>OpenVoice</h1>
        <p className={cn(
          "text-white text-lg",
          )}>An open-source social media alternative</p>
          <div>
          <LoginButton>
          <Button variant="secondary" size="lg">
          <b>Sign In</b>
          </Button>
          </LoginButton>
          </div>
      </div>
    </main>
    </>
  );
}
