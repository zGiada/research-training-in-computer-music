"use client";
import Header from "../components/Header";
import SunSleep from "../components/sunSleep";
import SunAwake from "../components/sunAwake";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center text-neutral-content">
      <Header />
      <div className="bg-wave fixed bottom-10 flex inset-x-0 min-h-[30vh] text-white p-2"></div>
      <div className="hero min-h-screen min-w-screen">
        <div className="hero-content text-center text-white">
          <div className="max-w-full">
            <h1 className="font-extrabold mt-[20vh] mb-10 leading-none tracking-tight text-3xl sm:text-md md:text-3xl lg:text-4xl xl:text-5xl">
              About
            </h1>
            <p className="mt-10 mb-3 mx-auto max-w-[80%] leading-none tracking-tight text-xl">
              Depending on some characteristic of the voice captured by the
              microphone, the sun will change.
            </p>
            <p className="mb-10 mx-auto max-w-[80%] leading-none tracking-tight text-xl">
              But, <b>how does it do?</b> Lets see it together!
            </p>

            <h2 className="font-bold mb-5 text-left leading-none tracking-tight text-xl sm:text-md md:text-2xl lg:text-2xl xl:text-2xl">
              First of all...
            </h2>
            <div class="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              <div>
                <div class="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 text-sky-50 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">
                      The sun is <b>asleep</b>
                    </h2>
                    <p>
                      when the microphone does not recognize any voice sound,
                      and it appears as it follows{" "}
                    </p>
                  </div>
                  <SunSleep
                    svgColor={"yellow"}
                    rad={25}
                    yCoordinate={-10}
                    heightSpaceSun={"12vh"}
                  />
                </div>
              </div>
              <div>
                <div class="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">
                      The sun is <b>awake</b>
                    </h2>
                    <p>
                      when the microphone captures the sound of a voice, and it
                      appears as it follows{" "}
                    </p>
                  </div>
                  <SunAwake
                    svgColor={"yellow"}
                    rad={25}
                    yCoordinate={-10}
                    heightSpaceSun={"12vh"}
                  />
                </div>
              </div>
            </div>

            <h2 className="font-bold mb-5 text-left leading-none tracking-tight text-xl sm:text-md md:text-2xl lg:text-2xl xl:text-2xl">
              Depending on the <b>sound intensity</b>...
            </h2>
            <div class="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              <div>
                <div class="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">
                      The sun <b>get smaller</b>
                    </h2>
                    <p>as the sound becomes softer</p>
                  </div>
                  <SunAwake
                    svgColor={"yellow"}
                    rad={15}
                    yCoordinate={-10}
                    heightSpaceSun={"18vh"}
                  />
                </div>
              </div>
              <div>
                <div class="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">
                      The sun <b>get bigger</b>
                    </h2>
                    <p>as the sound becomes louder</p>
                  </div>
                  <SunAwake
                    svgColor={"yellow"}
                    rad={40}
                    yCoordinate={-10}
                    heightSpaceSun={"18vh"}
                  />
                </div>
              </div>
            </div>

            <h2 className="font-bold mb-5 text-left leading-none tracking-tight text-xl sm:text-md md:text-2xl lg:text-2xl xl:text-2xl">
              Depending on the <b>pitch</b> of the sound...
            </h2>
            <div class="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              <div>
                <div class="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">
                      The sun <b>rises</b>
                    </h2>
                    <p>as the value of the emitted frequency becomes greater</p>
                  </div>
                  <SunAwake
                    svgColor={"yellow"}
                    rad={25}
                    yCoordinate={-30}
                    heightSpaceSun={"18vh"}
                  />
                </div>
              </div>
              <div>
                <div class="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">
                      The sun <b>sets </b>
                    </h2>
                    <p>as the value of the emitted frequency becomes lower</p>
                  </div>
                  <SunAwake
                    svgColor={"yellow"}
                    rad={25}
                    yCoordinate={30}
                    heightSpaceSun={"18vh"}
                  />
                </div>
              </div>
            </div>

            <h2 className="font-bold mt-[10vh] mb-5 text-left leading-none tracking-tight text-xl sm:text-md md:text-2xl lg:text-2xl xl:text-2xl">
              Depending on the <b>timbre</b> of the voice, the sun could be...
            </h2>
            <div class="mt-10 mb-[10vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              <div>
                <div class="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500  shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">
                      <b>red</b>
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
                <div class="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">
                      <b>green</b>
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
                <div class="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">
                      <b>blue</b>
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
                <div class="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">
                      <b>orange</b>
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
                <div class="card w-auto bg-gradient-card border-solid border-[2px] border-light-blue-500 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">
                      <b>gray</b>
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
