import * as React from "react"
import Device from "../components/Device"
import "../styles/global.css"

// Each stage: scroll position (0..1) -> device pose + palette.
const STAGES = [
  { t: 0.0,  ry: -28, rx: 12, rz: 0,   s: 0.8,  x: 0,   hue: 232, l: 7,  glow: 0.35, eye: 0.3 },
  { t: 0.2,  ry: 0,   rx: 0,  rz: 0,   s: 1.15, x: 18,   hue: 262, l: 9,  glow: 0.9,  eye: 1 },
  { t: 0.4,  ry: 62,  rx: 8,  rz: 0,   s: 1.1,  x: -18,  hue: 190, l: 8,  glow: 0.6,  eye: 0.5 },
  { t: 0.6,  ry: 180, rx: -12, rz: 8,  s: 1.25, x: 18, hue: 22,  l: 9,  glow: 0.8,  eye: 0.2 },
  { t: 0.8,  ry: 300, rx: 22, rz: -6,  s: 1.5,  x: -18,   hue: 330, l: 10, glow: 1,    eye: 1 },
  { t: 1.0,  ry: 360, rx: 0,  rz: 0,   s: 0.95, x: 0,   hue: 232, l: 7,  glow: 0.5,  eye: 0.6 },
]

const ease = (u) => u * u * (3 - 2 * u)
const lerp = (a, b, u) => a + (b - a) * u

function pose(p) {
  let i = 0
  while (i < STAGES.length - 2 && p > STAGES[i + 1].t) i++
  const a = STAGES[i], b = STAGES[i + 1]
  const u = ease(Math.min(1, Math.max(0, (p - a.t) / (b.t - a.t))))
  const o = {}
  for (const k of ["ry", "rx", "rz", "s", "x", "hue", "l", "glow", "eye"]) o[k] = lerp(a[k], b[k], u)
  return o
}

const CHAPTERS = [
  { id: "hero", kicker: "Orbit One", title: "קטן. שקט. חי.", body: "גאדג'ט דמיוני שגולל איתך. תמשיך לגלול." },
  { id: "light", kicker: "01 · אור", title: "מסך שנושם.", body: "זכוכית אחת, בלי מסגרות. הלוח זוהר רק כשצריך, והעיניים של Orbit עוקבות אחריך." },
  { id: "side", kicker: "02 · פרופיל", title: "דק מכל זווית.", body: "גוף אלומיניום אחד, 7.9 מ״מ. מסתובבים סביבו ורואים את כל הקצוות נסגרים בשקט." },
  { id: "back", kicker: "03 · סוללה", title: "שבוע שלם.", body: "הצד האחורי מטעין אלחוטית. שבעה ימים על טעינה אחת, ושעה אחת עד מלא." },
  { id: "zoom", kicker: "04 · קרוב", title: "כל פרט בפוקוס.", body: "הטבעת, הכפתור והזכוכית. מקרבים, והרקע משנה צבע בעקבות המוצר." },
  { id: "end", kicker: "Orbit One", title: "הסיבוב הושלם.", body: "זו הדגמה של אפקט גלילה ב-GatsbyJS. המוצר בדוי, האפקט אמיתי." },
]

export default function IndexPage() {
  const root = React.useRef(null)
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    const update = () => {
      raf = 0
      const el = root.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      const o = reduce ? pose(Math.round(p * 5) / 5) : pose(p)
      const st = el.style
      st.setProperty("--ry", o.ry + "deg")
      st.setProperty("--rx", o.rx + "deg")
      st.setProperty("--rz", o.rz + "deg")
      st.setProperty("--s", o.s)
      st.setProperty("--x", o.x + "vw")
      st.setProperty("--hue", o.hue)
      st.setProperty("--l", o.l + "%")
      st.setProperty("--glow", o.glow)
      st.setProperty("--eye", o.eye)
      st.setProperty("--p", p)
      setActive(Math.min(CHAPTERS.length - 1, Math.round(p * (CHAPTERS.length - 1))))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <main ref={root} className="page">
      <div className="bg" aria-hidden="true"><div className="orb o1" /><div className="orb o2" /></div>
      <header className="nav"><span>Orbit One</span><span className="pbar"><i /></span></header>
      <div className="stage"><Device /></div>
      {CHAPTERS.map((c, i) => (
        <section key={c.id} className={"chapter" + (i === active ? " on" : "") + (i % 2 ? " alt" : "")} id={c.id}>
          <div className="copy">
            <p className="kicker">{c.kicker}</p>
            <h1>{c.title}</h1>
            <p className="body">{c.body}</p>
          </div>
        </section>
      ))}
    </main>
  )
}

export const Head = () => <><title>Orbit One - scroll demo</title><meta name="viewport" content="width=device-width, initial-scale=1" /></>
