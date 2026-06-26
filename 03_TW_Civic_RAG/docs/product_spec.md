# TW Civic RAG Product Spec

## Product Summary

TW Civic RAG is a Traditional Chinese document QA system for small teams with many documents. Users upload PDFs or text files, ask questions, and receive grounded answers with citations.

The product should feel practical, trustworthy, and easy to explain to non-technical users.

## Product Goals

- Reduce time spent searching long Traditional Chinese documents.
- Make answers auditable through source citations.
- Avoid hallucinated answers by refusing when evidence is missing.
- Provide a reusable RAG product foundation for different client domains.

## Target Users

- Tutoring centers: course rules, tuition policies, parent notices, student handbook.
- Student teams: project documents, meeting notes, proposal references.
- Small companies: SOP, onboarding docs, HR rules, internal FAQs.
- Contractor teams: project documents, customer requirements, maintenance records.
- Document-heavy studios: contracts, briefs, SOPs, service rules.
- Clubs and event organizations: event rules, registration docs, volunteer guidelines.

## Core User Flow

1. User uploads a PDF or document.
2. System extracts text and metadata.
3. System splits text into chunks.
4. System creates embeddings for chunks.
5. User asks a question.
6. System retrieves relevant chunks through vector search.
7. System generates an answer with citations.
8. System shows source snippets.
9. If confidence is too low, system answers that the document does not contain enough evidence.

## MVP Scope

The first MVP should include:

- Single workspace or single collection.
- PDF/text upload placeholder.
- Document list.
- Chunking pipeline prototype.
- Embedding and vector search adapter interface.
- Ask endpoint.
- Answer with citations.
- Unknown-answer fallback.
- Small evaluation dataset.

Out of scope for first MVP:

- Multi-tenant billing.
- Advanced permissions.
- Complex document versioning.
- OCR-heavy scanned PDF support.
- Enterprise search across many databases.

## Success Criteria

- A user can upload a small Traditional Chinese document set.
- A user can ask at least five document-grounded questions.
- Answers show cited source snippets.
- The system refuses at least one unsupported question.
- Evaluation results are documented.

## Product Tone

The product should not present itself as a magical chatbot. It should present itself as a document assistant that helps users find and verify answers faster.
