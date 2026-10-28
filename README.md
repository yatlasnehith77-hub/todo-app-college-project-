# My Tasks - Responsive Todo Web Application

A clean, modern, and fully responsive Todo Web Application developed as a frontend college project. This application faithfully recreates the reference design with high visual fidelity, seamless UX, keyboard accessibility, and robust state persistence using browser `localStorage`.

---

## 📸 Overview & Design Highlights

- **Visual Fidelity**: Recreated with meticulous attention to typography, margins, paddings, shadows, and color palette (`#6366f1` indigo gradient, `#f7f7fc` soft background, `#24263b` text).
- **Responsive Layout**: Fluid design using CSS `clamp()`, `min()`, flexbox, and media queries for flawless display across desktop monitors, laptops, tablets, and smartphones.
- **Micro-interactions**: Subtle hover transitions on task rows, active filter pills, custom styled checkboxes, and intuitive delete buttons.
- **Accessibility**: Semantic HTML5 tags (`<main>`, `<header>`, `<section>`, `<nav>`, `<ul>`, `<li>`, `<footer>`), ARIA attributes, and accessible `:focus-visible` outline rings for keyboard-only navigation.

---

## 🚀 Features

1. **Add Tasks**:
   - Clean input field with placeholder `"What do you need to do?"`.
   - Empty input validation (prevents blank or whitespace-only submissions).
   - Maximum character limit of 200 characters to prevent overflow.

2. **Toggle Completion**:
   - Custom styled checkboxes with indigo accent color (`#6366f1`).
   - Clicking either the checkbox or task label toggles completion.
   - Completed tasks display muted color (`#a0a2af`) and strikethrough decoration.

3. **In-place Task Editing**:
   - Double-click on any task text to enter inline edit mode.
   - Press <kbd>Enter</kbd> or click outside to save changes.
   - Press <kbd>Esc</kbd> to discard changes.

4. **Task Deletion**:
   - Individual task removal using the `×` delete button.
   - Hover state highlights in soft red (`#fff0f0` background, `#dc2626` icon).

5. **Filtering**:
   - Three filter views: **All**, **Active**, and **Completed**.
   - Active filter is styled with an indigo pill background.

6. **Real-time Statistics**:
   - Live counters displaying **remaining tasks** and **completed tasks**.
   - Footer displaying **total tasks** count.

7. **Batch Action ("Clear Completed")**:
   - One-click button in the card footer to remove all completed tasks at once.
   - Automatically disabled when no tasks are completed.

8. **Empty States**:
   - Visual target icon (`🎯`) with contextual messages:
     - *"No tasks yet. Add your first task!"* when list is empty.
     - *"No tasks in this category."* when the selected filter has no matching tasks.

9. **Data Persistence**:
   - All tasks are saved automatically in `localStorage` under the key `todo-app-tasks`.
   - Data persists across browser refreshes and tab closures.
   - Default sample tasks provided on initial launch.

---

## 📁 Project Structure

```text
PRO/
├── index.html              # HTML entry point with metadata and title
├── package.json            # Project dependencies and npm scripts
├── vite.config.js          # Vite configuration with relative base path
├── public/
│   └── favicon.svg         # Gradient checkmark SVG favicon
├── src/
│   ├── main.jsx            # React root mount point
│   ├── App.jsx             # Main application component and state logic
│   └── App.css             # Complete design styling and responsive rules
└── README.md               # Project documentation and submission report
```

---

## 🛠️ Technology Stack

- **Frontend Library**: React 18 (Hooks: `useState`, `useEffect`, `useRef`)
- **Build Tool**: Vite 6
- **Styling**: Pure CSS3 (Flexbox, CSS Grid, CSS Variables, Media Queries)
- **Persistence**: Web Storage API (`localStorage`)
- **Language**: JavaScript (ES6+ Modules, JSX)

---

## 💻 How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Step 1: Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Open your browser and navigate to the local URL displayed (e.g., `http://localhost:5173`).

### Step 3: Build for Production
To create an optimized production build:
```bash
npm run build
```
The production files will be output to the `dist/` directory.

### Step 4: Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment to GitHub Pages

This project is configured for automated deployment via GitHub Actions:

1. **Repository**: [https://github.com/yatlasnehith77-hub/todo-app-college-project](https://github.com/yatlasnehith77-hub/todo-app-college-project)
2. **Vite Base Path**: Configured as `/todo-app-college-project/` in `vite.config.js`.
3. **Workflow**: Automated build & deployment defined in `.github/workflows/deploy.yml`.

### Enabling GitHub Pages in Repository Settings:
1. Open your repository at: [https://github.com/yatlasnehith77-hub/todo-app-college-project/settings/pages](https://github.com/yatlasnehith77-hub/todo-app-college-project/settings/pages)
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push your commits to `main`:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```
4. The GitHub Action will automatically trigger, build the project, and publish it.
5. Your live app will be available at:
   `https://yatlasnehith77-hub.github.io/todo-app-college-project/`

---

## 🎓 College Viva / Project Presentation Notes

### Q1: Why use React Hooks for state management in this application?
> **Answer**: `useState` enables reactive component re-rendering whenever tasks are added, modified, or deleted. `useEffect` handles synchronization with `localStorage` as a side effect whenever the `tasks` state changes, ensuring single-source-of-truth consistency.

### Q2: How does the application prevent data loss on page refresh?
> **Answer**: The initial state of `tasks` is lazily initialized via a callback function inside `useState`. It reads the serialized JSON string from `window.localStorage.getItem('todo-app-tasks')`. If found, it parses and populates the list; otherwise, it falls back to the default sample tasks.

### Q3: How is responsive design achieved without external UI frameworks like Tailwind or Bootstrap?
> **Answer**: By using modern native CSS:
> - `width: min(100% - 32px, 620px);` ensures automatic fluid width on mobile while constraining maximum width on large displays.
> - CSS Grid and Flexbox with `flex: 1` and `min-width: 0` prevent text overflow.
> - `clamp(30px, 6vw, 40px)` provides smooth fluid typography for the main title.
> - Targeted `@media (max-width: 480px)` breakpoint adjusts padding and spacing for small handheld devices.
