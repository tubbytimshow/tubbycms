import "./bootstrap";
import { initFlowbite, initPopovers } from "flowbite";

import "swiper/css";
import "swiper/css/pagination";

import { Livewire, Alpine } from "livewire";

import ThemeSwitcher from "./components/ThemeSwitcher.js";
import AtomSliders from "./components/AtomSliders.js";
import { initMatrixBackground } from "./src/matrix";

import "../../../js/components/HomeManager.js";

ThemeSwitcher.init();
AtomSliders.init();
initMatrixBackground();

window.Alpine = Alpine;

const livewireStartedKey = Symbol.for("atomcms.livewire.started");
const startLivewire = () => {
    if (window[livewireStartedKey]) {
        return;
    }

    window[livewireStartedKey] = true;

    try {
        Livewire.start();
    } catch (error) {
        delete window[livewireStartedKey];
        throw error;
    }
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startLivewire, {
        once: true,
    });
} else {
    startLivewire();
}

document.addEventListener("turbolinks:load", () => initFlowbite());
document.addEventListener("reactions:loaded", () => initPopovers());

console.log(
    "%cTubby Hotel%c\n\nRunning on Atom CMS, made for the community to enjoy. Join them at https://discord.gg/rX3aShUHdg\n\n",
    "color: #00ff66; -webkit-text-stroke: 2px black; font-size: 32px; font-weight: bold;",
    ""
);
