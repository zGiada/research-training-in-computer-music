"use client";
import Header from "../components/Header";
import Sun from "../components/Sun";
import SunSleep from "../components/sunSleep";
import sunAwake from "../components/sunAwake";
import Button from "../components/Button";
import * as dimSun from "../audio/setDimsValue";

export default function Play() {
  // console.log(getCurrentDimension().width + " " + getCurrentDimension().height);
  var svgColor = "yellow"; //green = 4CC94C   silver = C0C0C0

  var rad = 140;

  var yCoordinate =
    (dimSun.height - Math.round((dimSun.height * 30) / 100)) / 2;

  return (
    <main className="flex max-h-screen flex-col items-center ">
      <Header />
      <div className="absolute bg-wave flex inset-x-0 bottom-0 min-h-[30vh] text-white p-2"></div>
      <SunSleep svgColor={svgColor} rad={rad} yCoordinate={yCoordinate} />
      {/*
        Inserire condizione = se non sente mostrare svgSleep, sennò mostrare svgAwake 
        PARAMETRI: rad e yCoordinate
      */}

      <Button />
    </main>
  );
}
