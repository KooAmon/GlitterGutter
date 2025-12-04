// Access VS Code's extension API.
const vscode = require('vscode');

// Main entry point invoked when the extension becomes active.
function activate(context) {
    // Decoration definition that emulates a custom gutter entry.
    const lineDecorationType = vscode.window.createTextEditorDecorationType({
        before: {
            color: '#888',
            fontWeight: 'bold'
        },
        isWholeLine: true
    });

    // Tracks each document's original line-number setting so we can restore it.
    const previousLineNumberStyles = new Map();

    // Disable VS Code's native line numbers while caching the prior style.
    function hideNativeLineNumbers(editor) {
        if (!editor) { return; }

        const uriKey = editor.document.uri.toString();

        if (!previousLineNumberStyles.has(uriKey)) {
            // Store the style the first time we see this editor's document.
            previousLineNumberStyles.set(uriKey, editor.options.lineNumbers);
        }

        if (editor.options.lineNumbers !== vscode.TextEditorLineNumbersStyle.Off) {
            // Apply the "off" style without disturbing other option fields.
            editor.options = {
                ...editor.options,
                lineNumbers: vscode.TextEditorLineNumbersStyle.Off
            };
        }
    }

    // Rebuild the simulated gutter for the supplied editor.
    function updateDecorations(editor = vscode.window.activeTextEditor) {
        if (!editor) { return; }

        hideNativeLineNumbers(editor);

        const activeLine = editor.selection.active.line;                        // Zero-based caret line.
        const activeColumn = editor.selection.active.character + 1;             // One-based caret column.
        const maxDigits = editor.document.lineCount.toString().length;          // Widest line count in digits.
        const activeColumnDigits = Math.max(2, activeColumn.toString().length); // Reserve space for column.
        const labelWidth = maxDigits + 1 + activeColumnDigits;                  // Total characters needed for "line-column".

        const visibleLines = new Set();
        editor.visibleRanges.forEach(range => {
            // Clamp the range to the document and gather each visible line index.
            const start = Math.max(range.start.line, 0);
            const end = Math.min(range.end.line, editor.document.lineCount - 1);

            for (let line = start; line <= end; line++) {
                visibleLines.add(line);
            }
        });

        if (visibleLines.size === 0 && editor.document.lineCount > 0) {
            // Fallback to the caret line when nothing else is visible (e.g., folded file).
            visibleLines.add(editor.selection.active.line);
        }

        const decorations = Array.from(visibleLines)
            .sort((a, b) => a - b)
            .map(line => {
            const lineNumber = line + 1;
            const isActive = line === activeLine;
            const label = isActive
                ? `${lineNumber}-${activeColumn}`
                : ''.padStart(labelWidth, ' ');
            // Use textDecoration to reserve horizontal space and keep the label pinned during horizontal scroll.
            const decorationCss = `none; left: 0; z-index: 10; display: inline-block; width: ${labelWidth + 1}ch; text-align: right; padding-right: 1ch; background-color: var(--vscode-editor-background);`;

            return {
                range: new vscode.Range(line, 0, line, 0),
                renderOptions: {
                    before: {
                        contentText: label,
                        textDecoration: decorationCss
                    }
                }
            };
        });

        // Apply the full decoration set so VS Code renders our new gutter.
        editor.setDecorations(lineDecorationType, decorations);
    }

    // Helper used for bulk refreshes across every open editor.
    function refreshAllVisibleEditors() {
        vscode.window.visibleTextEditors.forEach(updateDecorations);
    }

    // Subscribe to editor lifecycle events that can alter caret or layout state.
    context.subscriptions.push(
        lineDecorationType,
        vscode.window.onDidChangeTextEditorSelection(event => updateDecorations(event.textEditor)),
        vscode.window.onDidChangeActiveTextEditor(updateDecorations),
        vscode.window.onDidChangeTextEditorVisibleRanges(event => updateDecorations(event.textEditor)),
        vscode.window.onDidChangeVisibleTextEditors(refreshAllVisibleEditors),
        vscode.workspace.onDidChangeTextDocument(event => {
            const affectedEditors = vscode.window.visibleTextEditors.filter(editor => editor.document === event.document);
            affectedEditors.forEach(updateDecorations);
        })
    );

    // Prepare the simulated gutter for any editors already on screen.
    refreshAllVisibleEditors();

    // Restore native line numbers when the extension is disposed.
    context.subscriptions.push({
        dispose() {
            vscode.window.visibleTextEditors.forEach(editor => {
                const uriKey = editor.document.uri.toString();
                const previousStyle = previousLineNumberStyles.get(uriKey);
                if (previousStyle !== undefined) {
                    // Reinstate the editor's original line-number display preference.
                    editor.options = {
                        ...editor.options,
                        lineNumbers: previousStyle
                    };
                }
            });
        }
    });
}

// VS Code calls this when your extension is being torn down.
function deactivate() {}

// Expose the lifecycle hooks to VS Code.
module.exports = {
    activate,
    deactivate
};
