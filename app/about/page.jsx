"use client";
import Header from "../components/Header";
import SunSleep from "../components/sunSleep";
import SunAwake from "../components/sunAwake";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center text-neutral-content overflow-y-auto">
  {/* Header */}
      <Header />

      {/* Hero Section with Title and Content */}
      <div className="card-container flex flex-col items-center justify-center text-center text-white h-full">
        <h1 className="font-extrabold mt-10 mb-5 big-title leading-none tracking-tight title-settings">
          About
        </h1>
        <p className="mt-10 mb-3 mx-auto max-w-[80%] leading-none tracking-tight text-small-desc">
          Depending on some characteristics of the voice captured by the
          microphone, the sun will change.
        </p>
        <p className="mb-10 mx-auto max-w-[80%] leading-none tracking-tight text-small-desc">
          But, <b>how does it do?</b> Let's see it together!
        </p>

        {/* Card Section */}
        <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 max-w-[80%]">
          <div className="card bg-gradient-card border-solid border-[2px] border-light-blue-500 text-sky-50">
            <div className="card-body">
              <h2 className="card-title">The sun is <b>asleep</b></h2>
              <p>when the microphone does not recognize any voice sound.</p>
              <SunSleep svgColor={"yellow"} rad={25} yCoordinate={-10} heightSpaceSun={"12vh"} />
            </div>
          </div>
          <div className="card bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">The sun is <b>awake</b></h2>
              <p>when the microphone captures the sound of a voice.</p>
              <SunAwake svgColor={"yellow"} rad={25} yCoordinate={-10} heightSpaceSun={"12vh"} />
            </div>
          </div>
        </div>
        <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 max-w-[80%]">
          <div className="card bg-gradient-card border-solid border-[2px] border-light-blue-500 text-sky-50 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">The sun is <b>gets smaller</b></h2>
              <p>as the sound becomes softer</p>
              <SunAwake svgColor={"yellow"} rad={15} yCoordinate={-10} heightSpaceSun={"18vh"}/>
            </div>
          </div>
          <div className="card bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
          <div className="card-body">
              <h2 className="card-title">The sun is <b>gets bigger</b></h2>
              <p>as the sound becomes louder</p>
              <SunAwake svgColor={"yellow"} rad={40} yCoordinate={-10} heightSpaceSun={"18vh"}/>
            </div>
          </div>
        </div>

        <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 max-w-[80%]">
  <div>
    <div className="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Sun is <b>red</b>
        </h2>
        <p>
          if the sound of the <b>vowel A</b> is recognized
        </p>
      </div>
      <SunAwake
        svgColor={"red"}
        rad={25}
        yCoordinate={-10}
        heightSpaceSun={"12vh"}
      />
    </div>
  </div>
  <div>
    <div className="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
        Sun is <b>green</b>
        </h2>
        <p>
          if the sound of the <b>vowel E</b> is recognized
        </p>
      </div>
      <SunAwake
        svgColor={"#4CC94C"}
        rad={25}
        yCoordinate={-10}
        heightSpaceSun={"12vh"}
      />
    </div>
  </div>
  <div>
    <div className="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
        Sun is <b>blue</b>
        </h2>
        <p>
          if the sound of the <b>vowel I</b> is recognized
        </p>
      </div>
      <SunAwake
        svgColor={"blue"}
        rad={25}
        yCoordinate={-10}
        heightSpaceSun={"12vh"}
      />
    </div>
  </div>
  <div>
    <div className="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
        Sun is <b>orange</b>
        </h2>
        <p>
          if the sound of the <b>vowel O</b> is recognized
        </p>
      </div>
      <SunAwake
        svgColor={"orange"}
        rad={25}
        yCoordinate={-10}
        heightSpaceSun={"12vh"}
      />
    </div>
  </div>
  <div>
    <div className="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
        Sun is <b>gray</b>
        </h2>
        <p>
          if the sound of the <b>vowel U</b> is recognized
        </p>
      </div>
      <SunAwake
        svgColor={"#C0C0C0"}
        rad={25}
        yCoordinate={-10}
        heightSpaceSun={"12vh"}
      />
    </div>
  </div>
</div>


      </div>

      {/* Background Wave */}
      <div className="bg-wave relative bottom-0 w-full h-[200px]"></div>

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
