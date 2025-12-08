# Column Number in Gutter

This VS Code extension shows the **current cursor column number** in the gutter next to the line number.

## Features
- Displays `<line_number>-<column_number>` beside the active line.
- Updates live as you move the cursor.

## Configuration
This extension exposes two settings under **GlitterGutter**:

- `glitterGutter.labelColor` – Foreground color of the gutter label. Default: `#888F99`
- `glitterGutter.labelBackground` – Background color of the gutter label. Default: `#0F0F0F`

You can change them via **Settings > Extensions > GlitterGutter** or directly in `settings.json`:

```jsonc
{
	"glitterGutter.labelColor": "#FFCC00",
	"glitterGutter.labelBackground": "#1E1E1E"
}
```

Changes apply immediately without reloading the window.

## Usage
1. Install the extension.
2. Open any file.
3. Move the cursor — the column number appears next to the line number.

## Known Limitations
- Uses a decoration overlay; it does not replace VS Code’s native line-number rendering.
- Line numbers are hidden while the extension is active and restored on deactivate.
- Word wrap is enabled globally while the extension runs and restored on deactivate.
