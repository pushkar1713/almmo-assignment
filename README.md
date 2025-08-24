# ALMMO - Affiliate Tracking System

A comprehensive affiliate marketing tracking system that handles click tracking and conversion postbacks.

## System Overview

### What is a Postback?

A postback is a server-to-server communication mechanism used in affiliate marketing to track conversions. When a user completes a desired action (like making a purchase), the advertiser's server sends a notification back to the affiliate network with conversion details including:

- **Affiliate ID**: Identifies which affiliate generated the conversion
- **Click ID**: Links the conversion to the original click
- **Amount**: The value of the conversion
- **Currency**: The currency of the transaction

This system ensures accurate attribution and commission tracking for affiliates.

## Live Demo

- **Frontend**: [https://almmo-assignment.vercel.app/](https://almmo-assignment.vercel.app/)
- **Backend API**: [https://almmo-assignment-l6f4.vercel.app/](https://almmo-assignment-l6f4.vercel.app/)

## Local Development Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- pnpm (recommended) or npm

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up PostgreSQL:**

   - Install PostgreSQL on your system
   - Create a new database
   - Set the `DATABASE_URL` environment variable:
     ```bash
     export DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
     ```

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

6. **Start the development server:**
   ```bash
   pnpm dev
   ```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

The frontend will run on `http://localhost:3001`

## API Endpoints

### Click Tracking

**GET** `/click`

Tracks when a user clicks on an affiliate link.

<img width="1029" height="776" alt="image" src="https://github.com/user-attachments/assets/29136967-955b-46b4-a599-9dd58237bb07" />

**Query Parameters:**

- `affiliate_id` (required): The affiliate's unique identifier
- `campaign_id` (required): The campaign's unique identifier
- `click_id` (required): Unique identifier for this click

**Example Request:**

```bash
curl "https://almmo-assignment-l6f4.vercel.app/click?affiliate_id=aff_123&campaign_id=camp_456&click_id=click_789"
```

**Response:**

```json
{
  "id": "uuid",
  "affiliateId": "aff_123",
  "campaignId": "camp_456",
  "clickId": "click_789",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Postback (Conversion Tracking)

**GET** `/postback`

Tracks conversions when users complete desired actions.

<img width="1030" height="776" alt="image" src="https://github.com/user-attachments/assets/c3a5a69c-20b4-4b02-84fb-2b798a2d8f7c" />

**Query Parameters:**

- `affiliate_id` (required): The affiliate's unique identifier
- `click_id` (required): The click ID from the original click
- `amount` (required): The conversion amount
- `currency` (required): The currency code (e.g., USD, EUR)

**Example Request:**

```bash
curl "https://almmo-assignment-l6f4.vercel.app/postback?affiliate_id=aff_123&click_id=click_789&amount=99.99&currency=USD"
```

**Response:**

```json
{
  "status": "success",
  "message": "Conversion tracked"
}
```

### Get Conversions

**GET** `/conversions`

Retrieves all tracked conversions.

**Example Request:**

```bash
curl "https://almmo-assignment-l6f4.vercel.app/conversions"
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "amount": 99.99,
      "currency": "USD",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Clicks by Campaign

**GET** `/clicks`

Retrieves click statistics grouped by campaign.

**Example Request:**

```bash
curl "https://almmo-assignment-l6f4.vercel.app/clicks"
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "campaignId": "camp_456",
      "campaignName": "Summer Sale",
      "clicks": 150
    }
  ]
}
```

### Get Affiliates

**GET** `/affiliates`

Retrieves all registered affiliates.

**Example Request:**

```bash
curl "https://almmo-assignment-l6f4.vercel.app/affiliates"
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "id": "aff_123",
      "name": "Affiliate Partner 1"
    }
  ]
}
```

## Database Schema

The system uses PostgreSQL with the following main entities:

- **affiliates**: Stores affiliate information
- **campaigns**: Stores campaign information
- **clicks**: Tracks individual clicks with affiliate and campaign relationships
- **conversions**: Tracks successful conversions linked to clicks

## Technology Stack

**Backend:**

- Node.js with Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod for validation

**Frontend:**

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI components
- Axios for API calls

## Deployment

The application is deployed on Vercel:

- Frontend: Automatic deployment from main branch
- Backend: Uses Vercel's serverless functions
- Database: PostgreSQL hosted on Neon Postgres
