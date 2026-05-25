/* ============================================================
   EL PRINCE COMPANY — Verificação de idade (+18)
   Exibido na 1ª visita. Bloqueia menores conforme política da loja.
   ============================================================ */
(function () {
  const KEY = "elprince_age_ok";
  document.addEventListener("DOMContentLoaded", () => {
    const gate = document.getElementById("agegate");
    if (!gate) return;

    if (localStorage.getItem(KEY) === "1") { gate.classList.add("hidden"); return; }
    document.body.classList.add("no-scroll");

    const yes = document.getElementById("age-yes");
    const no = document.getElementById("age-no");
    if (yes) yes.onclick = () => {
      localStorage.setItem(KEY, "1");
      gate.classList.add("hidden");
      document.body.classList.remove("no-scroll");
    };
    if (no) no.onclick = (e) => {
      e.preventDefault();
      window.location.href = "https://www.google.com";
    };
  });
})();
