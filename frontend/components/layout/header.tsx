import Image from "next/image";
import Link from "next/link";

import { Typography, Button } from "@material-tailwind/react";

export default function Header() {
  return (
    <div className="h-screen min-h-screen bg-[url('/img/bg-header.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="relative z-50 h-fit py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="mt-48 w-full px-4 md:w-8/12 lg:mt-4 lg:w-5/12">
              <div className="w-full max-w-full sm:my-auto md:w-5/6 md:flex-none lg:w-1/2"></div>
              <Typography
                variant="h1"
                className="mb-2 font-black tracking-normal text-[#1A237E]"
              >
                5irePay - The PayPal for crypto
              </Typography>
              <Typography className="mb-6 text-lg font-light text-[#1A237E] lg:pr-12">
                Send and receive payments internationally in seconds with your
                email address only.
              </Typography>
              <div className="flex flex-col-reverse gap-2 lg:flex-row">
                <Link href="/login">
                  <a>
                    <Button variant="gradient" className="h-full w-full">
                      Login
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden w-full max-w-full px-4 pl-40 pt-24 md:w-7/12 md:pt-0 lg:block">
              <Image
                src="/img/international.png"
                alt="components"
                width={500}
                height={500}
                quality={100}
                className="aspect-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
