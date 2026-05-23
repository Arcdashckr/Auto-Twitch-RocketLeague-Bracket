<a alt="English" href="/README.md" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/language-English-blue?style=flat">
</a>
&nbsp;
<a alt="Turkish" href="/README-tr.md" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/language-Turkish-red?style=flat">
</a>
&nbsp;
<a alt="Greasy Fork Page" href="https://greasyfork.org/scripts/YOUR-LINK-HERE" target="_blank" style="text-decoration: none">
  <img src="https://img.shields.io/badge/Greasy_Fork-gray?style=flat&logo=greasyfork&logoColor=black">
</a>

# Auto Twitch Rocket League Bracket

A lightweight Tampermonkey/Userscript that automatically scans Twitch chat for tournament bracket links (specifically Liquipedia) and injects a convenient shortcut button directly into the Twitch chat interface.

## 🚀 Features

- **Automatic Detection:** Scans chat messages for keywords like "bracket" or direct Liquipedia links.
- **Seamless Integration:** Adds a custom Rocket League-themed button right next to the chat settings/bits buttons.
- **Smart Filtering:** Only runs on official and major Rocket League community channels (RocketLeague, RLEsports, etc.) to save resources.
- **Dynamic Updates:** Uses a MutationObserver to detect new messages and link changes instantly without refreshing the page.

## 🛠️ How It Works

1. The script monitors the Twitch chat container.
2. It uses **XPath** to find the most recent message containing a "bracket" link or a Liquipedia RLCS URL.
3. If a link is found, it injects a small SVG button into the chat input area.
4. Clicking the button opens the latest bracket in a new tab.

## 📦 Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension.
2. Click <a alt="Greasy Fork Page" href="https://update.greasyfork.org/scripts/579486/Auto%20Twitch%20RocketLeague%20Bracket.user.js" target="_blank" style="text-decoration: none">here</a>

## 📺 Preview
<img width="295" height="237" alt="image" src="https://github.com/user-attachments/assets/1ced586f-f928-4065-8840-6330124337d0" />
<img width="339" height="131" alt="image" src="https://github.com/user-attachments/assets/e62fc521-c3c0-46df-b8bf-390231bc3443" />

---
*Developed by **Arcdashckr***
