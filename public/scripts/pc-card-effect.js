document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector('.pc-card-wrapper');

  if (!wrapper) return;

  wrapper.addEventListener('mousemove', (e) => {
    const card = wrapper.querySelector('.pc-card');
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    wrapper.style.setProperty('--pointer-x', `${x * 100}%`);
    wrapper.style.setProperty('--pointer-y', `${y * 100}%`);
    wrapper.style.setProperty('--pointer-from-left', x);
    wrapper.style.setProperty('--pointer-from-top', y);
    wrapper.style.setProperty('--pointer-from-center', Math.abs(x - 0.5) + Math.abs(y - 0.5));

    const rotateX = (y - 0.5) * 20;
    const rotateY = (x - 0.5) * -20;

    wrapper.style.setProperty('--rotate-x', `${rotateY}deg`);
    wrapper.style.setProperty('--rotate-y', `${rotateX}deg`);
    wrapper.classList.add("active");
  });

  wrapper.addEventListener('mouseleave', () => {
    wrapper.classList.remove("active");
    wrapper.style.setProperty('--rotate-x', `0deg`);
    wrapper.style.setProperty('--rotate-y', `0deg`);
  });
});
