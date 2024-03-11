document.addEventListener('DOMContentLoaded', function (e) {
    const consent = document.querySelector("#consent-users")
    function toggleConsent() {
        consent.classList.toggle("form-panel_shown");
        document.body.classList.toggle('menu-open');
    }
    if (consent) {
        setTimeout(toggleConsent, 5000);
        consent.querySelector(".btn_primary").addEventListener("click",toggleConsent)
    }
})