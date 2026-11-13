import * as React from "react"

// Pure CSS 3D gadget: body, glass screen, ring, side button, glow.
export default function Device() {
  return (
    <div className="device" aria-hidden="true">
      <div className="glow" />
      <div className="shell">
        <div className="face back" />
        <div className="face edge e1" /><div className="face edge e2" /><div className="face edge e3" />
        <div className="face front">
          <div className="ring" />
          <div className="screen">
            <div className="eye"><i /></div>
            <div className="bars"><b /><b /><b /><b /><b /></div>
            <span className="clock">09:41</span>
          </div>
          <div className="gloss" />
        </div>
        <div className="knob" />
      </div>
      <div className="shadow" />
    </div>
  )
}
