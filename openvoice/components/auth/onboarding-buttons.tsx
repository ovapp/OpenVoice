import { inter, sourceSerif4 } from "@/components/ui/fonts";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { cn } from "@/lib/utils";

const OnboardingButtons = () => {
  return (
    <div
      id="authFormHeader"
      className="relative p-0 bottom-56 min-[320px]:bottom-32 max-[915px]:landscape:bottom-16"
    >
      {/* Name */}
      <h1 id="authHeaderTop" className={cn("mb-2 scale-150", inter.className)}>
        OpenVoice
      </h1>

      {/* Slogan */}
      <h1
        id="authHeaderBottom"
        className={cn("scale-90", sourceSerif4.className)}
      >
        Giving voice for the people.
      </h1>

      <div className="relative top-24 min-[320px]:top-12">
        <LoginButton>
          <Button
            variant="default"
            id="buttonFont"
            className={cn(
              "w-[280px] h-[43px] px-20 py-13 mt-5 rounded-xl gap-8",
              inter.className
            )}
          >
            Create an Account
          </Button>
        </LoginButton>
        <LoginButton>
          <Button
            variant="default"
            id="buttonFontSecondary"
            className={cn(
              "w-[280px] h-[43px] px-20 py-13 mt-5 rounded-xl gap-8",
              inter.className
            )}
          >
            Sign In
          </Button>
        </LoginButton>
      </div>
    </div>
  );
};

export default OnboardingButtons;
