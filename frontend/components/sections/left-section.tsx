import { Typography } from "@material-tailwind/react";

export default function LeftSection({ title, des, image }) {
  return (
    <section className="py-24">
      <div className="flex flex-wrap items-center">
        <div className="mr-auto ml-auto w-full px-4 md:w-4/12">
          <img
            className="absolute -bottom-28 w-full md:top-36 md:-right-24 md:bottom-auto lg:top-24 lg:-left-52"
            src=""
            alt="tailwind_blob_purple"
          />
          <img
            className="relative mb-6 flex w-full min-w-0 flex-col break-words"
            src={`/img/${image}`}
            alt="tailwind_colors_pallet"
          />
        </div>
        <div className="relative order-first w-full px-4 md:order-last md:w-6/12">
          <div className="md:ml-7 lg:ml-24 lg:w-2/3">
            <Typography
              variant="h2"
              className="mb-2 font-black tracking-normal text-[#1A237E]"
            >
              {title}
            </Typography>
            <Typography className="text-lg text-[#1A237E]/60 lg:pr-2">
              {des}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
