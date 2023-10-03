import React from 'react'

const Sun = ({ svgColor, rad, yCoordinate }) => {
  const shadowRadius = rad + (rad * 50) / 100;
  return (
    <div className="flex-grow sun-container w-full flex items-center justify-center ">
        <svg
          width="100%" // Set the desired width of the circle
          height="90vh" // Set the desired height of the circle
          xmlns="http://www.w3.org/2000/svg"
        >
          <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={svgColor} stopOpacity="0.7" />
            <stop offset="50%" stopColor={svgColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={svgColor} stopOpacity="0" />
          </radialGradient>
          <circle
            cx={0}
            cy={yCoordinate}
            r={shadowRadius}
            fill="url(#shadow)"
            style={{ transform: "translate(50%, 50%)" }}
          />

          <circle
            cx={0}
            cy={yCoordinate}
            r={rad}
            fill={svgColor}
            style={{ transform: "translate(50%, 50%)" }}
          />
        </svg>
      </div>
  )
}

export default Sun