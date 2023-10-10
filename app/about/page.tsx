"use client";
import Header from "../components/Header";
import Button from "../components/Button";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Header />
      <div className="flex p-6 bg-base-100 fixed inset-x-0 bottom-0"></div>
    </main>
  );
}
