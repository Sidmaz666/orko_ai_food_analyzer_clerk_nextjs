import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <span className="text-2xl md:text-3xl tracking-tight font-mono font-semibold pl-8">
        Create OrkoAI Account
      </span>
      <SignUp
        path="/auth/sign-up"
        appearance={{
          elements: {
            rootBox: "border-none bg-transparent border-0 shadow-none",
            signInRoot: "border-none bg-transparent border-0 shadow-none",
            cardBox: "border-none bg-transparent border-0 shadow-none",
            card: "border-none bg-transparent border-0 shadow-none",
            footer: "border-none bg-transparent border-0 bg-none shadow-none",
            dividerLine: "bg-foreground/20",
            footerAction:
              "border-none bg-transparent bg-none border-0 shadow-none text-muted-foreground",
            footerActionLink: "text-foreground underline hover:text-blue-500",
            header: "hidden",
            input: "bg-transparent",
            formFieldLabel: "text-muted-foreground",
            formFieldInput:
              "bg-transparent hover:border-foreground focus:border-foreground [border-width:1px_!important] border-muted-foreground/80 rounded-md placeholder:text-muted-foreground/80",
            socialButtons: "border border-muted-foreground rounded-md",
            socialButtonsBlockButtonText: "text-foreground",
          },
          layout: {
            socialButtonsPlacement: "bottom",
          },
        }}
      />
    </div>
  );
}
