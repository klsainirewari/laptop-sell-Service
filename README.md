# Khusboo Electric - Website Project

## Kaise Update Karein (How to Update)

Jab bhi aap code mein koi change karein, changes ko live karne ke liye **VS Code Terminal** mein ye 3 commands chalayein:

1.  `git add .`
2.  `git commit -m "Description of changes"`
3.  `git push`

Iske baad Vercel automatically site update kar dega.

## Vercel Setup (Zaroori Hai)

AI Technician feature chalane ke liye aapko Vercel par API Key dalni hogi:

1.  Go to **Vercel Dashboard** > Select Project.
2.  Go to **Settings** > **Environment Variables**.
3.  Add New Variable:
    *   **Key:** `VITE_API_KEY`
    *   **Value:** `Your_Google_Gemini_API_Key_Here`
4.  Click **Add**.
5.  Go to **Deployments** and click **Redeploy** on the latest build.

## Website Features
- Laptop Sales Catalog
- Expert Repair Services Info
- AI Virtual Technician (Powered by Gemini)
- Responsive Design (Mobile & Desktop)
