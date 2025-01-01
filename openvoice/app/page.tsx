import BlackPointImage from "@/components/bpimage";
import { inter, sourceSerif4 } from "@/app/layout";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <div className="h-screen w-screen flex items-center justify">
        <div id="authform" className="px-3 space-y-3">
          {/* Logo */}
          <div
            id="headerWrapper"
            className="relative mb-20 bottom-60 min-[320px]:bottom-36"
          >
            <div className="header scale-150" role="banner">
              <div className="items-center mx-auto text-center justify-center w-20 max-[320px]:hidden">
                <BlackPointImage />
              </div>
            </div>
          </div>

          <div
            id="authFormHeader"
            className="relative p-0 bottom-56 min-[320px]:bottom-32"
          >
            {/* Name */}
            <h1
              id="authHeaderTop"
              className={cn("mb-2 scale-150", inter.className)}
            >
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
        </div>
      </div>

      <div className="relative flex w-full max-w-[32rem] flex-1 flex-col justify-center gap-y-6 lg:max-w-[50rem] bottom-16">
        <footer className="flex justify-between">
          <p id="ovapp" className="relative">
            © 2025 ovapp
          </p>
          <ul id="list" className="flex gap-2" role="list">
            <li className="flex items-center gap-2 after:size-[1.5px] after:rounded-full after:bg-gray-1100 last:after:hidden">
              <a className="relative rounded-sm text-gray-1000 hover:text-gray-1100 after:absolute after:-inset-x-1.5 after:-inset-y-0.5 after:rounded-sm after:border-2 after:border-blue-500 after:opacity-0 focus-visible:after:opacity-100">
                Sobre
              </a>
            </li>
            <li className="flex items-center gap-2 after:size-[1.5px] after:rounded-full after:bg-gray-1100 last:after:hidden">
              <a className="relative rounded-sm text-gray-1000 hover:text-gray-1100 after:absolute after:-inset-x-1.5 after:-inset-y-0.5 after:rounded-sm after:border-2 after:border-blue-500 after:opacity-0 focus-visible:after:opacity-100">
                GitHub
              </a>
            </li>
            <li className="flex items-center gap-2 after:size-[1.5px] after:rounded-full after:bg-gray-1100 last:after:hidden">
              <a className="relative rounded-sm text-gray-1000 hover:text-gray-1100 after:absolute after:-inset-x-1.5 after:-inset-y-0.5 after:rounded-sm after:border-2 after:border-blue-500 after:opacity-0 focus-visible:after:opacity-100">
                Docs
              </a>
            </li>
            <li className="flex items-center gap-2 after:size-[1.5px] after:rounded-full after:bg-gray-1100 last:after:hidden">
              <Select>
                <SelectTrigger className="relative rounded-xl text-gray-1000 hover:text-gray-1100 after:absolute after:-inset-x-1.5 after:-inset-y-0.5 after:rounded-sm after:border-2 after:border-blue-500 after:opacity-0 focus-visible:after:opacity-100 w-[85px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent id="languageSelect" className="rounded-xl">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Espanõl</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
