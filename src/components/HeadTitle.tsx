import { HeadTitleProps } from "../types/Types";

export const HeadTitle = ({ title }: HeadTitleProps) => {
  return (
    <div className="text-5xl text-center text-violet-600 font-black p-7 mb-10 max-md:text-4xl">
      {title}
    </div>
  );
};
