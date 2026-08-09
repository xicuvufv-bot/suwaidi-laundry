(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const wrap = (el, cls) => {
    if (el.classList.contains(cls)) return;
    el.classList.add(cls);
  };

  document.querySelectorAll(".reveal").forEach((el) => wrap(el, "reveal"));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  if (reduce) document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));

  const tiltEls = document.querySelectorAll(".tilt");
  if (tiltEls.length && !reduce) {
    tiltEls.forEach((el) => {
      let raf = null;
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateZ(4px)`;
        });
      };
      const onLeave = () => {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = "rotateY(0deg) rotateX(0deg)";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    });
  }

  const heroImg = document.querySelector(".hero-img");
  if (heroImg && !reduce) {
    const frame = heroImg.querySelector(".frame");
    const img = frame && frame.querySelector("img");
    heroImg.addEventListener("mousemove", (e) => {
      const r = heroImg.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (frame) frame.style.transform = `translateY(0) rotateY(${x * 7}deg) rotateX(${y * -7}deg)`;
      if (img) img.style.transform = `translate(${x * -14}px, ${y * -10}px) scale(1.08)`;
    });
    heroImg.addEventListener("mouseleave", () => {
      if (frame) frame.style.transform = "";
      if (img) img.style.transform = "";
    });
  }

  const hero = document.querySelector(".hero.artbg");
  if (hero && !reduce) {
    const bg = hero.querySelector(".bg-img img");
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (bg) bg.style.transform = `translateY(${y * 0.18}px) scale(1.12)`;
    }, { passive: true });
  }
})();
