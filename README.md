# Deepak Kumar — Academic & UPSC Preparation Portfolio

A premium, interactive React + Vite portfolio website custom-tailored for **BA (Bachelor of Arts) Academic Studies** and **UPSC Civil Services Preparation**. It features a modern, responsive layout, smooth Framer Motion animations, glassmorphism UI components, and complete dark/light mode toggles.

---

## 🌟 Key Features

### 1. Study Notes Hub (History, Civics & Geography)
* Curated study material with bulleted points and downloadable PDF generation powered by `jsPDF`.
* Categories cover:
  * **History**: Ancient Period (IVC, Maurya, Gupta), Medieval Indian History, and Modern Indian History.
  * **Civics**: Indian Constitution, Preamble, Fundamental Rights, Amendments, and the Indian Political System.
  * **Geography**: Physical Geography of India, Human & Economic Geography, and Geography through Maps.

### 2. Geography through Maps (Interactive Lightbox)
* Features an interactive map viewer integrated directly into the study note modal sections.
* **Supported Maps**:
  * **World Map**: Oceans, rivers, mountain chains, straits, canals, and grids.
  * **Country Map (India)**: States, union territories, borders, and relief.
  * **State Map (Bihar)**: Custom Hindi-labeled district-wise Bihar map image.
  * **District Map (Nawada)**: Official NIC map of Nawada district highlighting developmental blocks (Hisua, Rajauli, Warsaliganj, etc.).
* Each map opens inside a full-screen, high-contrast overlay lightbox.

### 3. Achievements & Academic Marksheets
* Chronological timeline displaying major milestones and examinations.
* Integrated marksheets include:
  * **BA Semester-IV Marksheet** (Linked to `1.pdf` download)
  * **12th Standard Marksheet — Year 2023** (Linked to `2.pdf` download)
  * **BA Semester-V Marksheet** (Linked to `3.pdf` download)
  * **10th Standard Marksheet — Year 2021** (Linked to `4.pdf` download)
  * **Completion of Computer Certificate** (Linked to `5.pdf` download)
* Features direct **"View Certificate / Marksheet"** download anchors.

### 4. Hidden Admin Photo Gallery
* Fully functional photo gallery with category filter tabs (*All, Academic, Study, Personal, Events*).
* **Interactive Lightbox**: Clicking any photo card opens a detailed visual modal with custom descriptions.
* **Gated Admin Mode**: Gated photo upload form and delete buttons are completely hidden from the public to maintain user privacy.
* **Admin Verification Triggers**:
  * **Desktop Shortcut**: Press **`Ctrl + Shift + A`** on your keyboard from anywhere on the page to trigger the admin verification modal.
  * **Double-Click Trigger**: Double-click on the **"Photo Gallery"** section title (perfect for mobile taps).
* **Credentials**: Default Password is **`admin123`**.
* **Local Storage Persistence**: Photos uploaded dynamically via the Admin panel are stored in the browser's `localStorage` and persist across reloads.

---

## 🛠️ Tech Stack

* **Framework**: React 18
* **Build Tool**: Vite
* **Animations**: Framer Motion
* **Styling**: Vanilla CSS with CSS Modules
* **Icons**: React Icons (FontAwesome)
* **Libraries**: `jsPDF` for client-side PDF document compilation.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your computer.

### Installation & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
