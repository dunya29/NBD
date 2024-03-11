document.addEventListener('DOMContentLoaded', function (e) {
    const consent = document.querySelector("#consent-users")
    function toggleConsent() {
        consent.classList.toggle("show");
    }
    if (consent) {
        setTimeout(toggleConsent, 3000);
        consent.querySelector(".btn_primary").addEventListener("click",toggleConsent)
    }
})