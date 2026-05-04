if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .then((registration) => registration.update())
      .catch(() => {
        // Ignore registration errors on unsupported environments.
      });
  });
}

function startHeroLogoAnimation() {
  const logos = document.querySelectorAll(".hero-logo");
  if (!logos.length) {
    return;
  }

  const frames = [
    { src: "img/logo-original.png", duration: 2000 },
    { src: "img/logoDois.png", duration: 1000 },
  ];

  logos.forEach((logo) => {
    logo.src = frames[0].src;
    let frameIndex = 0;

    const tick = () => {
      frameIndex = (frameIndex + 1) % frames.length;
      const frame = frames[frameIndex];
      logo.src = frame.src;
      window.setTimeout(tick, frame.duration);
    };

    window.setTimeout(tick, frames[0].duration);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startHeroLogoAnimation);
} else {
  startHeroLogoAnimation();
}
