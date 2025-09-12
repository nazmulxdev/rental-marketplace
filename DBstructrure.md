# Database Object Structures

This document defines the **MongoDB schema structure** for the project

---

## USERS 

```js
{
  _id: ObjectId,
  email: String,                // unique
  emailVerified: Boolean,
  roles: ['USER'],              // SUPER_ADMIN | ADMIN | MEMBER | USER
  status: 'active',             // active | suspended | banned
  profile: {
    name: String,
    phone: String,
    avatarUrl: String,
    address: {
      city: String,
      district: String,
      division: String,
      country: String,
      postalCode: String
    }
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
}

```
---

## ADMIN_APPLICATIONS

```js
{
  _id: ObjectId,
  userId: ObjectId,              // -> users
  paymentId: ObjectId,           // -> payments
  amount: Number,
  status: 'pending' | 'paid' | 'under_review' | 'approved' | 'rejected',
  submittedAt: Date,
  decidedAt: Date,
  decidedBy: ObjectId,           // super admin id
  notes: String,
  kyc: {
    nidNumber: String,
    docs: [{ kind: String, url: String }]
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## ADMIN_PROFILES

```js
{
  _id: ObjectId,
  userId: ObjectId,              // -> users
  approved: Boolean,
  approvedAt: Date,
  business: {
    displayName: String,
    about: String,
    payoutMethod: { provider: String, accountRef: String }
  },
  rating: { avg: Number, count: Number },
  stats: { activeListings: Number, totalAgreements: Number },
  badges: [String],
  createdAt: Date,
  updatedAt: Date
}
```
---

## PROPERTIES

```js
{
  _id: ObjectId,
  ownerAdminId: ObjectId,       // -> admin_profiles.userId
  title: String,
  description: String,
  type: 'room' | 'apartment' | 'house',
  pricing: { monthly: Number, deposit: Number },
  amenities: [String],
  rules: [String],
  location: {
    geo: { type: 'Point', coordinates: [Number, Number] }, // lng, lat
    address: { city: String, district: String, division: String }
  },
  images: [{ url: String, provider: String }],
  availability: 'vacant' | 'occupied',
  status: 'active' | 'draft' | 'archived',
  stats: { saves: Number, views: Number },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
}
```
---

## AGREEMENTS

```js

{
  _id: ObjectId,
  adminUserId: ObjectId,
  memberUserId: ObjectId,
  propertyId: ObjectId,
  terms: {
    startDate: Date,
    endDate: Date,
    monthlyRent: Number,
    depositPaid: Number,
    paymentDay: Number
  },
  status: 'pending' | 'active' | 'completed' | 'terminated',
  docs: [{ url: String, name: String }],
  createdAt: Date,
  updatedAt: Date
}
```
---

## REVIEWS

```js

{
  _id: ObjectId,
  agreementId: ObjectId,
  reviewerUserId: ObjectId,
  revieweeAdminUserId: ObjectId,
  rating: Number,                  // 1–5
  comment: String,
  visibility: 'public' | 'hidden',
  moderation: 'clean' | 'flagged',
  helpful: { up: Number, down: Number },
  reply: { byAdminUserId: ObjectId, text: String, at: Date },
  createdAt: Date,
  updatedAt: Date
}
```
---

## BOOKINGS

```js

{
  _id: ObjectId,
  userId: ObjectId,             // seeker
  adminUserId: ObjectId,        // landlord
  propertyId: ObjectId,
  slot: { start: Date, end: Date, timezone: String },
  status: 'requested' | 'approved' | 'declined' | 'cancelled' | 'completed',
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```
---

## PAYMENTS

```js

{
  _id: ObjectId,
  type: 'onboarding_fee' | 'rent' | 'deposit' | 'refund' | 'payout',
  payerUserId: ObjectId,          // who paid
  payeeUserId: ObjectId,          // who received
  agreementId: ObjectId,          // optional -> agreements
  applicationId: ObjectId,        // optional -> admin_applications
  amount: Number,                 // in smallest unit
  currency: 'BDT' | 'USD',
  status: 'pending' | 'paid' | 'failed' | 'refunded',
  transactionId: String,          // from gateway (Stripe/SSLCommerz/etc.)
  paymentMethod: 'stripe' | 'bkash' | 'nagad' | 'bank',
  paymentAt: Date,                // actual confirmation time
  meta: Object,                   // raw response from gateway
  createdAt: Date,
  updatedAt: Date
}
```
---

## THREADS / MESSAGES

**Threads**

```js

{
  _id: ObjectId,
  participantIds: [ObjectId],    // [userId, adminId]
  propertyId: ObjectId,
  lastMessageAt: Date,
  unread: { [userId]: Number },
  createdAt: Date,
  updatedAt: Date
}

**Messages**

{
  _id: ObjectId,
  threadId: ObjectId,
  senderId: ObjectId,
  type: 'text' | 'image',
  text: String,
  attachments: [{ url: String, name: String }],
  readBy: [ObjectId],
  createdAt: Date
}
```
---

## NOTIFICATIONS

```js

{
  _id: ObjectId,
  userId: ObjectId,
  kind: 'booking' | 'message' | 'payment' | 'review' | 'system',
  title: String,
  body: String,
  data: Object,
  readAt: Date,
  createdAt: Date
}
```
---

## fAVORITES

```js

{
  _id: ObjectId,
  userId: ObjectId,
  propertyId: ObjectId,
  createdAt: Date
}
```
---

## REPORTS

```js

{
  _id: ObjectId,
  byUserId: ObjectId,
  target: { type: 'property' | 'admin' | 'message' | 'review', id: ObjectId },
  reason: String,
  status: 'open' | 'under_review' | 'resolved',
  moderatorId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```
---

## AUDIT_LOGS

```js

{
  _id: ObjectId,
  actorUserId: ObjectId,
  action: String,                  // e.g., 'ADMIN_APPROVED'
  entity: { type: String, id: ObjectId },
  before: Object,
  after: Object,
  at: Date,
  ip: String,
  ua: String
}




