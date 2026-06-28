const clockEl = document.getElementById("clock");
  const yearEl = document.getElementById("year");
  const langButtons = Array.from(document.querySelectorAll(".lang-btn"));
  const translatableNodes = document.querySelectorAll("[data-i18n]");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  const langBlocks = Array.from(document.querySelectorAll("[data-lang-block]"));
  const heroHeading = document.querySelector(".split-heading");
  const translations = {
    en: {
      pageTitle: "D0R07HY | Cybersecurity Portfolio",
      brandSubtitle: "Offensive security portfolio",
      navOverview: "Overview",
      navFocus: "Focus",
      navJourney: "Journey",
      navCertifications: "Certifications",
      navContact: "Contact",
      clockLabel: "Bangkok time",
      heroEyebrow: "Available for growth, labs, and real-world security practice",
      heroSubtitle: "D0R07HY / Computer Science Student / Aspiring Penetration Tester",
      heroSummary: "I am a second-year Computer Science student at Mahasarakham University building a portfolio around offensive security, hands-on lab work, and continuous cybersecurity learning. My goal is to grow from structured coursework into real penetration testing practice through labs, CTFs, reconnaissance exercises, and disciplined technical study.",
      heroPrimaryButton: "View certifications",
      heroSecondaryButton: "Open GitHub",
      signalAcademicLabel: "Academic stage",
      signalAcademicValue: "Year 2",
      signalCertificatesLabel: "Certificates earned",
      signalFocusLabel: "Primary focus",
      signalBaseLabel: "Base",
      signalBaseValue: "Thailand",
      quickTitle: "Mission Snapshot",
      quickRoleLabel: "Current role",
      quickRoleValue: "CS Student",
      quickUniversityLabel: "University",
      quickUniversityValue: "Mahasarakham University",
      quickStyleLabel: "Learning style",
      quickStyleValue: "Labs, CTFs, self-study",
      quickGoalLabel: "Long-term goal",
      quickGoalValue: "Graduate studies in Germany",
      focusLabel: "Focus",
      focusTitle: "What this portfolio is built to show",
      focusIntro: "This version of my portfolio is designed to present not just interest, but direction. It highlights where I am now, how I practice, and what kind of cybersecurity work I am deliberately preparing for next.",
      focusCard1Code: "01 / Recon mindset",
      focusCard1Title: "Offensive security fundamentals",
      focusCard1Body: "I focus on understanding how attackers think: reconnaissance, scanning, surface mapping, and identifying where security assumptions fail before exploitation even begins.",
      focusCard2Code: "02 / Practical learning",
      focusCard2Title: "Hands-on labs over passive theory",
      focusCard2Body: "My strongest learning happens through active practice. I regularly explore wargames, CTF-style environments, and guided cybersecurity material to turn abstract concepts into repeatable workflows.",
      focusCard3Code: "03 / Professional growth",
      focusCard3Title: "Early-stage, but serious about the path",
      focusCard3Body: "I am still in the student phase, so I position myself honestly: not as a finished expert, but as someone building solid foundations with clear goals in penetration testing and red team methodology.",
      journeyLabel: "Journey",
      journeyTitle: "How I am building toward security work",
      journeyIntro: "My path is a mix of university study, certification milestones, and independent practice. The point is steady compounding: every lab, every challenge, and every certificate sharpens the next step.",
      journeyStep1Label: "Current foundation",
      journeyStep1Title: "Computer Science student with a cybersecurity direction",
      journeyStep1Body: "I am studying Computer Science while shaping my learning around cybersecurity topics that support offensive work: networking awareness, systems thinking, command-line confidence, and analytical problem solving.",
      journeyStep2Label: "Hands-on practice",
      journeyStep2Title: "Using labs, wargames, and tooling to build discipline",
      journeyStep2Body: "I spend time on exercises such as OverTheWire-style challenges, scanning practice with Nmap, and CTF-oriented problem solving. These activities help me connect theory with methodical execution.",
      journeyStep3Label: "Next objective",
      journeyStep3Title: "Prepare for internships, deeper labs, and advanced study",
      journeyStep3Body: "The near-term goal is to keep strengthening portfolio evidence through learning artifacts, technical practice, and better documentation. The long-term goal is graduate study in Germany and a stronger path into offensive security roles.",
      toolkitLabel: "Toolkit",
      toolkitTitle: "Core topics and tools I am actively developing",
      toolkitIntro: "This is the stack I currently associate most with my learning path. It is intentionally honest: these are areas I am practicing, not empty buzzwords added just to fill space.",
      certificationsLabel: "Certifications",
      certificationsTitle: "Proof of learning and recent milestones",
      certificationsIntro: "These certificates mark the path I have already started. They are not the end goal, but they do show consistency, curiosity, and a willingness to invest time into structured progress.",
      cert1Meta: "Rare track",
      cert1Title: "Cisco Ethical Hacker",
      cert1Body: "Focused on ethical hacking concepts and structured exposure to offensive security thinking.",
      cert2Meta: "CTF learning",
      cert2Title: "NCSA CTF Boot Camp",
      cert2Body: "Evidence of direct exposure to competitive security problem solving and challenge-based learning.",
      cert3Meta: "Foundation",
      cert3Title: "Introduction to Cybersecurity",
      cert3Body: "Built stronger grounding in cybersecurity concepts, terminology, and the broader security landscape.",
      cert4Meta: "MOOC",
      cert4Title: "Basic Cybersecurity",
      cert4Body: "Structured learning around essential security principles and practical awareness for future specialization.",
      cert5Meta: "Workflow",
      cert5Title: "GitHub for Developer",
      cert5Body: "Supports cleaner version-control habits, collaboration readiness, and a more disciplined project workflow.",
      certOpenVerification: "Open verification",
      certOpenCertificate: "Open certificate",
      bringCode: "What I bring now",
      bringTitle: "Curiosity with structure",
      bringItem1: "I learn best by testing concepts in practice rather than stopping at theory.",
      bringItem2: "I am building a portfolio that reflects direction, not exaggeration.",
      bringItem3: "I care about understanding why systems work, fail, and become vulnerable.",
      buildCode: "What I am building next",
      buildTitle: "Clearer technical proof",
      buildItem1: "More documented lab work and challenge-based write-ups.",
      buildItem2: "Deeper web and network security practice through repeatable exercises.",
      buildItem3: "A stronger body of work for internships, collaborations, and advanced study.",
      contactLabel: "Contact",
      contactTitle: "Open to learning opportunities and serious collaboration",
      contactBody: "If you are looking for a student who is genuinely committed to cybersecurity growth, I would be glad to connect. I am especially interested in opportunities that strengthen offensive security fundamentals, practical lab experience, and disciplined technical development.",
      contactNote: "Best fit: internships, student collaborations, CTF teams, and communities that value consistent hands-on improvement.",
      supportTitle: "Support my learning journey",
      supportBody: "If you want to support the labs, certifications, and self-study work behind this portfolio, you can do that here.",
      supportCoffee: "Buy Me a Coffee",
      supportKofi: "Ko-fi Support",
      contactOpen: "Open",
      contactLocationTitle: "Location",
      contactLocationValue: "Maha Sarakham, Thailand",
      contactLocationTag: "Base",
      contactDirectionTitle: "Primary direction",
      contactDirectionValue: "Offensive security / penetration testing",
      contactDirectionTag: "Focus",
      footerText: "Built as a security-conscious portfolio with a cyber-inspired visual system."
    },
    th: {
      pageTitle: "D0R07HY | พอร์ตโฟลิโอด้านความปลอดภัยไซเบอร์",
      brandSubtitle: "พอร์ตโฟลิโอด้าน Offensive Security",
      navOverview: "ภาพรวม",
      navFocus: "จุดโฟกัส",
      navJourney: "เส้นทาง",
      navCertifications: "ใบรับรอง",
      navContact: "ติดต่อ",
      clockLabel: "เวลาประเทศไทย",
      heroEyebrow: "พร้อมเติบโต ผ่านแล็บ การฝึกจริง และงานด้านความปลอดภัยไซเบอร์",
      heroSubtitle: "D0R07HY / นักศึกษา CS / ผู้ที่กำลังพัฒนาไปสาย Penetration Testing",
      heroSummary: "ผมเป็นนักศึกษาวิทยาการคอมพิวเตอร์ชั้นปีที่ 2 จากมหาวิทยาลัยมหาสารคาม ที่กำลังสร้างพอร์ตโฟลิโอรอบด้าน offensive security การฝึกแบบลงมือทำ และการเรียนรู้ด้านไซเบอร์อย่างต่อเนื่อง เป้าหมายของผมคือพัฒนาจากพื้นฐานในห้องเรียนไปสู่การฝึก penetration testing อย่างจริงจังผ่านแล็บ CTF งาน reconnaissance และการศึกษาทางเทคนิคอย่างมีวินัย",
      heroPrimaryButton: "ดูใบรับรอง",
      heroSecondaryButton: "เปิด GitHub",
      signalAcademicLabel: "สถานะการศึกษา",
      signalAcademicValue: "ปี 2",
      signalCertificatesLabel: "จำนวนใบรับรอง",
      signalFocusLabel: "สายที่โฟกัส",
      signalBaseLabel: "ฐานที่ตั้ง",
      signalBaseValue: "ประเทศไทย",
      quickTitle: "สรุปภารกิจ",
      quickRoleLabel: "บทบาทปัจจุบัน",
      quickRoleValue: "นักศึกษา CS",
      quickUniversityLabel: "มหาวิทยาลัย",
      quickUniversityValue: "มหาวิทยาลัยมหาสารคาม",
      quickStyleLabel: "รูปแบบการเรียนรู้",
      quickStyleValue: "แล็บ, CTF, self-study",
      quickGoalLabel: "เป้าหมายระยะยาว",
      quickGoalValue: "เรียนต่อระดับบัณฑิตศึกษาในเยอรมนี",
      focusLabel: "จุดโฟกัส",
      focusTitle: "พอร์ตโฟลิโอนี้ถูกสร้างมาเพื่อสื่ออะไร",
      focusIntro: "เวอร์ชันนี้ของพอร์ตโฟลิโอถูกออกแบบมาเพื่อสื่อไม่ใช่แค่ความสนใจ แต่รวมถึงทิศทางด้วย ว่าตอนนี้ผมอยู่จุดไหน ฝึกอย่างไร และกำลังเตรียมตัวไปสู่งานไซเบอร์รูปแบบใด",
      focusCard1Code: "01 / แนวคิดด้าน Recon",
      focusCard1Title: "พื้นฐานด้าน Offensive Security",
      focusCard1Body: "ผมให้ความสำคัญกับการเข้าใจวิธีคิดของผู้โจมตี เช่น reconnaissance การสแกน การสำรวจพื้นผิวระบบ และการมองหาจุดที่สมมติฐานด้านความปลอดภัยเริ่มล้มเหลวก่อนถึงขั้น exploitation",
      focusCard2Code: "02 / การเรียนรู้เชิงปฏิบัติ",
      focusCard2Title: "ให้แล็บสำคัญกว่าทฤษฎีล้วน",
      focusCard2Body: "การเรียนรู้ที่ดีที่สุดของผมเกิดจากการลงมือทำ ผมสำรวจ wargames, สภาพแวดล้อมแบบ CTF และเนื้อหาไซเบอร์แบบมีโครงสร้างอย่างสม่ำเสมอ เพื่อเปลี่ยนแนวคิดนามธรรมให้เป็น workflow ที่ทำซ้ำได้",
      focusCard3Code: "03 / การเติบโตแบบมืออาชีพ",
      focusCard3Title: "ยังอยู่ช่วงต้น แต่จริงจังกับเส้นทางนี้",
      focusCard3Body: "ตอนนี้ผมยังอยู่ในช่วงนักศึกษา จึงวางตำแหน่งตัวเองอย่างตรงไปตรงมา ไม่ได้อ้างว่าเป็นผู้เชี่ยวชาญที่สมบูรณ์แล้ว แต่เป็นคนที่กำลังสร้างพื้นฐานให้แน่นพร้อมเป้าหมายชัดเจนด้าน penetration testing และ red team methodology",
      journeyLabel: "เส้นทาง",
      journeyTitle: "ผมกำลังพัฒนาตัวเองสู่งานสายความปลอดภัยอย่างไร",
      journeyIntro: "เส้นทางของผมเป็นการผสมกันระหว่างการเรียนในมหาวิทยาลัย หมุดหมายจากใบรับรอง และการฝึกด้วยตัวเอง หัวใจคือการสะสมทีละขั้น ทุกแล็บ ทุกโจทย์ และทุกใบรับรองช่วยต่อยอดก้าวถัดไป",
      journeyStep1Label: "ฐานปัจจุบัน",
      journeyStep1Title: "นักศึกษา Computer Science ที่มีทิศทางด้านไซเบอร์",
      journeyStep1Body: "ผมกำลังเรียน Computer Science ควบคู่กับการจัดเส้นทางการเรียนรู้ให้เอนไปทางหัวข้อที่สนับสนุนงาน offensive เช่น ความเข้าใจด้านเครือข่าย การคิดเชิงระบบ ความคล่องตัวกับ command line และการวิเคราะห์ปัญหา",
      journeyStep2Label: "การฝึกลงมือจริง",
      journeyStep2Title: "ใช้แล็บ, wargames และเครื่องมือเพื่อสร้างวินัย",
      journeyStep2Body: "ผมใช้เวลากับโจทย์อย่าง OverTheWire การฝึกสแกนด้วย Nmap และการแก้ปัญหาในรูปแบบ CTF เพื่อเชื่อมทฤษฎีเข้ากับการลงมือทำอย่างเป็นระบบ",
      journeyStep3Label: "เป้าหมายถัดไป",
      journeyStep3Title: "เตรียมตัวสู่ฝึกงาน แล็บที่ลึกขึ้น และการเรียนต่อ",
      journeyStep3Body: "เป้าหมายระยะใกล้คือสร้างหลักฐานในพอร์ตโฟลิโอให้แข็งแรงขึ้นผ่านผลงานการเรียนรู้ การฝึกทางเทคนิค และการทำ documentation ที่ดีขึ้น ส่วนระยะยาวคือการเรียนต่อในเยอรมนีและพัฒนาสู่บทบาทด้าน offensive security ที่ชัดเจนกว่าเดิม",
      toolkitLabel: "ทูลคิต",
      toolkitTitle: "หัวข้อและเครื่องมือหลักที่ผมกำลังพัฒนา",
      toolkitIntro: "นี่คือชุดทักษะที่สะท้อนเส้นทางการเรียนรู้ของผมในตอนนี้ โดยตั้งใจให้ซื่อสัตย์ต่อความจริงว่าเป็นสิ่งที่ผมกำลังฝึก ไม่ใช่ buzzword ที่ใส่มาเพื่อให้ดูเต็มหน้า",
      certificationsLabel: "ใบรับรอง",
      certificationsTitle: "หลักฐานการเรียนรู้และหมุดหมายล่าสุด",
      certificationsIntro: "ใบรับรองเหล่านี้สะท้อนเส้นทางที่ผมเริ่มเดินมาแล้ว มันไม่ใช่ปลายทางสุดท้าย แต่แสดงให้เห็นถึงความสม่ำเสมอ ความอยากรู้อยากเรียน และความตั้งใจที่จะลงทุนเวลากับการพัฒนาอย่างเป็นระบบ",
      cert1Meta: "สายหายาก",
      cert1Title: "Cisco Ethical Hacker",
      cert1Body: "สะท้อนการเรียนรู้ด้าน ethical hacking และการได้สัมผัสกรอบคิดแบบ offensive security อย่างเป็นระบบ",
      cert2Meta: "การเรียนรู้แบบ CTF",
      cert2Title: "NCSA CTF Boot Camp",
      cert2Body: "เป็นหลักฐานของการได้สัมผัสการแก้ปัญหาเชิงแข่งขันด้านความปลอดภัยและการเรียนรู้ผ่านโจทย์จริง",
      cert3Meta: "พื้นฐาน",
      cert3Title: "Introduction to Cybersecurity",
      cert3Body: "ช่วยสร้างความเข้าใจพื้นฐานด้านไซเบอร์ ทั้งด้านแนวคิด คำศัพท์ และภาพรวมของโลกความปลอดภัย",
      cert4Meta: "MOOC",
      cert4Title: "Basic Cybersecurity",
      cert4Body: "เป็นการเรียนรู้แบบมีโครงสร้างในเรื่องหลักการความปลอดภัยที่จำเป็นและการเตรียมตัวสู่การต่อยอดเฉพาะทาง",
      cert5Meta: "Workflow",
      cert5Title: "GitHub for Developer",
      cert5Body: "ช่วยเสริมวินัยด้าน version control ความพร้อมในการทำงานร่วมกับผู้อื่น และ workflow ของการพัฒนาโปรเจกต์",
      certOpenVerification: "เปิดลิงก์ยืนยัน",
      certOpenCertificate: "เปิดใบรับรอง",
      bringCode: "สิ่งที่ผมนำมาได้ตอนนี้",
      bringTitle: "ความอยากรู้อยากเห็นที่มีโครงสร้าง",
      bringItem1: "ผมเรียนรู้ได้ดีที่สุดจากการลงมือทดสอบแนวคิดจริง มากกว่าหยุดอยู่แค่ทฤษฎี",
      bringItem2: "ผมกำลังสร้างพอร์ตโฟลิโอที่สะท้อนทิศทาง ไม่ใช่การพูดเกินจริง",
      bringItem3: "ผมสนใจที่จะเข้าใจว่าระบบทำงาน ล้มเหลว และเกิดช่องโหว่ได้อย่างไร",
      buildCode: "สิ่งที่กำลังสร้างต่อ",
      buildTitle: "หลักฐานเชิงเทคนิคที่ชัดขึ้น",
      buildItem1: "งานแล็บและ write-up จากโจทย์ที่บันทึกไว้อย่างเป็นระบบมากขึ้น",
      buildItem2: "การฝึกด้าน web และ network security ที่ลึกขึ้นผ่านแบบฝึกหัดที่ทำซ้ำได้",
      buildItem3: "ฐานผลงานที่แข็งแรงขึ้นสำหรับฝึกงาน การร่วมงาน และการเรียนต่อ",
      contactLabel: "ติดต่อ",
      contactTitle: "เปิดรับโอกาสการเรียนรู้และความร่วมมือที่จริงจัง",
      contactBody: "หากคุณกำลังมองหานักศึกษาที่ตั้งใจเติบโตในสาย cybersecurity อย่างจริงจัง ผมยินดีอย่างมากที่จะได้เชื่อมต่อ ผมสนใจเป็นพิเศษกับโอกาสที่ช่วยเสริมพื้นฐาน offensive security ประสบการณ์แล็บเชิงปฏิบัติ และการพัฒนาทางเทคนิคอย่างมีวินัย",
      contactNote: "เหมาะที่สุดกับ: ฝึกงาน ความร่วมมือของนักศึกษา ทีม CTF และคอมมูนิตี้ที่ให้คุณค่ากับการพัฒนาแบบลงมือทำอย่างสม่ำเสมอ",
      supportTitle: "สนับสนุนเส้นทางการเรียนรู้ของผม",
      supportBody: "หากคุณอยากช่วยสนับสนุนแล็บ ใบรับรอง และการเรียนรู้ด้วยตัวเองที่อยู่เบื้องหลังพอร์ตโฟลิโอนี้ สามารถสนับสนุนได้ที่นี่",
      supportCoffee: "เลี้ยงกาแฟผม",
      supportKofi: "สนับสนุนผ่าน Ko-fi",
      contactOpen: "เปิด",
      contactLocationTitle: "สถานที่",
      contactLocationValue: "มหาสารคาม, ประเทศไทย",
      contactLocationTag: "ฐาน",
      contactDirectionTitle: "สายที่มุ่งไป",
      contactDirectionValue: "Offensive security / penetration testing",
      contactDirectionTag: "โฟกัส",
      footerText: "สร้างเป็นพอร์ตโฟลิโอที่ใส่ใจเรื่อง security พร้อมงานภาพในธีม cyber"
    }
  };

  function getHeroNameLines(lang) {
    if (!heroHeading) {
      return [];
    }

    const source = lang === "th"
      ? (heroHeading.dataset.nameTh || heroHeading.dataset.nameEn || "")
      : (heroHeading.dataset.nameEn || "");
    return source
      .split("|")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function renderHeroHeading(lang) {
    if (!heroHeading) {
      return;
    }

    const lines = getHeroNameLines(lang);
    const fallbackLabel = heroHeading.dataset.nameEn || "";
    const joinedName = lines.join(" ").trim() || fallbackLabel.replaceAll("|", " ").trim();

    heroHeading.replaceChildren();
    heroHeading.setAttribute("aria-label", joinedName);

    lines.forEach((text, lineIndex) => {
      const line = document.createElement("span");
      line.className = "split-line";
      line.dataset.splitText = text;
      line.style.setProperty("--line-index", String(lineIndex));
      heroHeading.appendChild(line);
    });

    setupSplitHeading();

    if (heroHeading.closest(".is-visible")) {
      heroHeading.classList.add("is-visible");
    } else {
      heroHeading.classList.remove("is-visible");
    }
  }

  function setLanguage(lang) {
    const currentLang = translations[lang] ? lang : "en";
    const dictionary = translations[currentLang];
    const root = document.documentElement;
    const blockDuration = 220;
    const blockGap = 120;
    const headerBlock = document.querySelector(".site-header[data-lang-block]");

    root.lang = currentLang;

    langBlocks.forEach((block, index) => {
      const blockNodes = Array.from(block.querySelectorAll("[data-i18n]"));
      const startDelay = index * blockGap;

      window.setTimeout(() => {
        block.classList.add("is-switching");
      }, startDelay);

        window.setTimeout(() => {
          blockNodes.forEach((node) => {
            const key = node.dataset.i18n;
            if (dictionary[key] !== undefined) {
              node.textContent = dictionary[key];
            }
          });

          renderHeroHeading(currentLang);

          if (block === headerBlock) {
            document.title = dictionary.pageTitle;
            langButtons.forEach((button) => {
              button.classList.toggle("active", button.dataset.lang === currentLang);
          });
          localStorage.setItem("portfolio_lang", currentLang);
        }
      }, startDelay + (blockDuration * 0.5));

      window.setTimeout(() => {
        block.classList.remove("is-switching");
      }, startDelay + blockDuration);
    });
  }

  function updateClock() {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Bangkok",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).format(now);
    clockEl.textContent = formatted;
  }

  function setupCursorGlow() {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      return;
    }

    const root = document.documentElement;
    const glow = document.querySelector(".cursor-glow");
    const dot = document.querySelector(".cursor-dot");
    const hoverTargets = document.querySelectorAll("a, button, .cert-card, .contact-link, .tag");
    let pointerX = -140;
    let pointerY = -140;
    let glowX = pointerX;
    let glowY = pointerY;
    let frameId = 0;

    root.classList.add("custom-cursor-ready");

    const moveCursor = () => {
      glowX += (pointerX - glowX) * 0.34;
      glowY += (pointerY - glowY) * 0.34;
      glow.style.setProperty("--cursor-x", `${glowX}px`);
      glow.style.setProperty("--cursor-y", `${glowY}px`);
      dot.style.setProperty("--cursor-x", `${pointerX}px`);
      dot.style.setProperty("--cursor-y", `${pointerY}px`);
      frameId = requestAnimationFrame(moveCursor);
    };

    const showCursor = () => root.classList.add("cursor-active");
    const hideCursor = () => {
      root.classList.remove("cursor-active", "cursor-hover");
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    window.addEventListener("pointermove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      showCursor();

      if (!frameId) {
        frameId = requestAnimationFrame(moveCursor);
      }
    }, { passive: true });

    window.addEventListener("pointerout", (event) => {
      if (!event.relatedTarget) {
        hideCursor();
      }
    });
    window.addEventListener("blur", hideCursor);
    hoverTargets.forEach((target) => {
      target.addEventListener("pointerenter", () => root.classList.add("cursor-hover"));
      target.addEventListener("pointerleave", () => root.classList.remove("cursor-hover"));
    });
  }

  function activateNav() {
    let current = sections[0];

    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= 140) {
        current = sections[i];
        break;
      }
    }

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
    });
  }

  function setupSplitHeading() {
    const splitLines = Array.from(document.querySelectorAll(".split-line[data-split-text]"));

    splitLines.forEach((line, lineIndex) => {
      const text = line.dataset.splitText || line.textContent || "";
      line.textContent = "";

      Array.from(text).forEach((char, charIndex) => {
        const span = document.createElement("span");
        span.className = "split-char";
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.setProperty("--char-delay", `${(lineIndex * 180) + (charIndex * 28)}ms`);
        line.appendChild(span);
      });
    });
  }

  function setupMagnetButtons() {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      return;
    }

    document.querySelectorAll(".button-magnet").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        const moveX = Math.max(-10, Math.min(10, offsetX * 0.16));
        const moveY = Math.max(-8, Math.min(8, offsetY * 0.16));
        button.style.setProperty("--magnet-x", `${moveX}px`);
        button.style.setProperty("--magnet-y", `${moveY}px`);
      });

      button.addEventListener("pointerleave", () => {
        button.style.setProperty("--magnet-x", "0px");
        button.style.setProperty("--magnet-y", "0px");
      });
    });
  }

  function setupCertificateSpotlight() {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!supportsFinePointer) {
      return;
    }

    document.querySelectorAll(".cert-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--spotlight-x", `${x}%`);
        card.style.setProperty("--spotlight-y", `${y}%`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--spotlight-x", "50%");
        card.style.setProperty("--spotlight-y", "50%");
      });
    });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  }, {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.14
  });

  revealItems.forEach((item) => revealObserver.observe(item));
  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });

  window.addEventListener("scroll", activateNav, { passive: true });
  window.addEventListener("load", activateNav);
  renderHeroHeading("en");
  setupMagnetButtons();
  setupCertificateSpotlight();
  setupCursorGlow();
  setLanguage(localStorage.getItem("portfolio_lang") || "en");
  updateClock();
  setInterval(updateClock, 1000);
  yearEl.textContent = new Date().getFullYear();

  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let stars = [];

  function resizeCanvas() {
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
  }

  function drawStars() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#e9f1ff";

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

    requestAnimationFrame(drawStars);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  drawStars();
