# Data Model: Modal Navigation and Editing

## Changes
- **No changes required** to the existing `KnowledgeItemModel`.
- The existing `metadata_val` field will be used for metadata editing.
- The existing `PUT /knowledge-items/{item_id}` endpoint already supports all required fields.

## Reference: KnowledgeItemModel
| Field | Type | Description |
|---|---|---|
| id | Integer | Primary Key |
| question | Text | Question or title |
| answer | Text | Answer or content |
| metadata_val | Text | Metadata string |
| category | String | Item category |
