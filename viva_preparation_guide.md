# HSA & SONS - Viva Voce Preparation Guide
**Course:** Web Technologies (Assignment 01)  
**Instructor:** Dr. Noman Shafi  
**Student Topic:** Multi-Page Static Website for *HSA & SONS (Doors & Wood Specialists, Lahore)*

---

## 1. Project Overview (Your 30-Second Opening Pitch)
> "Good morning / afternoon, Sir. For Assignment 1, I have developed a complete 5-page static website for my business, **HSA & SONS**, an authentic timber and door manufacturing firm established in 1984 in Lahore with 3 active branches (Ravi Road, Ferozepur Road, and Gulberg).
> 
> The website is built entirely from scratch using **pure HTML5 semantic tags, pure CSS3 (Flexbox and CSS Grid), and vanilla JavaScript** without any external libraries or backend frameworks. It includes a responsive navigation bar with mobile hamburger toggle, an automated hero slider with manual controls, dynamic product category filtering, an interactive modal lightbox for door specifications, and robust client-side form validation."

---

## 2. HTML5 Structure & Semantic Tags Questions

### Q: Why did you use semantic tags instead of just using `<div>` tags everywhere?
**Answer:**
- **Accessibility (Screen Readers):** Assistive technologies can identify navigation landmarks (`<nav>`), main reading sections (`<main>`), and headers/footers.
- **Search Engine Optimization (SEO):** Search engines understand the hierarchy and importance of the content.
- **Code Readability & Maintainability:** Other developers can easily navigate the document structure without getting lost in nested `<div>`s.

### Q: Explain the semantic tags you used across your pages:
| Tag | Where You Used It | Why You Chose It |
|---|---|---|
| `<aside>` | Top bar (`.top-bar`) | Represents secondary information (phone helpline, working hours) tangentially related to the main content. |
| `<header>` | Site navigation bar & page banners | Contains introductory branding elements (logo, navigation links, page title). |
| `<nav>` | Main menu (`.navbar`) | Defines the primary navigational links connecting all 5 pages. |
| `<main>` | Core body content | Wraps the unique, dominant content of each specific page (excluding headers and footers). |
| `<section>` | Hero slider, categories, testimonials | Groups thematically related content with its own heading. |
| `<article>` | Individual product cards, feature boxes, review items | Represents a self-contained composition that makes sense independently. |
| `<table>` | Branches table (`about.html`) and Wood Comparison (`products.html`) | Used strictly for tabular, relational data (columns and rows), never for page layout. |
| `<footer>` | Bottom footer on all pages | Contains copyright notices, branch addresses, and repeated navigation links. |

---

## 3. CSS Layout & Design Concepts

### Q: What is the CSS Box Model?
**Answer:**
Every HTML element is rendered as a rectangular box consisting of 4 parts from inside to outside:
1. **Content:** The actual text or image (`width` and `height`).
2. **Padding:** The transparent space between the content and the border (e.g. inside a button).
3. **Border:** The line wrapping around the padding and content.
4. **Margin:** The clear space outside the border separating this element from other elements.
*Bonus tip:* Mention that you set `* { box-sizing: border-box; }` so that padding and border are included *inside* the element's specified width and height, preventing layout breakage.

### Q: Where did you use Flexbox vs. CSS Grid in your project?
**Answer:**
- **CSS Flexbox (1-Dimensional layout):**
  - Navigation bar (`.navbar`, `.nav-links`): Aligning logo on the left and menu links on the right along a single horizontal axis.
  - Top contact bar (`.top-bar .container`): Distributing phone numbers and timings evenly.
  - Button groups (`.hero-btn-group`): Arranging primary and secondary call-to-action buttons side-by-side.
- **CSS Grid (2-Dimensional layout):**
  - Product cards catalog (`.category-cards-grid`): Multi-column grid (`repeat(auto-fit, minmax(320px, 1fr))`) that automatically adapts columns based on screen width.
  - Gallery grid (`.gallery-grid`): Masonry-style grid of project photos.
  - Footer (`.footer-grid`): 4-column layout spanning across the bottom of the page.

### Q: How did you make the website responsive across mobile, tablet, and desktop?
**Answer:**
- Used the viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- Used responsive units like `%`, `rem`, and `fr`.
- Implemented **Media Queries** in `style.css`:
  - `@media (max-width: 992px)`: Changes the footer grid from 4 columns to 2 columns, and stacks the contact page layout into a single column.
  - `@media (max-width: 768px)`: Hides the top bar, displays the hamburger icon button, and converts `.nav-links` into a vertical dropdown menu that toggles with JavaScript.

---

## 4. JavaScript Logic & Interactivity

### Q: What does `document.addEventListener('DOMContentLoaded', ...)` do?
**Answer:**
It waits until the HTML document has been completely parsed by the browser before executing our JavaScript. This ensures that any element we look up using `document.getElementById` or `document.querySelectorAll` already exists in the DOM.

### Q: Explain how your Mobile Hamburger Menu works:
**Answer:**
1. We select `#hamburgerBtn` and `#navLinks` using `document.getElementById`.
2. We attach a `'click'` event listener to `#hamburgerBtn`.
3. Inside the callback function, we call `navLinks.classList.toggle('show')` and `hamburger.classList.toggle('active')`.
4. In CSS, `.nav-links.show` has `display: flex; flex-direction: column;`, which drops down the menu on mobile screens.

### Q: Explain how your Hero Slider / Carousel works on `index.html`:
**Answer:**
1. We select all slides using `document.querySelectorAll('.hero-slide')`.
2. A variable `currentSlide` tracks the currently visible slide index (starting at 0).
3. The function `showSlide(index)` removes the `.active` class from all slides and adds it to `slides[currentSlide]`.
4. In CSS, `.hero-slide` is hidden by default (`opacity: 0;`), and `.hero-slide.active` has `opacity: 1;`.
5. We set `setInterval(nextSlide, 5000)` to automatically rotate slides every 5 seconds, and attached click event listeners to `#prevSlide` and `#nextSlide` for manual navigation.

### Q: Explain how the Category Filter works on `products.html`:
**Answer:**
1. Each filter button has a `data-filter` attribute (e.g., `data-filter="solid-wood"`).
2. Each product card has a `data-category` attribute (e.g., `data-category="solid-wood"`).
3. When a button is clicked, we read `this.getAttribute('data-filter')`.
4. We loop over each card using `forEach`:
   - If the filter is `'all'` or matches the card's category, we set `item.style.display = 'block'`.
   - Otherwise, we set `item.style.display = 'none'`.

### Q: Explain your Client-Side Form Validation on `contact.html`:
**Answer:**
1. We listen for the `'submit'` event on `#quoteForm`.
2. We call `event.preventDefault()` to stop the browser from refreshing or navigating away.
3. We validate each field with JavaScript:
   - **Name:** Checks `value.trim().length >= 3`.
   - **Phone:** Regular expression check `/^03[0-9]{9}$/` for an 11-digit Pakistani mobile number.
   - **Email:** Regular expression check `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
   - **Door Type:** Ensures an option is chosen and not left empty.
   - **Message:** Checks `value.trim().length >= 10`.
4. If any field fails, we add `.input-error` (red border), display the `.error-message` span, and set `isValid = false`.
5. If all fields pass, we display a green success banner, reset the form with `contactForm.reset()`, and smoothly scroll to the confirmation.

---

## 5. Potential Live Code Modifications During Viva

The instructor may ask you: *"Can you change this right now?"* Here is how to do common requests:

### 1. "Change the hero slider speed from 5 seconds to 3 seconds"
- Open [main.js](file:///c:/Users/ABDUL%20RAHMAN/Desktop/WEB%20ASSINGMENT/js/main.js).
- Look for `slideInterval = setInterval(nextSlide, 5000);`.
- Change `5000` to `3000`.

### 2. "Change the gold accent color of the website"
- Open [style.css](file:///c:/Users/ABDUL%20RAHMAN/Desktop/WEB%20ASSINGMENT/css/style.css).
- In `:root` at the top (lines 14–15), change `--color-accent: #c88937;` to another color (e.g. `#d4af37` or `#b86d29`). Every button, title, and highlight will update automatically.

### 3. "Add a 4th branch to the table on the About page"
- Open [about.html](file:///c:/Users/ABDUL%20RAHMAN/Desktop/WEB%20ASSINGMENT/about.html).
- Find the `<tbody>` of `table.styled-table`.
- Duplicate a `<tr>...</tr>` row and update the branch name, address, and phone number.

### 4. "Add minimum length 5 characters instead of 3 for the name field in the contact form"
- Open [main.js](file:///c:/Users/ABDUL%20RAHMAN/Desktop/WEB%20ASSINGMENT/js/main.js).
- Find `if (!nameInput.value.trim() || nameInput.value.trim().length < 3)`.
- Change `< 3` to `< 5`.

---

## 6. How to Push All Branches to GitHub

Once you create an empty repository on your GitHub account:

```bash
# 1. Link your local project to your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 2. Push your main branch
git push -u origin main

# 3. Push all feature branches so your instructor sees your branching workflow
git push --all origin
```
