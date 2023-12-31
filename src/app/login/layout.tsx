import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Step-Up",
  description: "Generated by create next app",
};

export default function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen flex-center">{children}</div>;
}
