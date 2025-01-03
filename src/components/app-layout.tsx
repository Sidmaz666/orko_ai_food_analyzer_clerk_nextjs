"use client"

import { ReactNode } from "react";
import {AuthorizedLayout} from "@/components/authorized-layout";
import {UnauthorizedLayout} from "@/components/unauthorized-layout";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AuthorizedLayout>{children}</AuthorizedLayout>
      <UnauthorizedLayout>{children}</UnauthorizedLayout>
    </div>
  );
}

