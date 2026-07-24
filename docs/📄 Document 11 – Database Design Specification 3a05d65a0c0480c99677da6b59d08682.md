# 📄 Document 11 – Database Design Specification

We design the **database before writing APIs**, because:

> **Database → APIs → Backend → Frontend → AI Pipeline**
> 

This order minimizes redesign later.

---

# 

**File:** `docs/06_Database/Database_Design.md`

---

# Jagin AI – Database Design Specification

**Document ID:** DB-001

**Version:** 1.0

**Status:** Draft

**Database:** PostgreSQL + pgvector

**ORM:** Prisma ORM

**Prepared By:** Architecture Team

**Last Updated:** July 2026

---

# 1. Purpose

This document defines the logical and physical data model for Jagin AI.

The database is designed for:

- Multi-tenancy
- High scalability
- AI retrieval
- Enterprise security
- Auditability
- Future microservices

---

# 2. Database Overview

We will use:

| Purpose | Technology |
| --- | --- |
| Relational Data | PostgreSQL |
| Vector Embeddings | pgvector |
| Cache | Redis |
| File Storage | S3-compatible Object Storage |
| Search Index | PostgreSQL FTS (MVP), Elasticsearch/OpenSearch (future) |

---

# 3. High-Level Entity Relationship Diagram

```
Organization
    │
    ├──────── Users
    │
    ├──────── Workspaces
    │              │
    │              ├──────── Collections
    │              │          │
    │              │          ├──────── Documents
    │              │          │          │
    │              │          │          ├──────── Chunks
    │              │          │          │
    │              │          │          └──────── Embeddings
    │              │
    │              ├──────── Conversations
    │              │
    │              ├──────── Search History
    │              │
    │              └──────── Analytics
```

---

# 4. Core Database Modules

The schema is divided into domains:

## Identity

- User
- Session
- OAuthAccount
- RefreshToken

---

## Organization

- Organization
- Workspace
- Member
- Invitation

---

## Documents

- Document
- DocumentVersion
- Collection
- Category
- Tag

---

## AI

- Conversation
- Message
- Citation
- AIResponse
- Prompt

---

## Search

- SearchQuery
- SearchResult
- RetrievalLog

---

## Security

- Role
- Permission
- AuditLog

---

## Integrations

- Connector
- SyncJob

---

## Analytics

- UsageEvent
- Feedback
- Metrics

---

# 5. Organization Schema

### Organization

```
id
name
slug
plan
status
logo
created_at
updated_at
```

---

### Workspace

```
id
organization_id
name
description
visibility
created_at
```

---

### Member

```
id
organization_id
user_id
role_id
joined_at
status
```

---

# 6. User Schema

```
User

id
email
password_hash
full_name
avatar
status
last_login
created_at
updated_at
```

Relationships:

- One user

↓

Many organizations

↓

Many workspaces

↓

Many conversations

---

# 7. Document Schema

```
Document

id
workspace_id
collection_id
title
filename
mime_type
size
storage_path
checksum
language
status
created_by
created_at
```

---

# 8. Document Version

```
id
document_id
version
summary
storage_path
created_at
```

Supports:

- Version history
- Rollback
- AI indexing

---

# 9. Chunk Schema

Each document is divided into semantic chunks.

```
Chunk

id
document_id
page
sequence
text
token_count
metadata
```

---

# 10. Embedding Schema

```
Embedding

id
chunk_id
model
dimensions
vector
created_at
```

Vector stored using:

pgvector

---

# 11. Conversation Schema

```
Conversation

id
workspace_id
user_id
title
created_at
updated_at
```

---

# 12. Message Schema

```
Message

id
conversation_id
role
content
tokens
latency
created_at
```

---

# 13. Citation Schema

```
Citation

id
message_id
document_id
chunk_id
confidence
verified
page
```

This is a key differentiator—citations are stored as first-class entities for traceability.

---

# 14. Search Schema

```
SearchQuery

id
user_id
query
embedding
filters
latency
```

---

```
SearchResult

id
query_id
document_id
chunk_id
score
rerank_score
```

---

# 15. AI Response Schema

```
AIResponse

id
message_id
confidence
hallucination_score
model
processing_time
verification_status
```

---

# 16. Audit Log Schema

```
AuditLog

id
actor_id
action
resource
resource_id
ip_address
metadata
created_at
```

Tracks all security-sensitive actions.

---

# 17. Integration Schema

```
Connector

id
workspace_id
provider
status
credentials_ref
last_sync
```

---

```
SyncJob

id
connector_id
status
started_at
completed_at
records_processed
errors
```

---

# 18. Feedback Schema

```
Feedback

id
message_id
user_id
rating
comment
created_at
```

This supports continuous improvement of retrieval and AI quality.

---

# 19. Relationships

- Organization → Workspaces (1:N)
- Workspace → Collections (1:N)
- Collection → Documents (1:N)
- Document → Versions (1:N)
- Document → Chunks (1:N)
- Chunk → Embeddings (1:1 or 1:N depending on model versions)
- User → Conversations (1:N)
- Conversation → Messages (1:N)
- Message → Citations (1:N)

---

# 20. Indexing Strategy

Indexes should be created on:

- Email
- Organization slug
- Workspace ID
- Document status
- Created dates
- Search query timestamps
- Foreign keys

Additionally:

- Full-text indexes for keyword search
- Vector indexes for semantic retrieval

---

# 21. Soft Deletes

Entities should include:

```
deleted_at
deleted_by
```

Instead of hard deletion, enabling recovery and auditability.

---

# 22. Multi-Tenancy

Every tenant-owned table includes:

```
organization_id
workspace_id
```

This ensures strict logical isolation between organizations.

---

# 23. Naming Conventions

- Table names: singular (e.g., `User`, `Document`)
- Columns: `snake_case`
- UUIDs for primary keys
- Timestamps in UTC

---

# 24. Migration Strategy

Use Prisma Migrate with:

- Version-controlled migrations
- Seed scripts for development
- Backward-compatible schema changes where possible
- Rollback plans for production deployments

---

# 25. Future Database Enhancements

The schema is designed to support future features without major redesign:

- Knowledge Graph nodes and relationships
- AI memory stores
- Workflow execution history
- Prompt templates
- Model registry
- AI evaluation datasets
- Multi-region replication

---

# 🏆 A Major Improvement I'd Add

Most RAG systems stop at storing documents and embeddings. I recommend adding **Knowledge Objects** as a first-class concept.

Instead of treating everything as raw text, Jagin AI can extract structured entities and relationships during ingestion:

```
Document
      │
      ▼
Knowledge Objects
      │
 ├── Person
 ├── Organization
 ├── Product
 ├── Policy
 ├── Project
 ├── Contract
 ├── Process
 └── Event
```

These objects can later power:

- Knowledge Graphs
- Relationship exploration
- "Show all projects involving Team X"
- Cross-document reasoning
- Better retrieval quality
- Future GraphRAG capabilities

This prepares Jagin AI for capabilities that go beyond traditional RAG.

---

# 🚀 Next Major Document

The next document is **API Specification**.

This will define **every endpoint** in the platform, including:

- Authentication APIs
- User management
- Organizations
- Workspaces
- Documents
- Uploads
- Search
- AI chat
- Retrieval
- Citations
- Analytics
- Administration
- Integrations
- Webhooks

I estimate **250–400 REST endpoints** by the time Jagin AI reaches version 1.0, all documented with request/response schemas, authentication requirements, error codes, pagination, and examples. This API specification will become the contract between the frontend, backend, and any future SDKs or third-party integrations.