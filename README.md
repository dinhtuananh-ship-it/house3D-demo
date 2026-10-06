# NOVA HOUSE - Ultra Luxury 3D Real Estate Landing Page

NOVA HOUSE is a highly interactive, premium real estate landing page featuring a fully explorable 3D house model. Built with **React, Three.js (React Three Fiber), and Tailwind CSS**, this project demonstrates how to blend traditional web scroll mechanics with an immersive 3D First-Person view.

## 🌟 Features

- **Interactive 3D Architecture**: A complete, highly detailed two-story minimalist luxury house.
- **FPS Fly-Through Controls**: 
  - Use **W, A, S, D** to walk around the interior and exterior of the house.
  - Use **Arrow Up / Arrow Down** to adjust your altitude (fly up/down).
  - Click and drag the mouse to look around in a First-Person perspective.
- **Dynamic Hotspots**: Click on predefined hotspots (Living Room, Master Suite, Garage, Infinity Pool) to automatically fly the camera into the rooms.
- **Glassmorphism UI**: Beautiful, scrollable text overlays with `backdrop-blur` that let the 3D canvas shine through.
- **Day/Night Cycle & Material Toggles**: Interactive UI to change the time of day (lighting/fog) and the exterior finishing material.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Prerequisites
You need to have [Node.js](https://nodejs.org/) installed on your machine. 

### 2. Installation

Clone the repository to your local machine:
```bash
git clone <repository-url>
cd house-landingpage
```

Install the dependencies:
```bash
npm install
```

### 3. Running the Development Server

Start the Vite development server:
```bash
npm run dev
```

Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173/`).

---

## 🎮 How to interact with the 3D Model

When you open the page, the 3D model is active in the background.
- **Look Around**: Click and drag your mouse anywhere on the screen (where there is no text).
- **Walk**: Press `W` (forward), `S` (backward), `A` (left), `D` (right).
- **Fly**: Press `Arrow Up` to elevate and `Arrow Down` to descend.
- **Scroll**: Scroll the mouse wheel down to read the landing page content. The 3D model will remain fixed in the background while the UI panels slide up.

---

## 🛠️ Technology Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) + TypeScript
- **3D Rendering**: [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)
- **3D Helpers**: [@react-three/drei](https://github.com/pmndrs/drei) (CameraControls, ContactShadows, Environment, MeshTransmissionMaterial)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📝 License
This project is open-source and available for educational and commercial usage.
