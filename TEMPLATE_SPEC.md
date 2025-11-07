# Commission Statement Template Specification

This document defines the exact structure and layout for the commission statement template that will be displayed in the web application when selecting a sales representative.

## Template Structure

The template is organized into 5 main sections:

### 1. Header Section - Employee Information

**Location**: Top of page

**Fields**:
- **Payee**: Employee name
- **Year**: Commission year (e.g., 2025)
- **Period**: Current period end date
- **Comp Plan**: Commission plan name (e.g., "2025 EAM Comp Plan")
- **Employee Start Date**: Date employee started
- **Base Salary**: Annual base salary
- **Commission Target**: Annual commission target
- **BCR** (Base Commission Rate): Percentage rate (e.g., 11.11%)
- **OTE** (On-Target Earnings): Base + Commission Target
- **Quarterly Quotas**:
  - Q1 Quota
  - Q2 Quota
  - Q3 Quota
  - Q4 Quota
- **Annual Quota**: Total annual quota

**Layout**:
```
┌─────────────────────────────────────────────────────────────────┐
│                         2025 COMMISSIONS                        │
├─────────────────────────────────────────────────────────────────┤
│  Payee: Employee X                 Year: 2025                   │
│  Period: Oct 31, 2025              Plan: 2025 EAM Comp Plan     │
│  Start Date: Aug 21, 2023                                       │
├─────────────────────────────────────────────────────────────────┤
│  Base: $160,000      Commission: $160,000      BCR: 11.11%      │
│  OTE: $320,000                                                   │
├─────────────────────────────────────────────────────────────────┤
│  Q1: $40,000  │  Q2: $40,000  │  Q3: $40,000  │  Q4: $40,000   │
│                    Annual Quota: $160,000                       │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2. Commission Tier Rates

**Location**: Below header, as a reference table

**Tiers**:
- **Tier 1 (1x)**: 0-100% of quota → Base rate (11.11%)
- **Tier 2 (1.5x)**: 100.1-150% of quota → 1.5x rate (16.67%)
- **Tier 3 (2x)**: 150.1%+ of quota → 2x rate (22.22%)
- **Renewals**: Flat rate (2%)

**Multi-year Rates**:
- 1 Year: Base rate
- 2 Year: Base rate + 2%
- 3+ Year: Base rate + 3.5%

**Layout**:
```
┌───────────────────────────────────────────────────────────────────┐
│                      COMMISSION RATE STRUCTURE                    │
├──────────────────────┬────────────────────┬───────────────────────┤
│ Achievement Tier     │ Quota Range        │ Payout Percentage     │
├──────────────────────┼────────────────────┼───────────────────────┤
│ Tier 1 (1x)          │ 0% - 100%          │ 11.11%                │
│ Tier 2 (1.5x)        │ 100.1% - 150%      │ 16.67%                │
│ Tier 3 (2x)          │ 150.1%+            │ 22.22%                │
│ Renewals             │ Flat Rate          │ 2%                    │
├──────────────────────┴────────────────────┴───────────────────────┤
│ Multi-year Rates:  1 YR: +0%  │  2 YR: +2%  │  3+ YR: +3.5%       │
└───────────────────────────────────────────────────────────────────┘
```

---

### 3. Monthly Performance Tracking

**Location**: Main table section

**Columns**:
- **Period**: Month name (e.g., "Jan")
- **Quota Assigned**: Monthly or annual quota
- **Credit**: New ARR closed in that month
- **Credit YTD**: Year-to-date cumulative ARR
- **Attainment YTD**: Percentage of annual quota achieved

**Layout**:
```
┌────────────────────────────────────────────────────────────────────┐
│                     MONTHLY PERFORMANCE - NEW ARR                  │
├─────────┬──────────────┬──────────┬─────────────┬──────────────────┤
│ Period  │ Quota        │ Credit   │ Credit YTD  │ Attainment YTD   │
├─────────┼──────────────┼──────────┼─────────────┼──────────────────┤
│ Jan     │ $1,440,000   │ $90,000  │ $90,000     │ 6.25%            │
│ Feb     │ $1,440,000   │ $120,000 │ $210,000    │ 14.58%           │
│ Mar     │ $1,440,000   │ $246,500 │ $456,500    │ 31.70%           │
│ Apr     │ $1,440,000   │ $144,600 │ $601,100    │ 41.74%           │
│ May     │ $1,440,000   │ $354,520 │ $955,620    │ 66.36%           │
│ Jun     │ $1,440,000   │ $101,800 │ $1,057,420  │ 73.43%           │
│ Jul     │ $1,440,000   │ $3,500   │ $1,060,920  │ 73.68%           │
│ Aug     │ $1,440,000   │ $235,334 │ $1,296,254  │ 90.02%           │
│ Sep     │ $1,440,000   │ $352,800 │ $1,649,054  │ 114.52%          │
│ Oct     │ $1,440,000   │ $0       │ $1,649,054  │ 114.52%          │
│ Nov     │ $1,440,000   │ $0       │ $1,649,054  │ 114.52%          │
│ Dec     │ $1,440,000   │ $0       │ $1,649,054  │ 114.52%          │
└─────────┴──────────────┴──────────┴─────────────┴──────────────────┘
```

---

### 4. Commission Payout Schedule

**Location**: Below performance tracking

**Columns**:
- **Period Earned**: Month commissions were earned
- **Total Commissions Earned**: Calculated commission for that period
- **Period Paid**: Month commissions were/will be paid
- **Draw Paid**: Draw amount disbursed
- **Held Paid**: Previously held commissions paid out
- **Commission Paid**: Net commission paid
- **SPIFF Paid**: Special incentive payments
- **Total Held**: Cumulative held commissions
- **Total Paid**: Total payment for the period

**Notes Column**: Additional context (e.g., "Anthropic Webinar SPIFF paid")

**Layout**:
```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                           COMMISSION PAYOUT SCHEDULE                               │
├────────────┬──────────┬────────────┬──────────┬───────────┬────────────┬──────────┤
│ Period     │ Total    │ Period     │ Draw     │ Held      │ Commission │ SPIFF    │
│ Earned     │ Earned   │ Paid       │ Paid     │ Paid      │ Paid       │ Paid     │
├────────────┼──────────┼────────────┼──────────┼───────────┼────────────┼──────────┤
│ Jan-25     │ $10,000  │ Jan-25     │ $0       │ $0        │ $10,000    │ $0       │
│ Feb-25     │ $20,699  │ Feb-25     │ $0       │ $1,824    │ $20,699    │ $0       │
│ Mar-25     │ $34,277  │ Mar-25     │ $0       │ $0        │ $34,277    │ $0       │
│ Apr-25     │ $26,277  │ Apr-25     │ $0       │ $0        │ $22,789    │ $3,000   │
│ May-25     │ $39,391  │ May-25     │ $0       │ $3,488    │ $36,924    │ $0       │
│ Jun-25     │ $11,791  │ Jun-25     │ $0       │ $0        │ $11,791    │ $0       │
│ Jul-25     │ $1,089   │ Jul-25     │ $6,667   │ $0        │ $0         │ $1,500   │
│ Aug-25     │ $27,473  │ Aug-25     │ $13,333  │ $0        │ $1,858     │ $0       │
│ Sep-25     │ $59,395  │ Sep-25     │ $0       │ $2,468    │ $56,327    │ $0       │
│ Oct-25     │ $0       │ Oct-25     │ $0       │ $0        │ $0         │ $0       │
│ Nov-25     │ $0       │ Nov-25     │ $0       │ $0        │ $0         │ $0       │
│ Dec-25     │ $0       │ Dec-25     │ $0       │ $9,772    │ $0         │ $0       │
├────────────┴──────────┴────────────┴──────────┴───────────┴────────────┴──────────┤
│                                                                                    │
├────────────┬──────────┬────────────┬──────────────────────────────────────────────┤
│ Total Held │ Total    │ Notes                                                     │
│            │ Paid     │                                                           │
├────────────┼──────────┼───────────────────────────────────────────────────────────┤
│ $0         │ $10,000  │                                                           │
│ $1,824     │ $22,523  │                                                           │
│ $0         │ $34,277  │                                                           │
│ $3,488     │ $25,789  │                                                           │
│ $2,468     │ $40,411  │                                                           │
│ $0         │ $11,791  │                                                           │
│ $0         │ $8,167   │ Anthropic Webinar SPIFF paid                             │
│ $6,704     │ $15,192  │                                                           │
│ $0         │ $58,795  │                                                           │
│ $0         │ $0       │                                                           │
│ $0         │ $0       │                                                           │
│ $0         │ $9,772   │                                                           │
└────────────┴──────────┴───────────────────────────────────────────────────────────┘
```

---

### 5. Definitions

**Location**: Right side panel or footer

**Terms**:
- **Draw**: Draw, as defined in comp plan
- **Held**: Commissions held, to be paid at some future date
- **SPIFF**: Multi-year pre-pay at ARR thresholds as defined in comp plan or leadership commentary

**Layout**:
```
┌──────────────────────────────────────────────────────────────────┐
│                          DEFINITIONS                             │
├────────────┬─────────────────────────────────────────────────────┤
│ Term       │ Definition                                          │
├────────────┼─────────────────────────────────────────────────────┤
│ Draw       │ Draw, as defined in comp plan                       │
│ Held       │ Commissions held, to be paid at some future date    │
│ SPIFF      │ Multi-year pre-pay at ARR thresholds as defined in  │
│            │ comp plan or leadership commentary                  │
└────────────┴─────────────────────────────────────────────────────┘
```

---

## Color Scheme

### Header Sections
- Background: Light blue/gray (#E8F4F8 or similar)
- Text: Dark gray/black
- Borders: Medium gray

### Tables
- Header row: Darker blue (#4A90E2)
- Header text: White
- Alternating rows: White and very light gray (#F9F9F9)
- Borders: Light gray (#CCCCCC)

### Numbers
- Positive values: Black
- Negative values: Red
- Zero values: Light gray

---

## Formatting Rules

### Currency
- Display with dollar sign and comma separators
- 2 decimal places for cents (except when whole dollars)
- Example: $1,440,000 or $20,699.33

### Percentages
- Display with 2 decimal places
- Include % symbol
- Example: 11.11% or 73.43%

### Dates
- Short format for months: "Jan-25", "Feb-25"
- Long format for full dates: "October 31, 2025" or "Oct 31, 2025"

### Alignment
- Text: Left-aligned
- Numbers/Currency: Right-aligned
- Headers: Center-aligned (optional) or left-aligned

---

## Responsive Design

### Desktop (>1024px)
- Full layout as shown above
- Tables side-by-side where applicable

### Tablet (768px - 1024px)
- Stack sections vertically
- Maintain table structure
- Consider horizontal scrolling for wide tables

### Mobile (<768px)
- Card-based layout for each section
- Accordion/collapsible sections
- Simplified tables with essential columns only
- Consider pivoting tables to vertical card format

---

## Interactive Features

### Filters
- Year selector
- Month range selector
- Show/hide held commissions
- Show/hide draw information

### Tooltips
- Hover over terms to see definitions
- Hover over amounts to see calculation details

### Drill-down
- Click on monthly credit to see deal breakdown
- Click on commission earned to see calculation details

### Export
- Export to PDF button
- Export to Excel button
- Email to employee button

---

## Data Updates

### Real-time Updates
- Performance tracking updates as new deals close
- Payout schedule shows current and projected payments
- YTD calculations update automatically

### Historical Data
- Previous months locked/read-only
- Current month editable (for corrections)
- Future months show projections

---

## Calculation Logic

### Commission Earned
1. Calculate attainment % = (Credit YTD / Annual Quota)
2. Apply tier rates based on attainment
3. Apply multi-year multipliers
4. Apply renewal flat rate for renewal deals

### Commission Paid
1. Earned commission from previous month
2. Subtract draw paid (if applicable)
3. Add held commissions being released
4. Add SPIFF payments

### Held Commissions
- Commissions may be held based on comp plan rules
- Released on schedule or upon meeting conditions
- Tracked in "Total Held" column
