import  TwoFactorForm  from "@/components/auth/two-factor-form";

export default function TwoFactorPage(){
    return (
        <>
        <h3 className="text-[28px] justify-center items-center flex mt-[8px]">Enter your code</h3>
        <TwoFactorForm />
        </>
    )
}
