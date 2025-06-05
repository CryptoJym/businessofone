# Stream 6: Forms & Lead Capture

## Overview
Implement lead capture forms aligned with Business of One's conversion goals to transform visitors into qualified leads.

## Conversion Goals (Priority Order)
1. **Primary**: Book consultation
2. **Secondary**: Download resource
3. **Tertiary**: Newsletter signup

## Forms to Implement

### 1. Book Consultation Form (Primary CTA)
**Purpose**: Capture high-intent leads ready for a strategy session

**Fields**:
- Name (required)
- Email (required)
- Phone (optional)
- Business Type (dropdown)
- Current Revenue Range (dropdown)
- Biggest Challenge (textarea)
- Preferred Contact Time (dropdown)

**Features**:
- Calendar integration for scheduling
- Automated confirmation email
- Lead scoring based on inputs
- CRM integration

### 2. Resource Download Form
**Purpose**: Capture mid-funnel leads interested in self-serve content

**Fields**:
- Name (required)
- Email (required)
- Business Type (dropdown)
- Resource Interest (hidden, auto-populated)

**Resources to Gate**:
- "Solo Business Growth Checklist"
- "Automation Readiness Assessment"
- "Business Audit Template"

### 3. Newsletter Signup Form
**Purpose**: Nurture early-stage leads with valuable content

**Fields**:
- Email (required)
- First Name (optional)
- Business Stage (dropdown)

**Features**:
- Inline validation
- Success messaging
- Welcome email automation

## Technical Implementation

### Form Components
- React Hook Form for form management
- Zod for validation
- Shadcn/ui components for UI
- Server actions for submission

### Lead Management
- Store leads in database
- Send to CRM (HubSpot/Salesforce)
- Trigger email automations
- Track conversion events

### Analytics & Tracking
- Form abandonment tracking
- Conversion rate monitoring
- A/B testing capability
- UTM parameter capture

## User Experience

### Design Principles
- Minimal friction (progressive disclosure)
- Mobile-first responsive design
- Clear value proposition per form
- Trust signals (privacy, testimonials)

### Form Placement
1. **Consultation Form**:
   - Hero section CTA
   - Floating action button
   - Exit intent popup
   - Footer CTA

2. **Resource Forms**:
   - Resource library page
   - Blog post CTAs
   - Sidebar widgets

3. **Newsletter**:
   - Footer subscription
   - Blog post endings
   - About page

## Implementation Phases

### Phase 1: Core Forms
- [ ] Set up form infrastructure
- [ ] Create reusable form components
- [ ] Implement consultation booking form
- [ ] Add basic email notifications

### Phase 2: Lead Management
- [ ] Database schema for leads
- [ ] API endpoints for form submission
- [ ] Email automation setup
- [ ] CRM integration

### Phase 3: Optimization
- [ ] A/B testing framework
- [ ] Analytics integration
- [ ] Progressive profiling
- [ ] Lead scoring

## Success Metrics
- Form conversion rate > 15%
- Consultation booking rate > 5%
- Resource download rate > 25%
- Newsletter signup rate > 10%

## Next Steps
1. Set up Next.js frontend structure
2. Create form component library
3. Implement consultation booking form
4. Set up backend API for lead capture