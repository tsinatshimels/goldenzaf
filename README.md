# Golden Zaf Furniture & Interior — Website

A premium Next.js 14 + Sanity CMS website for Golden Zaf Furniture.

**Live URL**: https://goldenzaf.com  
**Stack**: Next.js 14, Sanity CMS, Tailwind CSS, Framer Motion, next-intl  
**Languages**: Amharic (primary) + English  
**Modes**: Dark + Light  

---

## 🚀 Setup Guide (Step by Step)

### Step 1: Install Dependencies

```bash
cd goldenzaf
npm install
```

---

### Step 2: Create Sanity Project

1. Go to **https://sanity.io** and create a free account
2. Click **"New Project"**
3. Name it: `goldenzaf`
4. Choose dataset: `production`
5. Copy your **Project ID** (looks like: `abc12xyz`)

---

### Step 3: Get Sanity API Token
 
1. In your Sanity project, go to **Settings → API → Tokens**
2. Click **"Add API Token"**
3. Name it: `website-write`
4. Permissions: **"Editor"**
5. Copy the token

---

### Step 4: Set Up Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_write_token_here
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id_here
NEXT_PUBLIC_SITE_URL=https://goldenzaf.com
```

---

### Step 5: Set Up Formspree (Contact Form)

1. Go to **https://formspree.io** and create a free account
2. Click **"New Form"**
3. Set email to your company email
4. Copy the Form ID (e.g., `xabcdefg`)
5. Paste it into `.env.local` as `NEXT_PUBLIC_FORMSPREE_ID`

---

### Step 6: Run Development Server

```bash
npm run dev
```

Website: **http://localhost:3000**  
Sanity Studio: **http://localhost:3000/studio**

---

### Step 7: Add Your Logo

Replace `public/images/logo.png` with the Golden Zaf logo image.

---

## 📸 How to Add Projects in Sanity Studio

1. Open **http://localhost:3000/studio**
2. Click **"Projects / ፕሮጀክቶች"**
3. Click **"Create New Document"**
4. Fill in:
   - **Title (English)**: The project name in English
   - **Title (Amharic)**: The project name in Amharic
   - **Slug**: Click "Generate" (auto-fills from title)
   - **Category**: Select from dropdown
   - **Cover Image**: Upload the main project photo
   - **Images**: Add more photos for the gallery
   - **Video URL** (optional): YouTube link
   - **3D Model URL** (optional): Sketchfab link
   - **Featured**: Check this to show on homepage
5. Click **"Publish"**

### ✅ Image Upload — Auto Compression

When you upload images in Sanity Studio, they are automatically compressed:
- Max size: **1MB**
- Max width: **1920px**
- Format: Optimized

---

### How to Delete Images in Sanity

1. Open the project in Studio
2. Click on the image you want to remove
3. Click the **"..." menu** → **"Delete"**
4. Click **"Publish"** to save changes

---

## 🌐 Deployment on Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/goldenzaf.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to **https://vercel.com** and connect your GitHub
2. Import the `goldenzaf` repository
3. Add all environment variables from `.env.local`
4. Click **Deploy**

### Step 3: Add CORS in Sanity

1. Go to **sanity.io → Your Project → Settings → API → CORS Origins**
2. Add: `https://goldenzaf.com`
3. Add: `https://goldenzaf.vercel.app`
4. Enable **"Allow Credentials"** for Studio

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts` — the `gold` and `forest` colors

### Change Fonts
Edit `src/app/layout.tsx` — the Google Fonts imports

### Add New Category
1. Edit `sanity/schemas/project.ts` — add to the `category` options list
2. Edit `src/lib/utils.ts` — add to `categoryLabels` and `categoryImages`
3. Edit `messages/am.json` and `messages/en.json` — add translation

### Update Translations
- Amharic: `messages/am.json`
- English: `messages/en.json`

---

## 📁 Project Structure

```
goldenzaf/
├── messages/           # Translations
│   ├── am.json         # Amharic (primary)
│   └── en.json         # English
├── public/
│   └── images/         # Static images (logo, etc.)
├── sanity/
│   ├── schemas/        # CMS content types
│   └── lib/client.ts   # Sanity queries
├── src/
│   ├── app/
│   │   ├── [locale]/   # All website pages
│   │   │   ├── page.tsx        # Home
│   │   │   ├── projects/       # Projects list + detail
│   │   │   ├── about/          # About page
│   │   │   └── contact/        # Contact page
│   │   └── studio/     # Sanity Studio (CMS)
│   ├── components/
│   │   ├── layout/     # Navbar, Footer
│   │   ├── sections/   # Hero, Categories, FAQ, etc.
│   │   └── ui/         # Reusable UI components
│   └── lib/
│       ├── utils.ts    # Utilities + demo data
│       └── imageUpload.ts  # Image compression
├── sanity.config.ts    # Sanity Studio config
├── middleware.ts        # i18n routing
└── next.config.js      # Next.js config
```

---

## 🔧 Advanced Features

### 3D Models (Sketchfab)
1. Upload your 3D model to **https://sketchfab.com**
2. Click **"Embed"** → copy the iframe `src` URL
3. Paste it in the project's **"3D Model URL"** field in Sanity

### Videos (YouTube)
1. Copy your YouTube video URL
2. Paste it in the project's **"Video URL"** field
3. It auto-embeds on the project page

### WhatsApp Button
Update the WhatsApp number in:
- `src/components/layout/Footer.tsx`
- `src/app/[locale]/contact/ContactClient.tsx`

Change `https://wa.me/251` to `https://wa.me/251XXXXXXXXX`

---

## 📧 Support
For questions about this codebase, check the component files — they are heavily commented.
