import * as React from "react"
import photo from "../../coffee-gadget.jpg"

// A stylized CSS model based on the supplied photo, not a CAD model.
export default function Device({ active }) {
  return (
    <div className={"device mode-" + active} aria-hidden="true">
      <div className="glow" />
      <div className="illustration">
        <div className="radar"><i /><i /><i /></div>
        <div className="shell">
          <div className="housing rear" />
          <div className="housing depth d1" /><div className="housing depth d2" /><div className="housing depth d3" />
          <div className="housing front">
            <div className="screen"><div className="eye"><i /></div><div className="eye"><i /></div></div>
            <div className="vents" />
            <div className="sensor-panel"><div className="sensor" /><div className="sensor" /></div>
            <div className="sheen" />
          </div>
          <div className="base"><i /><b /></div>
          <div className="cable" />
        </div>
        <div className="greeting" dir="rtl">היי, זמן לקפה <span>☕</span></div>
        <div className="shadow" />
      </div>
      <figure className="real-photo"><img src={photo} alt="" /><figcaption>המוצר האמיתי, במקום הטבעי שלו.</figcaption></figure>
    </div>
  )
}
