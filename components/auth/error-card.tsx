import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return (
        <CardWrapper 
        headerLabel="Ow snap! Something went wrong..."
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
        >
            <div className="w-full items-center flex justify-center ">
            <ExclamationTriangleIcon className="text-destructive"/>
            </div>
        </CardWrapper>
    );
};