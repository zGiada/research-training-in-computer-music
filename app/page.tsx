"use client";
import Header from "./components/Header";

import * as dimsFunctions from "./audio/setDimsValue";
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
          <div className="max-w-full">
            <h1 className="font-extrabold mb-10 leading-none tracking-tight text-3xl sm:text-md md:text-3xl lg:text-4xl xl:text-5xl">
              A New Sunrise for Speech Therapy: <br />
              Development of SoundRise 2.0 Application
            </h1>
            <Image
              src="/soundRise-scritta.svg"
              alt="Your image"
              width={350}
              height={100}
              style={{ margin: "0 auto" }}
            />
          </div>
        </div>
      </div>

      <div className="bg-wave fixed bottom-10 flex inset-x-0 min-h-[30vh] text-white p-2"></div>

      <div className="hero min-h-screen min-w-screen">
        <SunAwake
          svgColor={"yellow"}
          rad={dimsFunctions.minRad}
          yCoordinate={
            (dimsFunctions.height -
              Math.round((dimsFunctions.height * 45) / 100)) /
            2
          }
          heightSpaceSun={"90vh"}
        />
        <div className="hero-content text-justify text-white">
          <div className="flex justify-center max-w-full">
            <p className="mb-20 max-w-[70%] leading-none tracking-tight text-xl">
              SoundRise 2.0 is an application developed in <b>React</b>,
              designed to help individuals with{" "}
              <b>communication difficulties</b>, in particular children. <br />
              The application features an intuitive and inclusive interface that
              allows the user to practise speech therapy voice exercises
              independently: a sun symbolising the voice of the user, which is
              animated according to the tonal and timbral features of the voice
              itself.
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-[7vh] p-6 bg-base-100 fixed inset-x-0 bottom-0">
        <footer className="w-full flex text-white p-3 bg-transparent fixed inset-x-0 bottom-0">
          <a
            href="https://www.gnu.org/licenses/gpl-3.0.txt"
            className="text-sm font-mono underline text-gray-300 hover:text-gray-400"
          >
            GNU General Public License v3.0
          </a>
        </footer>
      </div>
    </main>
  );
}
