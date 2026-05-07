# Golden Zaf Furniture & Interior

A bilingual Next.js 14 + Sanity CMS website for Golden Zaf Furniture and Interior.

Live URL: `https://goldenzaf.com`  
Stack: `Next.js 14`, `Sanity`, `Tailwind CSS`, `Framer Motion`, `next-intl`  
Languages: Amharic + English  
Theme modes: Light + Dark

## Setup

### 1. Install dependencies

```bash
cd goldenzaf
npm install
```

### 2. Create the Sanity project

1. Go to `https://sanity.io`
2. Create a new project named `goldenzaf`
3. Use dataset `production`
4. Copy the Sanity project ID

### 3. Create a Sanity API token

1. Open `Sanity -> Settings -> API -> Tokens`
2. Create a token named `website-write`
3. Give it `Editor` permission
4. Copy the token

### 4. Configure environment variables

Create `.env.local` and add:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_write_token_here
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id_here
NEXT_PUBLIC_SITE_URL=https://goldenzaf.com
```

### 5. Configure Formspree

1. Go to `https://formspree.io`
2. Create a form
3. Copy the form ID
4. Set `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local`

### 6. Run the app

```bash
npm run dev
```

Website: `http://localhost:3000`  
Sanity Studio: `http://localhost:3000/studio`

### 7. Replace the logo

Replace:

`public/images/logo.png`

## Content Workflow

The public site now uses **Our Works** as the main browsing experience.

- `/[locale]/projects` is the main works browser
- category links open filtered views inside `/[locale]/projects?category=...`
- old `/[locale]/categories/...` routes redirect into the works flow

## Adding Work Items in Sanity Studio

1. Open `http://localhost:3000/studio`
2. Open `Projects / ፕሮጀክቶች`
3. Create a new document
4. Fill in:
   - Title (English)
   - Title (Amharic)
   - Slug
   - Category
   - Subcategory
   - Cover Image
   - Gallery Images
   - Video URL if needed
   - 3D Model URL if needed
   - Featured if it should appear on the homepage
5. Publish

Important:

- Select the main category first
- Then select the matching subcategory
- Sanity now validates that the chosen subcategory belongs to the chosen category

### Image upload behavior

Images uploaded in Sanity Studio are compressed automatically.

- Max size: `1MB`
- Max width: `1920px`
- Optimized format

### Deleting images in Sanity

1. Open the document
2. Select the image
3. Use the `...` menu
4. Delete the image
5. Publish the document again

## Deployment on Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/goldenzaf.git
git push -u origin main
```

### 2. Deploy

1. Open `https://vercel.com`
2. Import the repository
3. Add the same environment variables from `.env.local`
4. Deploy

### 3. Add Sanity CORS origins

In `Sanity -> Settings -> API -> CORS Origins`, add:

- `https://goldenzaf.com`
- `https://goldenzaf.vercel.app`

Enable credentials for Studio if needed.

## Customization

### Change colors

Edit:

`tailwind.config.ts`

### Change fonts

Edit:

`src/app/layout.tsx`

### Add a new category

1. Update `sanity/schemas/project.ts`
2. Update `src/lib/utils.ts`
   - `CATEGORY_KEYS`
   - `categoryLabels`
   - `categoryImages`
3. Update translations in:
   - `messages/am.json`
   - `messages/en.json`

### Add a new subcategory

1. Update `SUBCATEGORIES` in `sanity/schemas/project.ts`
2. Update `subcategoriesByCategory` in `src/lib/utils.ts`
3. Test the category/subcategory validation in Studio

### Update translations

- Amharic: `messages/am.json`
- English: `messages/en.json`

## Shared Contact Configuration

Shared contact values now live in:

`src/lib/contact.ts`

This powers:

- Footer contact actions
- Floating Telegram and WhatsApp buttons
- Contact page quick actions

If the business number changes later, update it once in `src/lib/contact.ts`.

## Project Structure

```text
goldenzaf/
├── messages/
│   ├── am.json
│   └── en.json
├── public/
│   └── images/
├── sanity/
│   ├── lib/
│   ├── plugins/
│   └── schemas/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx
│   │   │   ├── projects/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── categories/
│   │   └── studio/
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── lib/
│   │   ├── contact.ts
│   │   └── utils.ts
│   └── types/
├── sanity.config.ts
├── middleware.ts
├── next.config.js
└── package.json
```

## Media Features

### 3D models

1. Upload to `https://sketchfab.com`
2. Copy the embed URL
3. Paste it into the `3D Model URL` field

### Videos

1. Copy the YouTube or Vimeo URL
2. Paste it into the `Video URL` field

## Support

For codebase questions, start with the component files and Sanity schemas.
