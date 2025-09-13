# 🏠 Rental Marketplace — RentEase Platform

An **AI-powered full-stack rental marketplace** that connects rent seekers with property owners and managers. Users can browse listings, search with smart AI filters, chat in real-time, schedule bookings, and securely pay rent online. Landlords can list and manage properties, while admins handle approvals, reports, and analytics.

---

## 📌 Project Overview

The **RentEase Platform** is designed to simplify the rental ecosystem by combining property management, real-time chat, online payments, and AI-powered smart search. Whether you’re a student looking for a room, a family searching for an apartment, or a landlord managing multiple properties — this platform has you covered.

---

## 🚀 Features

- **User Authentication & Profiles**

  - Secure login/signup (email/social)
  - Role-based dashboards (Rent Seekers, Landlords, Admins)
  - Editable profiles with preferences, saved listings

- **Property Listings & Management**

  - Landlords can list, update, and manage rentals with images, pricing, and amenities
  - Seekers can browse detailed listings with availability status

- **Advanced Search & Filters**

  - Search by city, district, or map
  - Filters for price, property type, size, amenities
  - AI-powered smart search/autocomplete

- **Real-Time Chat & Communication**

  - Instant messaging with landlords
  - Typing indicators, read receipts, image sharing

- **Booking & Scheduling**

  - Request and schedule property visits
  - Landlords can approve/decline bookings

- **Payments & Rent Management**

  - Secure rent payment (Stripe, bKash, Nagad, Bank)
  - Rent history, invoices, refunds, payouts

- **AI & Smart Features**

  - Smart recommendations based on past searches
  - Natural language queries (“2BHK under 15k in Banani”)
  - Fraud/fake listing detection (image validation via AI)

- **Reviews & Ratings**

  - Tenants leave feedback on landlords & properties
  - Optional landlord feedback on tenants

- **Admin Dashboard**

  - Manage users, properties, reports
  - Analytics on rentals, payments, usage

- **Notifications & Alerts**
  - In-app + Email/SMS notifications for bookings, messages, payments

---

## 💻 Tech Stack

**Frontend**

- Next.js 15 + TypeScript
- React 19 / React DOM
- Tailwind CSS + DaisyUI
- Framer Motion, Lucide Icons
- Axios
- Google Maps API / Leaflet

**Backend**

- Node.js + Express
- MongoDB
- NextAuth.js / JWT + bcrypt for authentication
- Cloudinary (media storage)
- Stripe API (payments)

**AI / Smart Features**

- OpenAI GPT API (smart search, chat)
- Google Vision API (fake image detection)
- ML models for price suggestion & recommendations

**Other Tools**

- Socket.io (real-time chat)
- SweetAlert2 (alerts)

---

## 🌍 Live Link

🔗 [RentEase Platform Live](https://rental-marketplace-verson-1.vercel.app/)

---

## 👥 Team Members

| Name                 | Role                                 | GitHub Profile                                        |
| -------------------- | ------------------------------------ | ----------------------------------------------------- |
| Md Nazmul Hossen     | Full Stack Developer (MERN, Next.js) | [nazmulxdev](https://github.com/nazmulxdev)           |
| Mohammad Raihan Gazi | Full Stack Developer (MERN, Next.js) | [gaziraihan1](https://github.com/gaziraihan1)         |
| A H M Saif Smran     | Full Stack Developer (MERN, Next.js) | [Saif-Smran](https://github.com/Saif-Smran)           |
| Sauda Tus Sahadia    | Full Stack Developer (MERN, Next.js) | [SaudaTusSahadia](https://github.com/SaudaTusSahadia) |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Auth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI / APIs
OPENAI_API_KEY=your_openai_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_VISION_API_KEY=your_google_vision_api_key

```

---

## 🛠️ Setup & Run Locally

```
# Clone the repo

git clone https://github.com/your-repo-url/rental-marketplace.git
cd rental-marketplace

# Install dependencies

npm install

# Configure environment

Create .env.local file
Add values (see env example above)

# Run development server

npm run dev
App will be running at: http://localhost:3000

# Build for production

npm run build
npm start

```
--- 
