import { startTransition, useEffect, useRef, useState } from "react";
import "./index.css";
import {
  certificates,
  focusCards,
  heroNames,
  journeySteps,
  navItems,
  toolkitTags,
  translations
} from "./portfolioData";

const HERO_SPLIT_OUT_DURATION = 320;
const BLOCK_IDS = ["header", "hero", "focus", "journey", "toolkit", "certifications", "building", "contact", "footer"];

function createBlockLangs(lang) {
  return Object.fromEntries(BLOCK_IDS.map((blockId) => [blockId, lang]));
}

function buildClock() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(new Date());
}

function useClock() {
  const [clock, setClock] = useState(() => buildClock());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(buildClock());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return clock;
}

function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.14
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function useActiveNav(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  useEffect(() => {
    const update = () => {
      let current = sectionIds[0] || "";

      for (let index = sectionIds.length - 1; index >= 0; index -= 1) {
        const section = document.getElementById(sectionIds[index]);
        if (!section) {
          continue;
        }

        if (section.getBoundingClientRect().top <= 140) {
          current = sectionIds[index];
          break;
        }
      }

      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("load", update);
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("load", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds]);

  return activeId;
}

function useScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--scroll-progress", `${Math.max(0, Math.min(1, progress))}`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
}

function useMagnetButtons() {
  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      return undefined;
    }

    const buttons = Array.from(document.querySelectorAll(".button-magnet, .magnet-item"));
    const cleanups = [];

    buttons.forEach((button) => {
      const onMove = (event) => {
        const rect = button.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        const moveX = Math.max(-10, Math.min(10, offsetX * 0.16));
        const moveY = Math.max(-8, Math.min(8, offsetY * 0.16));
        button.style.setProperty("--magnet-x", `${moveX}px`);
        button.style.setProperty("--magnet-y", `${moveY}px`);
      };

      const onLeave = () => {
        button.style.setProperty("--magnet-x", "0px");
        button.style.setProperty("--magnet-y", "0px");
      };

      cleanups.push([button, onMove, onLeave]);
      button.addEventListener("pointermove", onMove);
      button.addEventListener("pointerleave", onLeave);
    });

    return () => {
      cleanups.forEach(([button, onMove, onLeave]) => {
        button.removeEventListener("pointermove", onMove);
        button.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);
}

function useCertificateSpotlight() {
  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!supportsFinePointer) {
      return undefined;
    }

    const cards = Array.from(document.querySelectorAll(".cert-card"));
    const cleanups = [];

    cards.forEach((card) => {
      const onMove = (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--spotlight-x", `${x}%`);
        card.style.setProperty("--spotlight-y", `${y}%`);
      };

      const onLeave = () => {
        card.style.setProperty("--spotlight-x", "50%");
        card.style.setProperty("--spotlight-y", "50%");
      };

      cleanups.push([card, onMove, onLeave]);
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
    });

    return () => {
      cleanups.forEach(([card, onMove, onLeave]) => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);
}

function useInteractiveSurfaces() {
  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      return undefined;
    }

    const surfaces = Array.from(document.querySelectorAll(".fx-surface"));
    const cleanups = [];

    surfaces.forEach((surface) => {
      const onMove = (event) => {
        const rect = surface.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 4.8;
        const rotateX = -((y - centerY) / centerY) * 4.8;

        surface.style.setProperty("--fx-x", `${(x / rect.width) * 100}%`);
        surface.style.setProperty("--fx-y", `${(y / rect.height) * 100}%`);
        surface.style.setProperty("--fx-rotate-x", `${rotateX.toFixed(2)}deg`);
        surface.style.setProperty("--fx-rotate-y", `${rotateY.toFixed(2)}deg`);
      };

      const onEnter = () => surface.classList.add("is-surface-active");
      const onLeave = () => {
        surface.classList.remove("is-surface-active");
        surface.style.setProperty("--fx-x", "50%");
        surface.style.setProperty("--fx-y", "50%");
        surface.style.setProperty("--fx-rotate-x", "0deg");
        surface.style.setProperty("--fx-rotate-y", "0deg");
      };

      cleanups.push([surface, onMove, onEnter, onLeave]);
      surface.addEventListener("pointermove", onMove);
      surface.addEventListener("pointerenter", onEnter);
      surface.addEventListener("pointerleave", onLeave);
    });

    return () => {
      cleanups.forEach(([surface, onMove, onEnter, onLeave]) => {
        surface.removeEventListener("pointermove", onMove);
        surface.removeEventListener("pointerenter", onEnter);
        surface.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);
}

function useStarfield(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let stars = [];
    let frameId = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = Array.from({ length: Math.min(180, Math.floor((width * height) / 9000)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.25,
        speed: Math.random() * 0.12 + 0.02,
        alpha: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.phase += 0.015;
        star.y += star.speed;

        if (star.y > height + 2) {
          star.y = -2;
          star.x = Math.random() * width;
        }

        const glow = 0.35 + Math.sin(star.phase) * 0.25;
        ctx.beginPath();
        ctx.fillStyle = `rgba(233, 241, 255, ${Math.max(0.2, star.alpha + glow * 0.2)})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
    };
  }, [canvasRef]);
}

function SplitHeading({ lines, visible }) {
  return (
    <h1
      className={`split-heading ${visible ? "is-visible" : ""}`}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, lineIndex) => {
        let charIndex = 0;
        return (
          <span className="split-line" key={`${line}-${lineIndex}`}>
            {line.split(" ").map((word, wordIndex) => {
              const wordChars = Array.from(word);
              const renderedWord = (
                <span className="split-word" key={`${word}-${wordIndex}`}>
                  {wordChars.map((char) => {
                    const currentIndex = charIndex;
                    charIndex += 1;
                    return (
                      <span
                        className="split-char"
                        key={`${char}-${lineIndex}-${wordIndex}-${currentIndex}`}
                        style={{
                          "--char-delay": `${lineIndex * 140 + currentIndex * 32}ms`,
                          "--char-out-delay": `${lineIndex * 30 + currentIndex * 16}ms`
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              );

              if (wordIndex === line.split(" ").length - 1) {
                return renderedWord;
              }

              return (
                <span key={`${word}-${wordIndex}-group`}>
                  {renderedWord}
                  <span className="split-space" aria-hidden="true">
                    {"\u00A0"}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

function App() {
  const canvasRef = useRef(null);
  const [lang, setLang] = useState("en");
  const [blockLangs, setBlockLangs] = useState(() => createBlockLangs("en"));
  const [heroVisible, setHeroVisible] = useState(false);
  const [languageSwitching, setLanguageSwitching] = useState(false);
  const [switchingBlocks, setSwitchingBlocks] = useState([]);
  const clock = useClock();
  const activeId = useActiveNav(navItems.map((item) => item.id));
  const headerText = translations[blockLangs.header];
  const heroText = translations[blockLangs.hero];
  const focusText = translations[blockLangs.focus];
  const journeyText = translations[blockLangs.journey];
  const toolkitText = translations[blockLangs.toolkit];
  const certificationsText = translations[blockLangs.certifications];
  const buildingText = translations[blockLangs.building];
  const contactText = translations[blockLangs.contact];
  const footerText = translations[blockLangs.footer];
  const headingLines = heroNames[blockLangs.hero];
  const year = new Date().getFullYear();

  useReveal();
  useMagnetButtons();
  useCertificateSpotlight();
  useInteractiveSurfaces();
  useStarfield(canvasRef);
  useScrollProgress();

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio_lang");
    const initialLang = stored === "th" || stored === "en" ? stored : "en";
    setLang(initialLang);
    setBlockLangs(createBlockLangs(initialLang));
    document.documentElement.lang = initialLang;
  }, []);

  useEffect(() => {
    document.title = headerText.pageTitle;
    window.localStorage.setItem("portfolio_lang", blockLangs.header);
  }, [blockLangs.header, headerText.pageTitle]);

  useEffect(() => {
    let frameB = 0;
    const frameA = window.requestAnimationFrame(() => {
      frameB = window.requestAnimationFrame(() => {
        setHeroVisible(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(frameA);
      window.cancelAnimationFrame(frameB);
    };
  }, []);

  const switchLanguage = (nextLang) => {
    if (nextLang === lang || languageSwitching) {
      return;
    }

    const blockDuration = 220;
    const blockGap = 120;

    setLanguageSwitching(true);
    setLang(nextLang);
    setHeroVisible(false);
    setSwitchingBlocks([]);

    BLOCK_IDS.forEach((blockId, index) => {
      window.setTimeout(() => {
        setSwitchingBlocks((current) => (current.includes(blockId) ? current : [...current, blockId]));
      }, index * blockGap);
    });

    BLOCK_IDS.forEach((blockId, index) => {
      const updateDelay = index * blockGap + (blockDuration * 0.5);

      if (blockId === "hero") {
        window.setTimeout(() => {
          window.setTimeout(() => {
            startTransition(() => {
              setBlockLangs((current) => ({ ...current, hero: nextLang }));
            });
            document.documentElement.lang = nextLang;
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                setHeroVisible(true);
              });
            });
          }, HERO_SPLIT_OUT_DURATION);
        }, updateDelay);
      } else {
        window.setTimeout(() => {
          startTransition(() => {
            setBlockLangs((current) => ({ ...current, [blockId]: nextLang }));
          });
        }, updateDelay);
      }

      window.setTimeout(() => {
        setSwitchingBlocks((current) => current.filter((value) => value !== blockId));
      }, (index * blockGap) + blockDuration);
    });

    window.setTimeout(() => {
      setLanguageSwitching(false);
    }, ((BLOCK_IDS.length - 1) * blockGap) + blockDuration);
  };

  const currentCerts = certificates.map((certificate) => ({
    ...certificate,
    meta: certificationsText[certificate.metaKey],
    title: certificationsText[certificate.titleKey],
    body: certificationsText[certificate.bodyKey]
  }));

  return (
    <>
      <div className="scroll-progress" aria-hidden="true"></div>
      <canvas id="starfield" ref={canvasRef} aria-hidden="true"></canvas>
      <div className="grid-overlay" aria-hidden="true"></div>
      <div className="scanlines" aria-hidden="true"></div>

      <div className="page-shell">
        <header className={`site-header ${switchingBlocks.includes("header") ? "is-switching" : ""}`} data-lang-block>
          <div className="header-inner">
            <a className="brand" href="#top" aria-label="Go to top">
              <div className="brand-mark mono">D7</div>
              <div className="brand-copy">
                <strong>D0R07HY</strong>
                <span className="mono">{headerText.brandSubtitle}</span>
              </div>
            </a>

            <nav className="site-nav mono" aria-label="Primary">
              {navItems.map((item) => (
                <a
                  href={`#${item.id}`}
                  key={item.id}
                  className={activeId === item.id ? "active" : ""}
                >
                  {headerText[item.key]}
                </a>
              ))}
            </nav>

            <div className="header-status mono">
              <div className="lang-switch" aria-label="Language switcher">
                <button
                  className={`lang-btn mono ${blockLangs.header === "en" ? "active" : ""}`}
                  type="button"
                  onClick={() => switchLanguage("en")}
                >
                  EN
                </button>
                <button
                  className={`lang-btn mono ${blockLangs.header === "th" ? "active" : ""}`}
                  type="button"
                  onClick={() => switchLanguage("th")}
                >
                  TH
                </button>
              </div>
              <span className="clock-status">
                <span className="status-dot" aria-hidden="true"></span>
                <span>{headerText.clockLabel}</span>
                <span>:</span>
                <span>{clock}</span>
              </span>
            </div>
          </div>
        </header>

        <main className="content" id="top">
          <section className={`hero ${switchingBlocks.includes("hero") ? "is-switching" : ""}`} id="overview" data-lang-block>
            <div className="hero-copy reveal is-visible">
              <div className="hero-ambient" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="eyebrow mono">{heroText.heroEyebrow}</div>
              <SplitHeading lines={headingLines} visible={heroVisible} />
              <p className="hero-subtitle mono">{heroText.heroSubtitle}</p>
              <p className="hero-summary">{heroText.heroSummary}</p>

              <div className="hero-actions">
                <a className="button button-primary button-magnet mono" href="#certifications">
                  {heroText.heroPrimaryButton}
                </a>
                <a
                  className="button button-secondary button-magnet mono"
                  href="https://github.com/D0R07HY"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {heroText.heroSecondaryButton}
                </a>
              </div>

              <div className="signal-grid">
                <div className="signal-card fx-surface">
                  <span className="mono">{heroText.signalAcademicLabel}</span>
                  <strong>{heroText.signalAcademicValue}</strong>
                </div>
                <div className="signal-card fx-surface">
                  <span className="mono">{heroText.signalCertificatesLabel}</span>
                  <strong>5</strong>
                </div>
                <div className="signal-card fx-surface">
                  <span className="mono">{heroText.signalFocusLabel}</span>
                  <strong>OffSec</strong>
                </div>
                <div className="signal-card fx-surface">
                  <span className="mono">{heroText.signalBaseLabel}</span>
                  <strong>{heroText.signalBaseValue}</strong>
                </div>
              </div>
            </div>

            <aside className="hero-visual reveal is-visible">
              <div className="terminal-bar mono">
                <div className="terminal-lights" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>profile://d0r07hy</span>
              </div>

              <div className="profile-stage">
                <div className="profile-frame fx-surface">
                  <img src="/media/DorothyHalf.png" alt="Portrait of Paphanthadanai Lomphonthan" />
                </div>

                <div className="quick-panel fx-surface">
                  <h2 className="mono">{heroText.quickTitle}</h2>
                  <ul className="quick-list">
                    <li>
                      <span>{heroText.quickRoleLabel}</span>
                      <strong>{heroText.quickRoleValue}</strong>
                    </li>
                    <li>
                      <span>{heroText.quickUniversityLabel}</span>
                      <strong>{heroText.quickUniversityValue}</strong>
                    </li>
                    <li>
                      <span>{heroText.quickStyleLabel}</span>
                      <strong>{heroText.quickStyleValue}</strong>
                    </li>
                    <li>
                      <span>{heroText.quickGoalLabel}</span>
                      <strong>{heroText.quickGoalValue}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </section>

          <section className={`section ${switchingBlocks.includes("focus") ? "is-switching" : ""}`} id="focus" data-lang-block>
            <div className="section-heading reveal">
              <div>
                <span className="section-label mono">{focusText.focusLabel}</span>
                <h2>{focusText.focusTitle}</h2>
              </div>
              <p>{focusText.focusIntro}</p>
            </div>

            <div className="grid-three">
              {focusCards.map((card) => (
                <article className="panel reveal fx-surface" key={card.title}>
                  <div className="panel-code mono">{focusText[card.code]}</div>
                  <h3>{focusText[card.title]}</h3>
                  <p>{focusText[card.body]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={`section ${switchingBlocks.includes("journey") ? "is-switching" : ""}`} id="journey" data-lang-block>
            <div className="section-heading reveal">
              <div>
                <span className="section-label mono">{journeyText.journeyLabel}</span>
                <h2>{journeyText.journeyTitle}</h2>
              </div>
              <p>{journeyText.journeyIntro}</p>
            </div>

            <div className="timeline">
              {journeySteps.map((step) => (
                <article className="timeline-item reveal fx-surface" key={step.title}>
                  <div className="timeline-date mono">{journeyText[step.label]}</div>
                  <div className="timeline-body">
                    <h3>{journeyText[step.title]}</h3>
                    <p>{journeyText[step.body]}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={`section ${switchingBlocks.includes("toolkit") ? "is-switching" : ""}`} data-lang-block>
            <div className="section-heading reveal">
              <div>
                <span className="section-label mono">{toolkitText.toolkitLabel}</span>
                <h2>{toolkitText.toolkitTitle}</h2>
              </div>
              <p>{toolkitText.toolkitIntro}</p>
            </div>

            <div className="tag-wrap reveal">
              {toolkitTags.map((tag) => (
                <span className="tag mono magnet-item" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className={`section ${switchingBlocks.includes("certifications") ? "is-switching" : ""}`} id="certifications" data-lang-block>
            <div className="section-heading reveal">
              <div>
                <span className="section-label mono">{certificationsText.certificationsLabel}</span>
                <h2>{certificationsText.certificationsTitle}</h2>
              </div>
              <p>{certificationsText.certificationsIntro}</p>
            </div>

            <div className="cert-grid">
              {currentCerts.map((certificate) => (
                <a
                  className="cert-card reveal"
                  href={certificate.href}
                  key={certificate.title}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={certificate.image} alt={certificate.alt} />
                  <div className="cert-body">
                    <div className="cert-meta mono">
                      <span>{certificate.meta}</span>
                      <span>{certificate.date}</span>
                    </div>
                    <h3>{certificate.title}</h3>
                    <p>{certificate.body}</p>
                    <span className="cert-link mono">
                      {certificate.href.startsWith("http")
                        ? certificationsText.certOpenVerification
                        : certificationsText.certOpenCertificate}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className={`section ${switchingBlocks.includes("building") ? "is-switching" : ""}`} data-lang-block>
            <div className="split-grid">
              <article className="panel reveal fx-surface">
                <div className="panel-code mono">{buildingText.bringCode}</div>
                <h3>{buildingText.bringTitle}</h3>
                <ul className="list-clean">
                  <li>{buildingText.bringItem1}</li>
                  <li>{buildingText.bringItem2}</li>
                  <li>{buildingText.bringItem3}</li>
                </ul>
              </article>

              <article className="panel reveal fx-surface">
                <div className="panel-code mono">{buildingText.buildCode}</div>
                <h3>{buildingText.buildTitle}</h3>
                <ul className="list-clean">
                  <li>{buildingText.buildItem1}</li>
                  <li>{buildingText.buildItem2}</li>
                  <li>{buildingText.buildItem3}</li>
                </ul>
              </article>
            </div>
          </section>

          <section className={`section ${switchingBlocks.includes("contact") ? "is-switching" : ""}`} id="contact" data-lang-block>
            <div className="contact-card reveal">
              <div className="contact-copy">
                <span className="section-label mono">{contactText.contactLabel}</span>
                <h2>{contactText.contactTitle}</h2>
                <p>{contactText.contactBody}</p>
                <p className="contact-note contact-note-spaced">{contactText.contactNote}</p>

                <div className="support-panel fx-surface">
                  <h3>{contactText.supportTitle}</h3>
                  <p>{contactText.supportBody}</p>
                  <div className="support-actions mono">
                    <a
                      className="support-button magnet-item"
                      href="https://buymeacoffee.com/d0r07hy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contactText.supportCoffee}
                    </a>
                    <a
                      className="support-button kofi magnet-item"
                      href="https://ko-fi.com/d0r07hy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contactText.supportKofi}
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-links">
                <a
                  className="contact-link fx-surface"
                  href="https://github.com/D0R07HY"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <strong>GitHub</strong>
                    <span className="mono">github.com/D0R07HY</span>
                  </div>
                  <span className="mono">{contactText.contactOpen}</span>
                </a>

                <div className="contact-link fx-surface">
                  <div>
                    <strong>{contactText.contactLocationTitle}</strong>
                    <span className="mono">{contactText.contactLocationValue}</span>
                  </div>
                  <span className="mono">{contactText.contactLocationTag}</span>
                </div>

                <div className="contact-link fx-surface">
                  <div>
                    <strong>{contactText.contactDirectionTitle}</strong>
                    <span className="mono">{contactText.contactDirectionValue}</span>
                  </div>
                  <span className="mono">{contactText.contactDirectionTag}</span>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className={`footer mono ${switchingBlocks.includes("footer") ? "is-switching" : ""}`} data-lang-block>
          <span>{footerText.footerText}</span>
          <span>&copy; {year} D0R07HY</span>
        </footer>
      </div>
    </>
  );
}

export default App;
