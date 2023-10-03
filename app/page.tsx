import Header from "./Header";
import Sun from "./Sun";

export default function Home() {
  var svgColor = "yellow";
  var rad = 50;
  var yCoordinate = 0;
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Header />
      <Sun svgColor={svgColor} rad={rad} yCoordinate={yCoordinate} />

      <div className="flex justify-center p-6 bg-base-100 fixed inset-x-0 bottom-0">
        <div className="btn-group btn-group-vertical lg:btn-group-horizontal text-neutral-content">
          <button className="btn btn-active">Start Listening</button>
          <button className="btn">Stop Listening</button>
        </div>
      </div>
    </main>
  );
}
