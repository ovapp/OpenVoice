import { titleFont } from "@/fonts/fonts";
import { cn } from "@/lib/utils";

interface HeaderProps {
    label: string;
}

export const Header = ({
    label
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn(
                "text-3xl font-semibold",
                titleFont.className,
            )}>
                OpenVoice
            </h1>
            <p className="text-muted-foreground text-sm">
                <b>{label}</b>
            </p>
        </div>
    );
}