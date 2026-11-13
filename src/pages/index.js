import * as React from "react"
import Device from "../components/Device"
import "../styles/global.css"

// Each stage: scroll position (0..1) -> device pose + palette.
const STAGES = [
  { t: 0.0, ry: -22, rx: 8, rz: -3, s: 0.88, x: 0, hue: 226, l: 7, glow: 0.25, eye: 0.10 },
  { t: 0.2, ry: 24, rx: 4, rz: 0, s: 1.00, x: -2, hue: 218, l: 8, glow: 0.70, eye: 0.35 },
  { t: 0.4, ry: 0, rx: 0, rz: 0, s: 1.12, x: 0, hue: 193, l: 7, glow: 0.90, eye: 1.00 },
  { t: 0.6, ry: -12, rx: 3, rz: -3, s: 1.02, x: 0, hue: 25, l: 9, glow: 0.80, eye: 1.00 },
  { t: 0.8, ry: 42, rx: -8, rz: 3, s: 1.15, x: -2, hue: 233, l: 9, glow: 0.80, eye: 0.85 },
  { t: 1.0, ry: 0, rx: 0, rz: 0, s: 1.00, x: 0, hue: 221, l: 7, glow: 0.40, eye: 1.00 },
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
  { id: "hero", kicker: "קפה עם אופי", title: "לפני הקפה,\nמישהו אומר היי.", body: "גאדג׳ט קטן ליד מכונת הקפה. שתי עיניים, חיישן קירבה וקבלת פנים שעושה חשק להתקרב.", cue: "גללו. הוא כבר מחכה לכם ↓" },
  { id: "sense", kicker: "01 · מתקרבים", title: "יש מישהו\nבסביבה.", body: "חיישן הקירבה קולט שמישהו הגיע למכונת הקפה. מכאן מתחילה קבלת הפנים." },
  { id: "awake", kicker: "02 · מתעוררים", title: "פתאום,\nיש כאן אופי.", body: "העיניים נפתחות. הגאדג׳ט הכחול־שקוף מקבל חיים, והפסקת הקפה מרגישה קצת אחרת." },
  { id: "hello", kicker: "03 · אומרים שלום", title: "כל מי שמגיע,\nמקבל ברכה.", body: "לא צריך אירוע מיוחד. רק להגיע לשתות קפה. הוא כבר ידאג ל״היי״.", cue: "היי, זמן לקפה ☕ · ברכה לדוגמה" },
  { id: "close", kicker: "04 · מקרוב", title: "כחול. שקוף.\nמלא אופי.", body: "הגוף השקוף, המסך עם העיניים וצמד העיגולים בחזית. העיצוב כאן מבוסס על הגאדג׳ט האמיתי של עומרי." },
  { id: "end", kicker: "מהתמונה אל הגלילה", title: "אותה מכונה.\nיותר חיוך.", body: "זה המוצר האמיתי, ליד מכונת הקפה. הגלילה מספרת את הסיפור שלו.", cue: "הדמיה חזותית בלבד. האתר לא מפעיל את החומרה." },
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
    <main ref={root} className="page" data-chapter={active}>
      <div className="bg" aria-hidden="true"><div className="orb o1" /><div className="orb o2" /></div>
      <header className="nav"><span>קפה עם אופי <small>☕</small></span><span className="pbar"><i /></span></header>
      <div className="stage"><Device active={active} /></div>
      {CHAPTERS.map((c, i) => (
        <section key={c.id} className={"chapter" + (i === active ? " on" : "") + ""} id={c.id}>
          <div className="copy">
            <p className="kicker">{c.kicker}</p>
            <h1>{c.title}</h1>
            <p className="body">{c.body}</p>
            {c.cue && <p className="cue">{c.cue}</p>}
          </div>
        </section>
      ))}
    </main>
  )
}

export const Head = () => <><title>קפה עם אופי | הגאדג׳ט של עומרי</title><meta name="description" content="חיישן קירבה, שתי עיניים וברכה לכל מי שמגיע לשתות קפה. סיפור מוצר אינטראקטיבי בגלילה." /><meta name="viewport" content="width=device-width, initial-scale=1" /></>
