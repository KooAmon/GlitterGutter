# Column Number in Gutter

This VS Code extension shows the **current cursor column number** in the gutter next to the line number.

## Features
- Displays `<line_number>-<column_number>` beside the active line.
- Updates live as you move the cursor.

## Usage
1. Install the extension.
2. Open any file.
3. Move the cursor — the column number appears next to the line number.

## Known Limitations
- Uses decoration overlay, not a true modification of the line number column.
- If the line extends beyond the viewport and the cursor is moved to view it, the display will scroll out of view to the left.
