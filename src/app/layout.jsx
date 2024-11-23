import "./globals.css";

// these are subdomain related stuff i am not using theme so i commented them
// import { headers } from "next/headers";
// import { getDomainFromHeaders, isValidSubdomain } from "@/lib/domains";
// import { redirect } from "next/navigation";


import "./globals.css";
import React from "react";
// import Footer from "@/components/layout/footer";

import Header from "../components/Header";


export default async function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="bg-[#1A1A1A] text-white">
        <Header />
        <div className="max-w-[700px] mx-auto p-4">

        {children}
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
