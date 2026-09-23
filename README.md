# PickleBall4All 🏓

> Professional pickleball coaching in Jurong, Singapore by **PPA Tour Asia Medalist Hari Mohan**. Beginner to competitive training, tactical drills, and match preparation at 6 Tao Ching Road.

---

## 🌟 Key Features

- **Modern Hero & Approach Experience**: High-impact athletic visual design featuring coach credibility badges, 5.0 Google rating showcase, and structured coaching pillars.
- **Dedicated About Page**: Detailed background on Coach Hari Mohan, including tournament accolades, credentials, and coaching philosophy.
- **Coaching Program Showcase**: Transparent overview of Beginner, Intermediate, and Advanced matchplay modules.
- **Fast & Lightweight**: Zero runtime dependencies, optimized static delivery with modern CSS and typography.
- **Vercel-Ready**: Preconfigured with `vercel.json` for instant zero-config deployment, clean URLs (`/about`), and edge caching.

---

## 📁 Project Structure

```text
├── index.html            # Main landing page (Hero, Approach, Programs, Reviews, Contact)
├── about.html            # Coach Hari Mohan biography & credentials
├── assets/
│   ├── favicon.svg       # SVG Favicon
│   └── images/           # High-resolution cutouts, badges, and medal photos
│       ├── hero-coach.png
│       ├── coach-hari.png
│       ├── coach-badge.png
│       └── about-medals.png
├── css/
│   └── styles.css        # Design tokens, court motifs, and animations
├── js/
│   └── app.js            # Interactive behaviors, mobile navigation drawer, and smooth scroll
├── server.js             # Lightweight zero-dependency Node.js local preview server
├── package.json          # Project metadata and run scripts
├── vercel.json           # Vercel deployment, rewrites, and security headers
├── .gitignore            # Git exclusions
└── README.md             # Project documentation
```

---

## 🚀 Running Locally

You can preview the website locally using Node.js:

```bash
# Start the local preview server (port 3000 by default)
node server.js
```

Or using npm:

```bash
npm start
```

Then open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

## 📤 Pushing to GitHub

Follow these steps to upload the code to your GitHub account:

1. **Initialize Git** (if not already done):
   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit: PickleBall4All website"
   ```

2. **Create a new repository on GitHub** (e.g. named `pickleball4all`).

3. **Link and push to GitHub**:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/pickleball4all.git
   git branch -M main
   git push -u origin main
   ```

---

## ⚡ Deploying to Vercel

### Method 1: Automatic Deployment via GitHub (Recommended)
1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** -> **Project**.
3. Select your `pickleball4all` repository.
4. Leave framework preset as **Other** (Vercel automatically detects `index.html` and `vercel.json`).
5. Click **Deploy**.
6. Every time you push changes to GitHub, Vercel will automatically build and deploy your site with a custom `.vercel.app` URL and free SSL!

### Method 2: Deploying via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly from this directory
vercel
```

---

## 📞 Contact & Coach Details

- **Head Coach**: Hari Mohan
- **Location**: 6 Tao Ching Road, Jurong, Singapore
- **Phone**: [+65 8900 0521](tel:+6589000521)
- **WhatsApp**: [+65 8900 0521](https://wa.me/6589000521)
- **License**: MIT
