# How to Run HSA & SONS Website

This guide provides simple, short steps on how to open and run the website on your laptop for testing and during your face-to-face Viva Voce.

---

## Option 1: Double-Click Method (Fastest — No Terminal Needed)

Because this website is built with pure static HTML5, CSS3, and Vanilla JavaScript, you don't even need a server:

1. Open the project folder: `WEB ASSINGMENT`.
2. Locate the file **`index.html`**.
3. **Double-click `index.html`** (or right-click $\rightarrow$ *Open with* $\rightarrow$ *Google Chrome* / *Microsoft Edge*).
4. The website will open immediately in your browser with full functionality!

---

## Option 2: Local Web Server (Recommended for Viva Presentation)

If your instructor prefers running over a local server:

1. Open **PowerShell** or **Command Prompt** inside the `WEB ASSINGMENT` folder.
2. Run this single command:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and go to:
   👉 **http://localhost:8000**
4. To stop the server when you are done, press `Ctrl + C` in the terminal.

---

## Which File Does What?

| File | Page Purpose | Key Features to Show in Viva |
|---|---|---|
| **`index.html`** | **Home Page** | Showroom hero slider/carousel, brand value strip, door categories, client reviews. |
| **`about.html`** | **About Us** | 40+ years timber heritage, seasoning process, and the **3 Lahore Branches Table**. |
| **`products.html`** | **Timber & Door Catalog** | **Interactive Category Filter Tabs** (Raw Timber, Solid Wood, Ply, PVC/Fiber) & **Specs Modal Lightbox**. |
| **`gallery.html`** | **Project Portfolio** | Real door installations across Lahore with **Click-to-Enlarge Lightbox**. |
| **`contact.html`** | **Contact & Quote** | Branch addresses, timings, and **Client-Side Form Validation** (name, 11-digit phone, email). |
| **`viva_preparation_guide.md`** | **Viva Study Guide** | Line-by-line explanation of all HTML tags, CSS Box Model/Flexbox/Grid, and JS functions. |

---

## Quick Tip for Viva Day:
- Open your laptop and have `index.html` already open in Chrome before your viva begins.
- Have your GitHub repository open in a second tab:  
  **https://github.com/ab-rahman4/HSA-SONS-TRADERS**
