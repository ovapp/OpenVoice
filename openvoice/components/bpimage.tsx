import Image from "next/image";
import BlackPointIcon from "@/public/BlackPoint-Black.svg";

const BlackPointImage = () => {
  return (
    <>
      {/* Lightmode */}
      <Image
        src={BlackPointIcon}
        width={124}
        height={124}
        alt="Picture of the Black Point"
      />
    </>
  );
};

export default BlackPointImage;
