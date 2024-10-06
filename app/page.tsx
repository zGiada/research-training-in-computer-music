"use client";
import Header from "./components/Header";

import * as dimsFunctions from "./audio/setDimsValue";
import Sun from "./components/Sun";
import SunSleep from "./components/sunSleep";
import sunAwake from "./components/sunAwake";
import Button from "./components/Button";

import Image from "next/image";
import Link from "next/link";
import SunAwake from "./components/sunAwake";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const widthSun = Math.round((dimsFunctions.width * 25) / 100);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center text-neutral-content">
      <Header />

      <div className="hero min-h-screen min-w-screen">
        <div className="hero-content text-center text-white">
          <div className="max-w-full">
            <h1 className="font-extrabold mb-5 leading-none tracking-tight text-3xl title-settings">
              A New Sunrise for Speech Therapy: Development of{" "}
              <span className="text-yellow-500"> SoundRise 2.0 </span>
              Application
            </h1>
            <p className="mb-10 leading-none tracking-tight text-small-desc text-lg">
              SoundRise &eacute; un&apos;applicazione educativa con lo scopo di
              aiutare persone, in particolar modo bambini e adolescenti, nel
              loro percorso di apprendimento vocale. Pensata per essere
              utilizzata come supporto aggiuntivo a un percorso di logopedia per
              giovani pazienti con difficolt&agrave; uditive e di comunicazione,
              unisce il mondo della tecnologia ed educazione, con un occhio di
              riguardo all&apos;inclusivit&agrave;.
              <br />
              <br />
              Un simpatico sole rappresenta le caratteristiche tonali e
              timbriche della voce dell&apos;utente. Quando viene emesso un
              vocalizzo, il sole si sveglia e sorride, e, in base
              all&apos;altezza della nota, all&apos;intensit&agrave; e al
              timbro, cambia la sua posizione verticale, la sua dimensione e il
              suo colore, tutto in tempo reale. Questo sistema visivo aiuta a
              comprendere come funziona la propria voce.
            </p>
            <h2 className="btn-prova">
              PROVALA ANCHE TU! <br />
              Dal men&ugrave; in alto a destra{" "}
              <span className="inline align-middle mx-1 md:hidden">
                (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="little-menu h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                )
              </span>
              Clicca &ldquo;RUN APP&rdquo;
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-wave fixed bottom-10 flex inset-x-0 min-h-[30vh] text-white p-2"></div>

      <div className="hero min-h-screen min-w-screen">
        <Image
          src="/soundRise-scritta.svg"
          alt="Your image"
          width={widthSun}
          height={widthSun}
        />

        <SunAwake
          svgColor={"yellow"}
          rad={dimsFunctions.minRad * 1.5}
          yCoordinate={
            (dimsFunctions.height -
              Math.round((dimsFunctions.height * 55) / 100)) /
            2
          }
          heightSpaceSun={"90vh"}
        />
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
