"use client";
import Header from "./components/Header";
import * as dimsFunctions from "./audio/setDimsValue";
import SunAwake from "./components/sunAwake";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen flex-col text-neutral-content relative">
  {/* Header */}
  <Header />
 {/* Background Wave */}
 <div className="bg-wave absolute bottom-0 w-full h-[355px]"></div>

  {/* Hero Section with Image, Text, and SunAwake Component */}
  <div className="flex flex-col items-center justify-center text-center text-white h-full">
    <Image
      src="/soundRise-scritta.svg"
      alt="SoundRise Logo"
      height={dimsFunctions.height/4}
      width={dimsFunctions.height/4}
      className="mx-auto mt-2"
    />
    <h1 className="font-extrabold mb-5 big-title leading-none tracking-tight title-settings">
      A New Sunrise for Speech Therapy:{" "}
      <span className="divisore"></span>Development of{" "}
      <span className="text-yellow-500"> SoundRise 2.0 </span> Application
    </h1>
    <p className="mb-2 leading-none tracking-tight text-small-desc">
    SoundRise is an educational application with the aim of assisting people, especially children and adolescents, in their vocal learning journey. Designed to be used as an extra support to a speech therapy pathway for young patients with hearing and communication difficulties, it combines the worlds of technology and education, with a focus on inclusivity.
              <br /><br />
              A friendly sun represents the tonal and timbral characteristics of the user's voice. When a vocal is emitted, the sun wakes up and smiles, and, based on note pitch, intensity, and timbre, changes its vertical position, size, and color, all in real time. This visual system helps to understand how one's voice works.
    </p>
    <div className="relative flex max-h-screen flex-col items-center">
    <SunAwake
      svgColor={"yellow"}
      rad={dimsFunctions.minRad * 1.5}
      yCoordinate={-10}  // Rende il sole più visibile
      heightSpaceSun={"20vh"}  // Riduce lo spazio di movimento
    />

    </div>
  </div>

 
  {/* Footer */}
  <footer className="w-full flex justify-center text-white p-3 bg-black z-10">
    <a
      href="https://www.gnu.org/licenses/gpl-3.0.txt"
      className="text-sm font-mono underline text-gray-300 hover:text-gray-400"
    >
      GNU General Public License v3.0
    </a>
  </footer>

</main>

  );
}
