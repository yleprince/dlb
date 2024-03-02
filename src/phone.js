document.addEventListener("DOMContentLoaded", function() {
    const phoneBanner = document.getElementById("phone-banner");
    const phonePopup = document.getElementById("phone-popup");
    const phoneCancelCall = document.getElementById("phone-cancel-call");

    phoneBanner.addEventListener("click", function() {
        phonePopup.classList.remove("hidden");
    });

    phoneCancelCall.addEventListener("click", function() {
        phonePopup.classList.add("hidden");
    });
});


