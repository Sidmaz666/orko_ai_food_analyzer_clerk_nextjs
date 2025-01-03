import { ReactNode } from "react";
import { SignedOut as Unauthenticated } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import { Stars } from "lucide-react";

export function UnauthorizedLayout({ children }: { children: ReactNode }) {
  return (
    <Unauthenticated>
      <div
        style={{
          backgroundImage: `url("/grid.svg")`,
        }}
        className="flex flex-col md:flex-row min-h-screen pt-9 md:pt-0 space-y-2 md:space-y-0 w-full relative overflow-y-auto h-screen"
      >
        <div className="flex justify-center items-center w-full px-6 pt-3 md:pt-0 md:px-0 md:-translate-y-10">
          <div className="max-w-md flex flex-col">
            <Image
              src="/illustration.svg"
              width={300}
              height={300}
	      className="size-[150px] md:size-[300px]"
              alt="illustration"
            />
            <h1 className="text-5xl font-bold tracking-tighter font-mono text-left w-full hidden md:block">
              OrkoAI
            </h1>
            <p className="max-w-md mt-6 mb-2 md:mb-0 hidden md:block">
	    Effortlessly track your meals, monitor macros, and get personalized AI insights to optimize your diet and reach your goals faster.
            </p>
          </div>
        </div>
        <div className="w-full h-full flex justify-center items-baseline md:items-center md:min-h-screen md:pb-0 md:pt-0 pt-2 pb-4 backdrop-blur-[5px]">
          {children}
        </div>
        <ThemeToggle className="absolute top-4 right-4" />
      </div>
    </Unauthenticated>
  );
}
