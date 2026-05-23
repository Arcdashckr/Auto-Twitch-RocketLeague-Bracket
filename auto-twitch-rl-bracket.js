// ==UserScript==
// @name            Auto Twitch RocketLeague Bracket
// @name:tr         Otomatik Twitch Rocket League Tablo
// @namespace       https://github.com/Arcdashckr/Auto-Twitch-RocketLeague-Bracket
// @version         1.3
// @description     Automatically finds the bracket link in Rocket League chats and injects a shortcut button.
// @description:tr  Twitch sohbetindeki bracket linkini otomatik bulur ve bir kısayol butonu ekler.
// @author          Arcdashckr
// @match           https://www.twitch.tv/*
// @icon            https://www.pngkey.com/png/full/15-158249_rocket-league-logo.png
// @grant           none
// @license         MIT
// @supportURL      https://github.com/Arcdashckr/Auto-Twitch-RocketLeague-Bracket/issues
// @updateURL       https://github.com/Arcdashckr/Auto-Twitch-RocketLeague-Bracket/raw/main/auto-twitch-rl-bracket.js
// @downloadURL     https://github.com/Arcdashckr/Auto-Twitch-RocketLeague-Bracket/raw/main/auto-twitch-rl-bracket.js
// ==/UserScript==

(function() {
    'use strict';

    const ALLOWED_CHANNELS = ['rocketleague', 'rlesports', 'rocketbaguette', 'rocketstreetlive', 'therocketrb', 'rocketleaguemena', 'rocketleagueoce', 'rocketleaguesam', 'rocketleagueapac'];

    // CSS Styles for our custom button
    const bracket_button_styles = document.createElement("style");
    bracket_button_styles.innerText = `
        .bracket-opener-wrapper {
            cursor: pointer !important;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 3rem;
            height: 3rem;
            position: relative;
        }

        .bracket-opener-wrapper:hover {
            border-radius: 50%;
            background-color: var(--color-background-button-text-hover);
        }

        #bracket-opener-btn {
            border: 0;
            background: transparent;
            color: #fff;
            width: 100%;
            height: 100%;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #bracket-opener-btn svg {
        fill: currentColor;
        }
    `;
    document.head.appendChild(bracket_button_styles);

    const isAllowedChannel = () => {
        const path = window.location.pathname.replace('/', '').toLowerCase();
        return ALLOWED_CHANNELS.includes(path);
    };

    /**
     * Logic:
     * 1. Search for messages containing "bracket" (case-insensitive) and grab the link.
     * 2. OR search for any link that contains "liquipedia.net/rocketleague/".
     */
    const findBracketLink = () => {
        const xpath = `
            (
                //div[contains(@class, 'chat-line__message')]
                [
                    descendant::*[contains(translate(text(), 'BRACKET', 'bracket'), 'bracket')]
                    or
                    descendant::p[contains(translate(@title, 'BRACKET', 'bracket'), 'bracket')]
                    or
                    descendant::a[contains(@href, 'liquipedia.net/rocketleague/Rocket_League_Championship_Series/')]
                ]
                //a[contains(@href, 'http')]
            )[last()]`;

        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue ? result.singleNodeValue.href : null;
    };

    const injectBracketButton = (link) => {
    const parentContainer = document.querySelector('[data-test-selector="chat-input-buttons-container"]');
    if (!parentContainer) return;

    const targetDiv = parentContainer.children[1];
    if (!targetDiv) return;

    let wrapper = document.getElementById("bracket-opener-wrapper");
    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.id = "bracket-opener-wrapper";
        wrapper.className = "bracket-opener-wrapper";

        const btn = document.createElement("button");
        btn.id = "bracket-opener-btn";
        btn.title = "Open Tournament Bracket";
        btn.innerHTML = `
            <div style="width: 20px; height: 20px; fill: currentColor; display: flex;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M256 144C256 117.5 277.5 96 304 96L336 96C362.5 96 384 117.5 384 144L384 496C384 522.5 362.5 544 336 544L304 544C277.5 544 256 522.5 256 496L256 144zM64 336C64 309.5 85.5 288 112 288L144 288C170.5 288 192 309.5 192 336L192 496C192 522.5 170.5 544 144 544L112 544C85.5 544 64 522.5 64 496L64 336zM496 160L528 160C554.5 160 576 181.5 576 208L576 496C576 522.5 554.5 544 528 544L496 544C469.5 544 448 522.5 448 496L448 208C448 181.5 469.5 160 496 160z"/>
                </svg>
            </div>`;

        wrapper.appendChild(btn);
        targetDiv.appendChild(wrapper);
    }

    wrapper.onclick = (e) => {
        e.preventDefault();
        window.open(link, '_blank');
    };
};

    const run = () => {
        if (!isAllowedChannel()) {
            const wrapper = document.getElementById("bracket-opener-wrapper");
            if (wrapper) wrapper.remove();
            return;
        }

        const link = findBracketLink();
        if (link) {
            injectBracketButton(link);
        }
    };

    let timeout = null;
    const observer = new MutationObserver(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(run, 150);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('popstate', run);
})();