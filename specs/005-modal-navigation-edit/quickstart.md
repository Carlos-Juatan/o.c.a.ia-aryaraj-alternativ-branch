# Quickstart: Modal Navigation and Editing

## Feature Overview
This feature adds sequential navigation and full content editing capabilities to the database item visualization modal in the `KnowledgeBaseManager`.

## Testing Steps

### 1. Sequential Navigation
1. Open the Knowledge Base Manager.
2. Click on any item to open the "Maximized" modal.
3. Verify that **Left** and **Right** arrows appear on the sides of the modal.
4. Click the **Right Arrow** to see the next item.
5. Click the **Left Arrow** to return to the previous item.
6. Press the **Right Arrow key** on your keyboard to navigate forward.
7. Press the **Left Arrow key** on your keyboard to navigate backward.
8. Verify that arrows are disabled/hidden at the first and last items of the list.

### 2. Content Editing
1. With the modal open, click the **"Editar"** button in the footer.
2. Verify that:
   - Navigation arrows and keyboard support are **disabled**.
   - Question, Answer, and Metadata fields turn into editable inputs/textareas.
3. Modify the content of any field (including metadata).
4. Click **"Atualizar"**.
5. Verify that a success message appears and the modal returns to "view" mode with updated data.
6. Re-open the modal or refresh the page to confirm persistence in the database.

### 3. Cancel Edit
1. Enter "Edit" mode.
2. Modify some text.
3. Click **"Cancelar"**.
4. Verify that the changes are discarded and the modal returns to "view" mode with the original content.
