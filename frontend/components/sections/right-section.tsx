import { Typography } from "@material-tailwind/react";

export default function RightSection({ title, des, image }) {
  return (
    <section className="py-12">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 md:w-5/12">
          <Typography
            variant="h2"
            className="mb-2 font-black tracking-normal text-[#1A237E]"
          >
            {title}
          </Typography>
          <Typography className="mb-5 text-lg text-[#1A237E]/60 md:pr-10">
            {des}
          </Typography>
        </div>
        <div className="relative w-full px-4 pt-10 md:w-6/12 md:pt-0">
          <img
            className="absolute -bottom-16 w-full md:bottom-auto md:top-24 md:-right-5 lg:top-10 lg:-right-40"
            src="/img/blue.png"
            alt="tailwind_blob_blue"
          />
          <img
            className="relative mb-6 flex w-full min-w-0 flex-col break-words"
            src={`/img/${image}`}
            alt="tailwind_shadows"
          />
        </div>
      </div>
    </section>
  );
}
