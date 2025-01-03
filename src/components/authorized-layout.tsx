import { ReactNode, useEffect, useState, useRef } from "react";
import { SignedIn as Authenticated } from '@clerk/nextjs'


export function AuthorizedLayout({ children }: { children: ReactNode }) {
  return (
    <Authenticated>
      <div className="flex flex-col">
	        {children}
      </div>
    </Authenticated>
  );
}
