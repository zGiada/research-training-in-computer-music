"use client";
import Header from "./components/Header";
import Sun from "./components/Sun";
import Button from "./components/Button";

export default function Home() {
  var svgColor = "yellow";
  var rad = 50;
  var yCoordinate = 0;
  function handleClick() {
    alert("increment like count");
  }
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Header />
      <Sun svgColor={svgColor} rad={rad} yCoordinate={yCoordinate} />

      <div className="flex justify-center p-6 bg-base-100 fixed inset-x-0 bottom-0">
        <Button /> {/* Use the ButtonComponent here */}
      </div>
    </main>
  );
}
