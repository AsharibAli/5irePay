// @material-tailwind/react components
import { Typography } from "@material-tailwind/react";

// page components
import Feature from "components/cards/feature";

export default function SectionFeatures() {
  const features = [
    {
      icon: "dashboard",
      title: "Easy",
      desc: "Login with your google account without any hassle. And transfer crypto with email address only.",
    },
    {
      icon: "speed",
      title: "Speed",
      desc: "5irePay is fast af. No waiting for long time to receive your crypto, receive in seconds.",
    },
    {
      icon: "lock",
      title: "Secure",
      desc: "Everything is written in smart contracts and runs on blockchain so no one can manipulate your transactions.",
    },
    {
      icon: "payments",
      title: "Tansfer $$ to bank (soon)",
      desc: "For transferring money to your bank account you can integrate your exchange or share you bank details.",
    },
  ];

  return (
    <section className="py-10 lg:py-20">
      <div className="mx-auto mb-24 w-full text-center md:w-3/4 lg:w-1/2">
        <Typography
          variant="h2"
          className="mb-2 font-semibold tracking-normal text-[#1A237E]"
        >
          5irePay
        </Typography>
        <Typography className="mb-2 text-lg font-light text-[#1A237E]/60">
        5irePay is a payment platform to send and receive payment across seas
          in crypto without any hassle. Users can send and receive payments with
          email address and login is also hassel free unlike other crypto
          platforms.
        </Typography>
      </div>
      <div className="flex flex-row flex-wrap content-center">
        {features.map(({ icon, title, desc }, key) => (
          <div
            key={key}
            className="mb-12 w-full max-w-full px-3 sm:w-1/2 sm:flex-none lg:mb-0 xl:mb-0 xl:w-1/4"
          >
            <Feature icon={icon} title={title}>
              {desc}
            </Feature>
          </div>
        ))}
      </div>
    </section>
  );
}
