"use client";
import Header from "./components/Header";
import Sun from "./components/Sun";
import SunSleep from "./components/sunSleep";
import sunAwake from "./components/sunAwake";
import Button from "./components/Button";

import Image from "next/image";
import SunAwake from "./components/sunAwake";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center text-neutral-content">
      <Header />

      <div className="hero min-h-screen min-w-screen">
        <div className="hero-content text-center text-white">
          <div className="absolute bg-wave flex inset-x-0 bottom-0 min-h-[28vh] text-white p-2"></div>

          <div className="max-w-6xl">
            <Image
              src="/soundRise-scritta.svg"
              alt="Your image"
              width={200}
              height={100}
              style={{ margin: "0 auto" }}
            />
            <h1 className="font-extrabold leading-none tracking-tight text-3xl sm:text-md md:text-3xl lg:text-4xl xl:text-5xl">
              A New Sunrise for Speech Therapy: <br />
              Development of SoundRise 2.0 Application
            </h1>
            <p className="py-6 px-10">
              SoundRise 2.0 is an application developed in <b>React</b>,
              designed to help individuals with{" "}
              <b>communication difficulties</b>, in particular children. <br />
              The application features an intuitive and inclusive interface that
              allows the user to practise speech therapy voice exercises
              independently: a sun symbolising the user's voice, which is
              animated according to the tonal and timbral features of the voice
              itself.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
