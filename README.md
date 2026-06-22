# 🎓 Deepak Kumar — Premium Academic & UPSC Preparation Portfolio

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/css-modules/css-modules)
[![jsPDF](https://img.shields.io/badge/jsPDF-000000?style=for-the-badge&logo=pdf&logoColor=white)](https://github.com/parallax/jsPDF)

A state-of-the-art, interactive portfolio custom-tailored for **BA (Bachelor of Arts) Academic Studies** and **UPSC Civil Services Preparation**. Engineered for visual excellence, this portfolio features smooth animations, beautiful glassmorphism components, dark/light theme toggles, and fully optimized responsive layouts matching the viewports of high-end mobile devices (Samsung S20, Poco, Vivo, etc.).

---

## 🌟 Key Highlights & Features

### 📖 1. Dynamic Study Notes Hub
* **Subjects Covered**: 
  * 📜 **History**: Ancient Period (Indus Valley Civilization, Maurya, Gupta), Medieval Indian History, and Modern Indian History.
  * ⚖️ **Civics**: Indian Constitution, Preamble, Fundamental Rights, Amendments, and the Indian Political System.
  * 🗺️ **Geography**: Physical Geography of India, Human & Economic Geography, and Geography through Maps.
* **PDF Compiler**: Native integration with `jsPDF` for instant, beautifully formatted study note compilation and PDF downloads directly on the client side.

### 🗺️ 2. Geography via Interactive Map Lightbox
* Built-in interactive map viewer embedded inside the study note modal sections.
* **Integrated Maps**:
  * 🌍 **World Map**: Relief, mountain ranges, oceans, rivers, and major canals.
  * 🇮🇳 **Country Map (India)**: States, union territories, administrative boundaries, and geographic regions.
  * 🏔️ **State Map (Bihar)**: Detailed district-wise map in Hindi.
  * 📍 **District Map (Nawada)**: Official NIC map highlighting block-level details (Hisua, Rajauli, Warsaliganj, etc.).
* Opening any map loads a high-definition image inside a responsive overlay lightbox modal.

### 🏆 3. Chronological Academic Timeline
* Interactive vertical timeline outlining exam results and milestones.
* Seamless links to view and download official marksheets (PDF):
  * **BA Semester-IV Marksheet**
  * **12th Standard Marksheet (Year 2023)**
  * **BA Semester-V Marksheet**
  * **10th Standard Marksheet (Year 2021)**
  * **Computer Application Certificate**

### 🔒 4. Gated Admin Photo Gallery
* Fully functional visual log for memory capture with categories filter (*All, Academic, Study, Personal, Events*).
* **Secret Admin Access Triggers**:
  * **Laptop/Desktop (Shortcut)**: Press **`Ctrl + Shift + A`** to automatically scroll to the gallery and trigger the verification modal.
  * **Laptop/Desktop (Mouse)**: **Double-Click** the main **"Photo Gallery"** section heading.
  * **Phone/Mobile (Touch)**: **Double-Tap** (do baar fast touch) on the **"Photo Gallery"** section heading.
* **Credentials**:
  * **Password**: `Deepak@15_06_2005`
* Admin mode enables an interactive file drop-zone form to upload custom photos (persisted locally via `localStorage`) and trash buttons to delete items.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Frontend Framework |
| **Vite** | Next-gen Frontend Build Tool |
| **Framer Motion** | High-performance Fluid Page & Scroll Animations |
| **Vanilla CSS + Modules** | Modular, encapsulated component styling |
| **React Icons** | Premium vector iconography |
| **jsPDF** | Client-side PDF generation |

---

## 📂 Project Directory Structure

```
Deepak Portfolio/
├── src/
│   ├── assets/             # Media assets (PDF marksheets, Map overlays, Profile images)
│   ├── components/         # Modular React Components
│   │   ├── ui/             # Reusable UI Blocks (Buttons, Cards, ThemeToggles)
│   │   └── ...             # Feature Components (Hero, About, Notes, Gallery, Contact, etc.)
│   ├── context/            # Global context (Theme Management)
│   ├── data/               # Static configurations and initial assets database
│   ├── utils/              # Helper utilities (jsPDF generator configurations)
│   ├── App.jsx             # Main Application Entry Component
│   ├── index.css           # Global Design Tokens & Typography Base
│   └── main.jsx            # React client mounting logic
├── index.html              # HTML shell & SEO meta configuration
├── vite.config.js          # Vite build tool configuration
└── package.json            # Scripts & project dependencies
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18 or higher) installed.

### Installation & Local Run

1. **Clone or locate the workspace directory**:
   ```bash
   cd "Deepak Portfolio"
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```

4. Open the site on [http://localhost:5173](http://localhost:5173) in your browser.

### Creating a Production Build
Compile and bundle the project for web deployments:
```bash
npm run build
```
The optimized bundle will be compiled into the `dist/` directory.

---

## 📱 Responsive Optimization
This portfolio is optimized for all mobile viewports, including Samsung Galaxy S20 Ultra, Poco, Vivo, and iOS devices. The grid systems use standard, self-correcting calculations:
```css
grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
```
This protects layouts from horizontal overflow, ensuring the page opens at a perfect 1:1 scale with no manual zooming required.
