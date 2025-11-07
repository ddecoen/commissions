# Sales Commission Tracker

A web application for tracking and managing sales commissions with Salesforce integration, automated PDF generation, and email distribution.

## Overview

This commission tracking tool helps manage sales team commissions by:
- Importing year-to-date opportunities via CSV
- Connecting to Salesforce to fetch closed/won deals
- Calculating commissions based on deal types (renewal, expansion, new business)
- Generating monthly commission statements as PDFs
- Automatically emailing commission reports to sales representatives

## Features

### 🎯 Core Functionality
- **Employee Selection**: Dropdown list to select sales representatives
- **Deal Tracking**: Automatic import of closed/won deals from Salesforce for the current month
- **Running Totals**: Month-over-month commission tracking with cumulative views
- **CSV Import**: Bulk import of year-to-date opportunities
- **Flexible Payout Rules**: Configure commission percentages by deal type:
  - New Business
  - Expansion
  - Renewal

### 📊 Commission Calculations
- Customizable payout percentages per deal type
- Real-time commission calculations
- Monthly and YTD totals
- Deal-level breakdown visibility

### 📄 Reporting & Distribution
- Generate PDF commission statements per sales rep
- Automated email delivery of monthly commission files
- Professional PDF formatting with company branding

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL (via Vercel Postgres or Supabase)
- **Authentication**: NextAuth.js
- **Salesforce Integration**: JSforce or Salesforce REST API
- **PDF Generation**: jsPDF or Puppeteer
- **Email**: Resend, SendGrid, or Nodemailer
- **Deployment**: Vercel
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Salesforce account with API access
- Vercel account for deployment
- Email service credentials (Resend, SendGrid, etc.)

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Database
DATABASE_URL=postgresql://...

# Salesforce
SALESFORCE_CLIENT_ID=your_client_id
SALESFORCE_CLIENT_SECRET=your_client_secret
SALESFORCE_REDIRECT_URI=https://your-domain.com/api/auth/salesforce/callback
SALESFORCE_LOGIN_URL=https://login.salesforce.com

# Email Service (example with Resend)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=commissions@yourdomain.com

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Installation

```bash
# Clone the repository
git clone https://github.com/ddecoen/commissions.git
cd commissions

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Visit `http://localhost:3000` to access the application.

## Database Schema

### Tables

**employees**
- `id`: UUID (Primary Key)
- `name`: VARCHAR(255)
- `email`: VARCHAR(255)
- `salesforce_id`: VARCHAR(255)
- `active`: BOOLEAN
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

**opportunities**
- `id`: UUID (Primary Key)
- `salesforce_id`: VARCHAR(255) UNIQUE
- `employee_id`: UUID (Foreign Key → employees)
- `name`: VARCHAR(255)
- `amount`: DECIMAL(15,2)
- `deal_type`: ENUM('new_business', 'expansion', 'renewal')
- `close_date`: DATE
- `stage`: VARCHAR(100)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

**commission_rules**
- `id`: UUID (Primary Key)
- `deal_type`: ENUM('new_business', 'expansion', 'renewal')
- `payout_percent`: DECIMAL(5,2)
- `effective_from`: DATE
- `effective_to`: DATE
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

**commission_statements**
- `id`: UUID (Primary Key)
- `employee_id`: UUID (Foreign Key → employees)
- `month`: DATE
- `total_commission`: DECIMAL(15,2)
- `pdf_url`: VARCHAR(500)
- `sent_at`: TIMESTAMP
- `created_at`: TIMESTAMP

## Usage

### 1. Configure Commission Rules

Navigate to Settings and configure payout percentages for each deal type:
- New Business: e.g., 10%
- Expansion: e.g., 7%
- Renewal: e.g., 5%

### 2. Import Year-to-Date Data

Use the CSV import feature to bulk load historical opportunities:

```csv
employee_email,opportunity_name,amount,deal_type,close_date,salesforce_id
john@company.com,Acme Corp - New,50000,new_business,2024-01-15,006abc123
jane@company.com,TechCo Expansion,25000,expansion,2024-02-20,006def456
```

### 3. Connect to Salesforce

Authenticate with Salesforce to enable automatic syncing of closed/won deals. The app will:
- Fetch new closed/won opportunities daily
- Match opportunities to employees by Salesforce user ID
- Automatically calculate commissions based on configured rules

### 4. View Commissions

- Select an employee from the dropdown
- View their monthly commission breakdown
- See running totals month-over-month
- Review individual deal contributions

### 5. Generate & Send Reports

Generate monthly commission statements:
- Click "Generate PDF" for a specific employee and month
- PDF includes deal breakdown, commission calculations, and totals
- Click "Email Statement" to send the PDF to the sales rep

Or use bulk processing:
- Navigate to "Monthly Close"
- Select the month and click "Process All"
- Generates PDFs and emails for all active employees

## API Endpoints

### Opportunities
- `GET /api/opportunities?employee_id={id}&month={YYYY-MM}` - Get opportunities
- `POST /api/opportunities/import` - Import CSV
- `POST /api/opportunities/sync` - Sync from Salesforce

### Commissions
- `GET /api/commissions?employee_id={id}&month={YYYY-MM}` - Calculate commissions
- `POST /api/commissions/generate-pdf` - Generate PDF statement
- `POST /api/commissions/send-email` - Email statement

### Settings
- `GET /api/commission-rules` - Get commission rules
- `PUT /api/commission-rules` - Update commission rules

## Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ddecoen/commissions)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Navigate to: Project Settings → Environment Variables
```

### Post-Deployment

1. Add environment variables in Vercel dashboard
2. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to your Vercel domain
3. Update Salesforce OAuth redirect URI to match your Vercel domain
4. Configure email service with your production domain

## Scheduled Tasks

Set up cron jobs or Vercel Cron to:

**Daily Sync** (Every day at 6 AM UTC):
- Sync closed/won opportunities from Salesforce
- File: `/api/cron/sync-salesforce`

**Monthly Close** (1st of each month at 8 AM UTC):
- Generate PDFs for all employees for the previous month
- Email commission statements to each rep
- File: `/api/cron/monthly-close`

Configure in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync-salesforce",
      "schedule": "0 6 * * *"
    },
    {
      "path": "/api/cron/monthly-close",
      "schedule": "0 8 1 * *"
    }
  ]
}
```

## Development

```bash
# Run development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test

# Build for production
npm run build
```

## Security Considerations

- All Salesforce credentials stored as environment variables
- Employee access restricted via authentication
- Commission rules require admin privileges to modify
- Email sending rate-limited to prevent abuse
- PDF generation uses secure temporary storage
- Database credentials never exposed to client

## Troubleshooting

### Salesforce Connection Issues
- Verify OAuth credentials are correct
- Ensure redirect URI matches exactly (including https/http)
- Check Salesforce API limits haven't been exceeded

### PDF Generation Failures
- Increase Vercel function timeout if needed
- Check memory limits for large datasets
- Verify PDF template renders correctly

### Email Delivery Issues
- Confirm email service API key is valid
- Check SPF/DKIM records for your domain
- Verify "from" email is authenticated

## Roadmap

- [ ] Multi-tier commission structures
- [ ] Team hierarchy and rollup commissions
- [ ] Commission adjustments and overrides
- [ ] Historical commission rule tracking
- [ ] Advanced reporting and analytics
- [ ] Mobile-responsive design improvements
- [ ] Audit log for all commission changes

## Support

For questions or issues, please open an issue on GitHub or contact the development team.

## License

MIT