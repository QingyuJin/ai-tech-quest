# BuildFlow: Contractor Intake and Dispatch Management System

BuildFlow is positioned as a contractor business workflow product, not a pure website. It packages lead intake, project tracking, admin operations, customer communication, and future dispatch workflows into a practical MVP for service businesses.

## Product Name

BuildFlow: Contractor Intake and Dispatch Management System.

## Problem

Small contractor teams often manage incoming jobs through LINE messages, phone calls, spreadsheets, and memory. This creates repeated manual work:

- Customer inquiries are scattered across channels.
- Job status is hard to track.
- Admins need a central view of requests, quotes, and follow-ups.
- Dispatch and scheduling decisions are difficult without structured data.
- Small teams need an affordable MVP before investing in a heavy ERP or CRM.

BuildFlow addresses this by turning a service business process into a lightweight full-stack dashboard and communication workflow.

## Target Users

- Engineering contractors.
- Small repair and maintenance teams.
- Local service businesses that receive job requests through LINE.
- Admin staff who need a job intake and follow-up dashboard.
- Owners who want a simple MVP before building a custom ERP.

## Core Features

- Customer inquiry intake flow.
- Admin dashboard for job/request management.
- Contractor business process modeling.
- LINE Bot integration path for customer communication.
- Supabase-backed MVP data layer.
- Vercel Serverless Functions for lightweight backend actions.
- Future job status, quotation, dispatch, and notification modules.

## Tech Stack

- React.
- Vite.
- Tailwind CSS.
- React Router.
- Supabase.
- Vercel Serverless Functions.
- LINE Messaging API.

## Existing Product

BuildFlow already has an existing deployed foundation through `qingyu-web-studio`.

Existing repo:

```text
https://github.com/QingyuJin/qingyu-web-studio
```

Demo URL:

```text
https://qingyu-web-studio.vercel.app
```

This existing repo should be presented as the first public proof of the BuildFlow direction. The next product step is to make the workflow and business-process framing more explicit.

## Existing Repo

```text
https://github.com/QingyuJin/qingyu-web-studio
```

## Demo URL

```text
https://qingyu-web-studio.vercel.app
```

## What It Proves

BuildFlow demonstrates:

- Full-stack workflow design.
- Contractor business process thinking.
- Admin dashboard architecture.
- LINE Bot integration readiness.
- Supabase MVP backend design.
- The ability to turn a client pain point into a deployable product workflow.

## MVP Scope

- Keep the existing deployed repo as public proof.
- Reframe the product around contractor job intake and dispatch.
- Define admin dashboard entities: customer, request, quote, job status, dispatch note.
- Keep Supabase as the MVP backend path.
- Keep LINE Messaging API as the customer communication channel.

## Future Upgrade

Near-term upgrades:

1. Reframe the UI around contractor job intake and dispatch, not generic web delivery.
2. Add job/request status management.
3. Add customer, site, and contact records.
4. Add quotation and follow-up workflow.
5. Add LINE Bot push/reply actions for job updates.
6. Add Supabase row-level security and admin authentication.
7. Add dashboard metrics for open jobs, pending quotes, and completed work.
8. Write a public case study connected to AI Tech Quest Portfolio Unlock.

## Monetization

BuildFlow can become a client-facing productized service:

- Starter contractor intake dashboard.
- LINE-connected job request system.
- Admin dashboard customization package.
- Supabase MVP backend setup.
- Monthly maintenance and workflow improvement retainer.

## Roadmap

1. Audit the existing `qingyu-web-studio` implementation.
2. Define BuildFlow data entities and workflow states.
3. Add a contractor-focused case study.
4. Add Supabase-backed job/request records.
5. Add LINE Bot workflow proof.
6. Package the system as a freelance MVP offer.
