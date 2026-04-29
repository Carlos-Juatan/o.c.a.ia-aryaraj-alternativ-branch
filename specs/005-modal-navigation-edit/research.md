# Research: Modal Navigation and Content Editing

## Decision: Navigation Logic
- **Chosen**: Use the `filteredItems` array and the `originalIndex` stored in `maximizedItem` to determine the previous and next items.
- **Rationale**: Since `filteredItems` is already sorted/filtered by the UI, it's the most natural context for navigation.
- **Implementation**:
  - `currentIndex = filteredItems.findIndex(i => i.id === maximizedItem.id)`
  - `prevItem = filteredItems[currentIndex - 1]`
  - `nextItem = filteredItems[currentIndex + 1]`

## Decision: Metadata Handling
- **Chosen**: Display and edit metadata as a single text field or JSON-like string, consistent with how it's currently rendered (`{maximizedItem.metadata}`).
- **Rationale**: To minimize complexity in the UI while meeting the requirement of "all fields editable".
- **Alternative considered**: Key-value pair editor. Rejected for now to keep the UI clean, unless metadata is already an object in state. (Research shows it's currently treated as a string in the UI).

## Decision: Keyboard Navigation
- **Chosen**: Use `window.addEventListener('keydown', ...)` when `maximizedItem` is active and `!isEditingMaximized`.
- **Rationale**: standard accessibility practice.

## Decision: Persistence
- **Chosen**: Use `PUT /knowledge-items/{item_id}` for individual updates.
- **Rationale**: This is the standard endpoint for single item modifications.
- **Endpoint**: `api.put(`/knowledge-items/${item_id}`, { question, answer, category, metadata_val })`

## Decision: Edit State Management
- **Chosen**: Initialize a `maximizedForm` state when "Edit" is clicked, pre-filled with `maximizedItem` data.
- **Rationale**: Decoupling the form from the display state prevents unwanted updates if the user cancels.
