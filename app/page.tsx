"use client";
import Header from "./components/Header";
import Sun from "./components/Sun";
import SunSleep from "./components/sunSleep";
import sunAwake from "./components/sunAwake";
import Button from "./components/Button";

export default function Home() {
  var svgColor = "yellow";
  var rad = 100;
  var yCoordinate = 0;
  
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Header />
      <Sun svgColor={svgColor} rad={rad} yCoordinate={yCoordinate} />
      {/*
        Inserire condizione = se non sente mostrare svgSleep, sennò mostrare svgAwake 
        PARAMETRI: rad e yCoordinate
      */}
      <div className="flex p-6 bg-base-100 fixed inset-x-0 bottom-0">
        <Button />
      </div>
    </main>
  );
}
