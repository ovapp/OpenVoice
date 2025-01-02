import BlackPointImage from "@/components/visual-components/bpimage";
import BottomLetters from "@/components/visual-components/bottom-letters";
import OnboardingButtons from "@/components/auth/onboarding-buttons";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <div className="h-screen w-screen flex items-center justify">
        <div id="authform" className="px-3 space-y-3">
          <div
            id="headerWrapper"
            className="relative mb-20 bottom-60 min-[320px]:bottom-36 max-[915px]:landscape:hidden"
          >
            <div className="header scale-150" role="banner">
              <div className="items-center mx-auto text-center justify-center w-20 max-[320px]:hidden">
                <BlackPointImage />
              </div>
            </div>
          </div>

          <OnboardingButtons />
        </div>
      </div>

      <div className="relative flex w-full max-w-[32rem] flex-1 flex-col justify-center gap-y-6 lg:max-w-[50rem] bottom-16">
        <BottomLetters />
      </div>
    </div>
  );
}
