# RoxanneJoiner

Independent website starter using the existing storefront architecture. Brand references, metadata, domains, email addresses, browser storage keys, logo and icons use RoxanneJoiner.

## Local setup

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and supply this website's own database, payment, email and other service settings.
3. Run `npm run dev`.

The assumed domain is `roxannejoiner.com`; update it before launch if different. Email addresses on that domain are placeholders until configured. No production environment files or deployment linkage were copied. This folder has no upstream Git remote.

The layout, colors, catalog assets and storefront features are retained. Review inherited product photos (which may contain photographed branding), catalog content, business address, phone, policies, social links and third-party integrations before launch. Database catalog records were not copied. Configure a separate database using the schema/scripts in this project; never use another store's credentials for imports.

## Kayak brand direction

RoxanneJoiner is a kayak brand. The storefront uses kayaking copy, collection filters, FAQs, an original kayak illustration, and kayak-specific review selection. Legacy collection URLs redirect to search. Product records have not been imported or relabeled; add the actual kayak catalog to a dedicated database. Old copied product assets are unused starter files, not a published kayak catalog.

Contact channels are optional settings in `.env.example` and remain hidden until confirmed. Confirm shipping terms, returns, business details and service integrations before launch. Existing store verification and Meta Pixel identifiers have been removed. Payment and order architecture is retained.
