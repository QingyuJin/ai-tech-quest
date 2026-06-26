# TW Civic RAG

TW Civic RAG is a Traditional Chinese document question-answering product. It helps small teams upload documents, ask questions in natural language, and receive grounded answers with visible citations.

The current stage is product planning and minimal architecture only. Full RAG implementation comes later.

## Product Name

TW Civic RAG.

## What This Product Is

TW Civic RAG is a document QA system for Traditional Chinese PDFs and text documents. It is designed for teams that have many internal documents but do not have the time or technical staff to search them manually.

The product goal is simple:

- Upload PDF or text documents.
- Split documents into searchable chunks.
- Retrieve relevant chunks with embeddings and vector search.
- Generate answers with citations.
- Say "I do not know" when source documents do not contain enough evidence.

## Problem

Many small teams store important knowledge in scattered PDFs, handbooks, rules, meeting notes, announcements, and policy documents. Search is often slow, and generic chatbots may answer confidently without proof.

TW Civic RAG solves this by requiring answers to be grounded in retrieved source snippets.

## Target Users

- Tutoring centers.
- Student teams.
- Small companies.
- Contractor teams.
- Studios with many documents.
- Clubs, associations, and event organizations.

## Core Features

- PDF and document upload.
- Document parsing and text extraction.
- Document chunking.
- Embedding generation.
- Vector search.
- RAG answer generation.
- Source citation display.
- Unknown-answer behavior when evidence is missing.
- Simple evaluation set for retrieval and answer quality.

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

## Tech Stack

Planned MVP stack:

- Python.
- FastAPI.
- Pydantic.
- PDF parsing with PyMuPDF or pdfplumber.
- OpenAI embeddings or local multilingual embeddings.
- FAISS, Chroma, or Supabase Vector.
- React + Vite + Tailwind CSS.
- Python evaluation scripts and small JSON fixtures.

## Evaluation Method

The MVP should not be judged only by whether the answer sounds good. It should be evaluated with:

- Retrieval hit rate: did the system retrieve the right source chunk?
- Citation coverage: does the answer cite the evidence it used?
- Groundedness: is every claim supported by retrieved sources?
- Unknown-answer quality: does the system refuse when documents do not contain the answer?
- Traditional Chinese handling: does chunking and retrieval work well for Chinese text?

Details:

```text
docs/evaluation_plan.md
```

## Monetization

TW Civic RAG can become a document assistant package for small teams:

- Tutoring center handbook / FAQ assistant.
- Small-company SOP assistant.
- Contractor project document assistant.
- Club or event organization document assistant.
- Internal document search tool for studios.

Details:

```text
docs/monetization.md
```

## Folder Structure

```text
03_TW_Civic_RAG/
|-- README.md
|-- docs/
|   |-- product_spec.md
|   |-- rag_architecture.md
|   |-- evaluation_plan.md
|   `-- monetization.md
|-- colab_experiments/
|-- backend/
|-- frontend/
`-- data/
```

## Current Status

- Product positioning defined.
- Minimal folder architecture created.
- RAG implementation intentionally not built yet.
- Next step: create a tiny document fixture and design the ingestion/chunking prototype.

## GitHub Placeholder

Future standalone repo:

```text
https://github.com/QingyuJin/tw-civic-rag
```
