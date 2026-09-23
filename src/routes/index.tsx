import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronUp,
  Facebook,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import plumbingHero from "@/assets/plumbing-hero.jpg";

const navItems = [
  ["HOME", "home"],
  ["ABOUT", "about"],
  ["SERVICES", "services"],
  ["OUR SERVICE AREA", "service-area"],
  ["OUR REEL", "our-reel"],
  ["CONTACT", "contact"],
] as const;

const areas = [
  "Scurry", "Nacogdoches County", "Ennis", "Payne Springs", "Tyler", "Grays Prairie",
  "Crockett", "Lufkin", "Murchison", "Mabank", "Elkhart", "Livingston", "Lovelady",
  "Madisonville", "Montalba", "Dallas", "Grapeland", "Rusk", "Freeport", "Jacksonville",
  "Diboll", "Corsicana", "Kemp", "Corrigan", "Malakoff", "Whitehouse", "Palestine",
  "Centerville", "Tool", "Kaufman", "Frankston", "Fairfield", "Gun Barrel City",
];

const mapUrl = "https://www.google.com/maps/search/?api=1&query=211+U.S.-287+Elkhart+TX+75839";

const services = [
  { title: "Leak Detection & Repair", description: "Assessment and repair for visible or suspected plumbing leaks." },
  { title: "Drain Cleaning", description: "Cleaning for slow, blocked, or backed-up household drains." },
  { title: "Faucet & Fixture Repair", description: "Repair and replacement support for faucets and plumbing fixtures." },
  { title: "Toilet Repair & Replacement", description: "Help with common toilet repairs and replacement needs." },
  { title: "Water Heater Services", description: "Service support for residential water heater systems." },
  { title: "Pipe Repair", description: "Repair support for damaged, leaking, or aging plumbing lines." },
  { title: "Emergency Plumbing", description: "Plumbing help for urgent situations requiring professional attention." },
  { title: "General Plumbing", description: "Practical plumbing support for common residential needs." },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Texas Plumbers, LLC | Elkhart, TX" },
      { name: "description", content: "Texas Plumbers, LLC — built on trust and backed by skill. Call or text our Elkhart, Texas team." },
      { property: "og:title", content: "Texas Plumbers, LLC | Built on trust. Backed by skill." },
      { property: "og:description", content: "A small Hispanic owned plumbing business serving communities across East Texas and beyond." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function GlossyLink({ href, children, secondary = false, external = false }: { href: string; children: React.ReactNode; secondary?: boolean; external?: boolean }) {
  return (
    <a className={`glossy-button ${secondary ? "glossy-button-secondary" : ""}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      <span>{children}</span><ArrowUpRight aria-hidden="true" size={17} />
    </a>
  );
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy?: string }) {
  return <div className="section-intro reveal">
    <p className="eyebrow"><span />{eyebrow}</p>
    <h2>{title}</h2>
    {copy && <p className="section-copy">{copy}</p>}
  </div>;
}

function Index() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [valueActive, setValueActive] = useState(0);
  const [serviceActive, setServiceActive] = useState(0);
  const sectionIds = useMemo(() => navItems.map(([, id]) => id), []);
  const activeService = services[serviceActive] ?? services[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: "-28% 0px -58%", threshold: [0.05, 0.2, 0.5] });
    sectionIds.forEach((id) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); revealObserver.disconnect(); };
  }, [sectionIds]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navigate = (id: string) => { setMenuOpen(false); window.setTimeout(() => scrollToSection(id), 80); };

  return <main className="site-shell">
    <header className={`floating-nav ${scrolled ? "is-scrolled" : ""}`}>
      <button className="brand" onClick={() => navigate("home")} aria-label="Texas Plumbers home">
        <strong>TEXAS PLUMBERS</strong><small>LLC</small>
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, id]) => <button key={id} className={active === id ? "active" : ""} onClick={() => navigate(id)}>{label}</button>)}
      </nav>
      <a className="nav-call" href="tel:+19034073254"><span>CALL NOW</span><ArrowUpRight size={16} /></a>
      <button className="menu-trigger" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu /></button>
    </header>

    <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
      <div className="mobile-menu-top"><span>TEXAS PLUMBERS <small>LLC</small></span><button aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></button></div>
      <nav>{navItems.map(([label, id], index) => <button key={id} onClick={() => navigate(id)}><span>0{index + 1}</span>{label}</button>)}</nav>
      <a href="tel:+19034073254"><Phone size={18} /> CALL / TEXT 903-407-3254</a>
    </div>

    <section id="home" className="hero section-anchor">
      <img className="hero-background" src={plumbingHero} alt="Professional plumber working on polished copper piping" width={1920} height={1080} />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span />TEXAS PLUMBERS, LLC · ELKHART, TEXAS</p>
        <h1><span>BUILT ON TRUST.</span><span className="metallic-text">BACKED BY SKILL.</span></h1>
        <div className="hero-lower">
          <p>Texas Plumbers, LLC is a small Hispanic owned plumbing business serving communities across East Texas and beyond.<em>God bless you all!</em></p>
          <div className="button-row"><GlossyLink href="tel:+19034073254">CALL / TEXT 903-407-3254</GlossyLink><button className="text-button" onClick={() => navigate("service-area")}>EXPLORE OUR SERVICE AREA <ArrowDown size={16} /></button></div>
        </div>
      </div>
      <div className="hero-decor" aria-hidden="true">
        <div className="floating-badge badge-one"><ShieldCheck size={18} /><span>RESPONSIBLE<br/><strong>MASTER PLUMBER</strong></span></div>
        <div className="floating-badge badge-two"><MapPin size={18} /><span>BASED IN<br/><strong>ELKHART, TX</strong></span></div>
        <div className="floating-badge badge-three"><Sparkles size={18} /><span>PROUDLY<br/><strong>SERVING EAST TEXAS</strong></span></div>
      </div>
      <button className="scroll-cue" onClick={() => navigate("about")}><span>SCROLL TO EXPLORE</span><i /><ArrowDown size={14} /></button>
    </section>

    <div className="marquee" aria-label="Business highlights"><div>
      {[0,1].map((copy) => <span key={copy}>BUILT ON TRUST <b>✦</b> BACKED BY SKILL <b>✦</b> RESPONSIBLE MASTER PLUMBER <b>✦</b> ELKHART, TX <b>✦</b> SERVING EAST TEXAS <b>✦</b>&nbsp;</span>)}
    </div></div>

    <section id="about" className="about section-anchor section-pad">
      <div className="about-composition">
        <div className="about-copy">
          <SectionIntro eyebrow="ABOUT TEXAS PLUMBERS, LLC" title={<>A SMALL BUSINESS.<br/><span>A BIG STANDARD.</span></>} />
          <p className="about-body reveal">Built on trust and backed by skill, Texas Plumbers, LLC is a small Hispanic owned plumbing business serving customers across a wide range of Texas communities.</p>
          <div className="about-facts reveal"><span>HISPANIC OWNED</span><span>RESPONSIBLE MASTER PLUMBER</span><span>ELKHART, TEXAS</span></div>
        </div>
        <div className="editorial-visual reveal"><div className="visual-line"/><div className="visual-mark">T<span>★</span>P</div><p>YOUR COMPANY PHOTO<br/>CAN LIVE HERE</p><small>FRAME 01 / TEXAS</small></div>
      </div>
    </section>

    <section className="values section-pad">
      <SectionIntro eyebrow="OUR FOUNDATION" title="WHAT WE STAND FOR" />
      <div className="value-panels reveal">
        {[{t:"TRUST",c:"Built on clear, respectful relationships."},{t:"SKILL",c:"A standard centered on responsible workmanship."},{t:"SERVICE",c:"Focused on the communities we serve."}].map((item,index) => <article key={item.t} className={valueActive === index ? "active" : ""} onMouseEnter={() => setValueActive(index)} onFocus={() => setValueActive(index)} tabIndex={0}>
          <span className="value-number">0{index + 1}</span><div><h3>{item.t}</h3><p>{item.c}</p></div><ArrowUpRight />
        </article>)}
      </div>
    </section>

    <section id="services" className="services section-anchor section-pad">
      <div className="services-head"><SectionIntro eyebrow="HOW WE CAN HELP" title="PLUMBING SERVICES" /><p className="section-copy reveal">Professional plumbing support for homes and properties across the communities we serve.</p></div>
      <div className="service-showcase reveal">
        <div className="service-list">
          {services.map((service, index) => <article key={service.title} className={serviceActive === index ? "active" : ""} onMouseEnter={() => setServiceActive(index)} onFocus={() => setServiceActive(index)} onClick={() => setServiceActive(index)} tabIndex={0}>
            <span>0{index + 1}</span><div><h3>{service.title}</h3><p>{service.description}</p></div><ArrowUpRight aria-hidden="true" />
          </article>)}
        </div>
        <aside className="service-preview" aria-live="polite"><span>SELECTED SERVICE · 0{serviceActive + 1}</span><div className="service-glyph"><i/><i/><i/></div><h3>{activeService.title}</h3><p>{activeService.description}</p></aside>
      </div>
    </section>

    <section id="our-reel" className="reel section-anchor section-pad">
      <div className="reel-orbit reel-orbit-one" aria-hidden="true"/><div className="reel-orbit reel-orbit-two" aria-hidden="true"/>
      <SectionIntro eyebrow="OUR REEL" title="SEE OUR WORK IN ACTION" copy="Take a look at Texas Plumbers, LLC through real project footage and social reels." />
      <div className="reel-track">
        {[1, 2, 3].map((reel) => <div className="reel-card reveal" key={reel} aria-label={`Empty reel ${reel} placeholder; no video is loaded`}>
          {/* Replace this placeholder with the client's real reel */}
          <div className="reel-card-shine"/><span className="reel-number">REEL 0{reel}</span>
          <div className="play-outline"><Play aria-hidden="true" /></div>
          <div className="reel-card-copy"><h3>REEL PLACEHOLDER</h3><p>Client reel will be added here</p></div>
          <span className="reel-format">9:16 · EMPTY SLOT</span>
        </div>)}
      </div>
    </section>

    <section id="service-area" className="area section-anchor section-pad">
      <SectionIntro eyebrow="OUR REACH" title="PROUDLY SERVING TEXAS" copy="Serving communities across East Texas and surrounding areas." />
      <div className="area-visual reveal">
        <div className="abstract-map" aria-label="Abstract Texas-inspired service area illustration">
          <div className="map-lines"/><div className="map-star">★</div>
          {["TYLER","DALLAS","LUFKIN","ELKHART","PALESTINE"].map((place,index) => <span key={place} className={`marker marker-${index+1}`}><i />{place}</span>)}
          <p>ABSTRACT SERVICE-AREA VISUAL<br/><small>NOT A GEOGRAPHIC MAP</small></p>
        </div>
        <div className="hq-panel"><p className="eyebrow"><span/>HEADQUARTERS</p><h3>211 U.S.-287</h3><p>Elkhart, TX 75839<br/>United States</p><GlossyLink href={mapUrl} external>GET DIRECTIONS</GlossyLink></div>
      </div>
      <div className="location-cloud reveal">{areas.map((area) => <span key={area}><MapPin size={13}/>{area}, TX</span>)}</div>
    </section>

    <section className="credential section-pad"><div className="credential-panel reveal"><div className="credential-icon"><ShieldCheck /></div><div><p>PRIMARY CREDENTIAL</p><h2>RESPONSIBLE<br/><span>MASTER PLUMBER</span></h2></div><span className="credential-star">★</span></div></section>

    <section className="contact-cta section-pad">
      <p className="eyebrow reveal"><span/>START A CONVERSATION</p>
      <h2 className="reveal">NEED A PLUMBER?<br/><span>LET'S TALK.</span></h2>
      <p className="reveal">Call or text Texas Plumbers, LLC for more information.</p>
      <div className="button-row reveal"><GlossyLink href="tel:+19034073254">CALL / TEXT 903-407-3254</GlossyLink><GlossyLink href="mailto:texasplumbers.llc@gmail.com" secondary>SEND AN EMAIL</GlossyLink></div>
    </section>

    <section id="contact" className="contact section-anchor section-pad">
      <div className="contact-grid">
        <div className="contact-panel reveal"><p className="eyebrow"><span/>CONTACT</p><h2>TEXAS PLUMBERS,<br/><span>LLC</span></h2>
          <div className="contact-list"><a href="tel:+19034073254"><Phone/><span><small>PRIMARY PHONE</small>+1 903-407-3254</span><ArrowUpRight/></a><a href="tel:+19036033823"><Phone/><span><small>ALTERNATE PHONE</small>+1 903-603-3823</span><ArrowUpRight/></a><a href="mailto:texasplumbers.llc@gmail.com"><Mail/><span><small>EMAIL</small>texasplumbers.llc@gmail.com</span><ArrowUpRight/></a><a href={mapUrl} target="_blank" rel="noreferrer"><MapPin/><span><small>ADDRESS</small>211 U.S.-287, Elkhart, TX 75839</span><ArrowUpRight/></a></div>
        </div>
        <div className="social-panel reveal"><Facebook/><p>FOLLOW TEXAS PLUMBERS, LLC</p><h3>Facebook</h3><span>918 followers · 45 following</span><GlossyLink href="https://www.facebook.com/texasplumbersllc/" external>VISIT FACEBOOK</GlossyLink></div>
      </div>
    </section>

    <footer className="footer">
      <div className="footer-top"><div className="footer-brand"><h2>TEXAS PLUMBERS<small>LLC</small></h2><p>Built on trust. Backed by skill.</p></div><div><p className="footer-label">QUICK LINKS</p>{navItems.map(([label,id]) => <button key={id} onClick={() => navigate(id)}>{label}</button>)}</div><div><p className="footer-label">CONTACT</p><a href="tel:+19034073254">+1 903-407-3254</a><a href="tel:+19036033823">+1 903-603-3823</a><a href="mailto:texasplumbers.llc@gmail.com">texasplumbers.llc@gmail.com</a></div><div><p className="footer-label">LOCATION</p><a href={mapUrl} target="_blank" rel="noreferrer">211 U.S.-287<br/>Elkhart, TX 75839</a><a className="footer-social" href="https://www.facebook.com/texasplumbersllc/" target="_blank" rel="noreferrer"><Facebook size={16}/> FACEBOOK</a></div></div>
      <div className="footer-bottom"><span>© 2026 Texas Plumbers, LLC. All Rights Reserved.</span><span>GOD BLESS YOU ALL!</span><button aria-label="Back to top" onClick={() => navigate("home")}><ChevronUp/></button></div>
    </footer>
  </main>;
}
