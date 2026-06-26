# Evaluation Plan

TW Civic RAG should be evaluated as a retrieval and grounded-answer system, not just a chatbot.

## Evaluation Goals

- Confirm the right source chunks are retrieved.
- Confirm answers are supported by cited sources.
- Confirm unsupported questions are refused.
- Confirm Traditional Chinese documents are handled well.

## MVP Evaluation Dataset

Create a small JSON evaluation set:

```json
[
  {
    "question": "報名截止日是什麼時候？",
    "expected_source_ids": ["doc-001-page-2-chunk-03"],
    "expected_answer_keywords": ["截止日", "日期"],
    "should_answer": true
  },
  {
    "question": "文件裡有提到停車折扣嗎？",
    "expected_source_ids": [],
    "expected_answer_keywords": [],
    "should_answer": false
  }
]
```

## Metrics

### Retrieval Hit Rate

Checks whether the expected source appears in top-k retrieved chunks.

Recommended MVP metric:

```text
hit@3
```

### Citation Coverage

Checks whether the final answer includes at least one cited source when the question should be answerable.

### Groundedness

Manual or semi-automated check:

- Does every important claim appear in the cited snippets?
- Does the answer avoid unsupported details?

### Unknown-Answer Accuracy

Checks whether the system refuses unsupported questions.

Expected behavior:

```text
I do not know based on the provided documents.
```

### Traditional Chinese Quality

Manual checks:

- Does chunking preserve complete Chinese sentences?
- Are headings and page numbers retained?
- Are mixed Chinese/English terms searchable?

## Evaluation Report Format

Each run should produce:

```text
retrieval_hit_rate
citation_coverage
unknown_answer_accuracy
notes
failed_cases
```

## First Benchmark Target

For the first small demo:

- `hit@3`: 80%+
- citation coverage: 90%+
- unknown-answer accuracy: 80%+

These numbers are not final production targets. They are early signals that the pipeline works.

## Failure Analysis

Track failures by category:

- bad text extraction
- bad chunk boundary
- embedding miss
- retrieval found related but incomplete context
- answer hallucinated
- citation missing
- unsupported question answered anyway

Failure categories should guide the next technical upgrade.
