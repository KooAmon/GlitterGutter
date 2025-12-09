# Column Number in Gutter

This VS Code extension shows the **current cursor column number** in the gutter next to the line number.

## Features
- Displays `<line_number>-<column_number>` beside the active line.
- Updates live as you move the cursor.

## Installation

### Easiest Method: Install as Development Extension

1. Clone or download this repository
2. Open VS Code
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type and select: **Developer: Install Extension from Location...**
5. Browse to the `GlitterGutter` folder and select it
6. Reload VS Code when prompted

That's it! The extension will now be installed and active.

### Alternative: Link to Extensions Folder (For Development)

This method keeps the extension in your working directory so changes take effect immediately after reloading.

**Windows:**
```powershell
cd %USERPROFILE%\.vscode\extensions
mklink /D GlitterGutter "c:\Development\GitHub\GlitterGutter"
```

**Mac/Linux:**
```bash
ln -s /path/to/GlitterGutter ~/.vscode/extensions/GlitterGutter
```

Then reload VS Code (`Ctrl+Shift+P` → "Reload Window").

### For Development/Testing
1. Open the `GlitterGutter` folder in VS Code
2. Press **F5** to launch Extension Development Host

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
1. Once installed, the extension activates automatically on startup
2. Open any file
3. Move the cursor — the column number appears next to the line number in `<line>-<column>` format

## Known Limitations
- Uses a decoration overlay; it does not replace VS Code’s native line-number rendering.
- Line numbers are hidden while the extension is active and restored on deactivate.
- Word wrap is enabled globally while the extension runs and restored on deactivate.
