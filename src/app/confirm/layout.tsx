import type { Metadata } from "next";
import Header from "../components/Header";
// import { layout } from "./confirm";

export const metadata: Metadata = {
  title: "Step-Up",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="desktop-width">
      <Header />
      <div className="py-8 px-5">{children}</div>
    </div>
  );
}
