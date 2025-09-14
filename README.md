# The Coffee Corner — Static Frontend

Lightweight static website for a coffee shop with pages: Home, About, Menu, Gallery, Offers, Contact, and a demo Admin area.

This repository is intended to be served as static files (no backend required for the demo). The project includes an optional Node.js backend under `server/` that implements admin authentication using MySQL — see `server/README.md` if you want to enable it.

## What’s included

- index.html, about.html, menu.html, gallery.html, offers.html, contact.html
- admin/login.html and admin/dashboard.html (frontend demo login)
- script.js — site behaviors (navigation, fade-in animations, gallery lightbox, buy/rate demo handlers)
- style.css — global styles and responsive layout
- server/ — optional Node/Express backend (admin auth with MySQL). You can remove this folder if you only want static frontend.

## Quick frontend-only start

Open the folder in VS Code and open any `*.html` file in your browser (or use Live Server extension).

If you want a simple file server (PowerShell):

```powershell
# Serve current folder on port 8080 using Python (if installed)
python -m http.server 8080
# Then open http://localhost:8080/index.html in your browser
```

## Admin demo login

Admin pages use a front-end demo flow (not secure). To log in:

- Open `admin/login.html` and use the demo username/password contained in the page (or change them in the file). The login stores a front-end session flag in `sessionStorage`.

## Notes

- Many images reference Unsplash so pages display correctly even if local `images/` are not available.
- The backend code under `server/` is optional — see `server/README.md` for setup.

---

If you want, I can:

- Convert the admin demo to a secure backend-auth flow (enable the Node server and help set up MySQL), or
- Remove the `server/` folder and any backend artifacts to keep the repo purely static.

Tell me which you prefer and I’ll proceed.

## Copyright & Usage Warning

- Copyright: This project and the code files in this repository are provided for demonstration and development purposes. You retain ownership of any original content you added. Unless you explicitly add a different license file, assume this work is not licensed for commercial redistribution.
- Images: Many pages use images from Unsplash or other third-party sources. Those images are subject to their respective licenses (Unsplash license or the source's license). Review and replace any images you do not have rights to before using this site commercially.
- Attribution: If you publish or redistribute this site (even as a template), include proper attributions and ensure you have the right to use any included media or fonts.
- Security & Production: The demo admin/login and any sample server code are not production-ready. Do not deploy the backend to a public, production environment without hardening authentication, using HTTPS, securing database credentials, and following best practices.

If you'd like, I can add a LICENSE file (MIT, Apache 2.0, etc.) and create an `images/ATTRIBUTIONS.md` listing the sources and required attributions for the images used.
