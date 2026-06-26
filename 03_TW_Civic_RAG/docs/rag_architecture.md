# RAG Architecture

## Architecture Overview

```text
Document Upload
  -> Text Extraction
  -> Cleaning / Normalization
  -> Document Chunking
  -> Embedding Generation
  -> Vector Store
  -> User Question
  -> Query Embedding
  -> Vector Search
  -> Context Assembly
  -> RAG Answer
  -> Source Citations
  -> Evaluation Logs
```

## Components

### 1. Document Upload

Initial file types:

- PDF
- TXT
- Markdown

Future file types:

- DOCX
- CSV
- Google Docs export
- Scanned PDF with OCR

### 2. Text Extraction

Recommended libraries:

- PyMuPDF for PDF extraction.
- pdfplumber when layout inspection matters.
- python-docx for DOCX later.

Extraction output should preserve:

- document ID
- page number
- section title when available
- raw text
- source file name

### 3. Cleaning / Normalization

Traditional Chinese documents may contain:

- line breaks in the middle of sentences
- page headers and footers
- numbered sections
- tables
- mixed English and Chinese terms

The MVP should keep cleaning conservative. Do not over-normalize if it risks deleting useful legal, policy, or rule text.

### 4. Document Chunking

MVP chunking strategy:

- Split by headings when available.
- Fall back to character-length windows.
- Keep overlap between chunks.
- Store page numbers and document metadata.

Suggested first parameters:

```text
chunk_size: 500-900 Traditional Chinese characters
chunk_overlap: 80-150 characters
```

### 5. Embedding Generation

Adapter interface:

```text
embed_documents(chunks) -> vectors
embed_query(question) -> vector
```

Possible embedding providers:

- OpenAI embeddings.
- Local multilingual sentence-transformer.
- Other Traditional Chinese compatible embedding model.

### 6. Vector Store

MVP options:

- FAISS for local experiments.
- Chroma for simple local persistence.
- Supabase Vector for deployed MVP and client-facing demos.

Vector metadata should include:

- chunk_id
- document_id
- file_name
- page
- heading
- text snippet

### 7. Retrieval

First retrieval flow:

```text
question -> query embedding -> top_k vector search -> context snippets
```

Future retrieval upgrades:

- Hybrid keyword + vector search.
- Reranking.
- Metadata filters.
- Query rewriting.
- Chinese-specific token handling.

### 8. Answer Generation

The answer prompt should enforce:

- Use only retrieved context.
- Cite sources.
- Do not invent facts.
- Answer "I do not know based on the provided documents" when evidence is missing.

### 9. Source Citation

Each answer should return:

- answer
- confidence
- source snippets
- source file names
- page numbers
- chunk IDs

### 10. Replacement Points

Keep these layers replaceable:

- PDF parser.
- Chunking strategy.
- Embedding provider.
- Vector database.
- LLM provider.
- Evaluation runner.
