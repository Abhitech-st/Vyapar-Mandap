# Codex Code Manipulation & Search Tools (`tools/`)

High-performance Python utilities and CLI wrappers designed for AI agents and human developers to search, inspect outlines, replace code snippets, and insert/delete lines cleanly.

---

## 🛠️ CLI Tool Reference

### 1. `find`: Search text or regex patterns
```bash
python tools/cli.py find --path backend --query "JournalEntry"
python tools/cli.py find --path frontend/src --query "isBalanced" --case-sensitive
```

### 2. `replace`: Search and replace target text
```bash
python tools/cli.py replace --file backend/app/models/models.py --target "old_name" --replace "new_name"
```

### 3. `add-line`: Insert line before/after pattern or at line number
```bash
# Insert at line 1
python tools/cli.py add-line --file backend/app/main.py --line "#!/usr/bin/env python3" --at 1

# Insert after matching pattern
python tools/cli.py add-line --file backend/app/agents/supervisor.py --line "        # Audit check" --after "def create_task"
```

### 4. `delete`: Delete range of lines
```bash
python tools/cli.py delete --file path/to/file.py --start 10 --end 15
```

### 5. `outline`: Inspect classes and function definitions
```bash
python tools/cli.py outline --file backend/app/agents/invoice_agent.py
```

---

## 🐍 Python SDK Reference

```python
from tools.codex_tools import find_text, search_and_replace, add_line, delete_lines, get_file_outline

# 1. Search text
matches = find_text("backend", "JournalEntry")

# 2. Search and replace
res = search_and_replace("backend/app/main.py", "FastAPI()", "FastAPI(title='Vyapar Mandap')")

# 3. Insert line
res = add_line("backend/app/main.py", "import sys", at_line=1)

# 4. Get file outline
symbols = get_file_outline("backend/app/agents/supervisor.py")
```
