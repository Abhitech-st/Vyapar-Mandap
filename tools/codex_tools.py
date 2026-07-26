"""
Codex Code Editing & Search Utility Tools
Provides high-performance functions for searching, replacing text, inserting lines, 
and obtaining file outlines across Python, TypeScript, JavaScript, and Markdown files.
"""

import os
import re

def find_text(search_path: str, query: str, is_regex: bool = False, case_sensitive: bool = False) -> list:
    """
    Search for exact string or regex matches in files or directories.
    Returns a list of match dictionaries containing filename, line_number, and snippet.
    """
    matches = []
    flags = 0 if case_sensitive else re.IGNORECASE

    if not os.path.exists(search_path):
        raise FileNotFoundError(f"Search path '{search_path}' does not exist.")

    files_to_search = []
    if os.path.isfile(search_path):
        files_to_search.append(search_path)
    else:
        for root, _, files in os.walk(search_path):
            for file in files:
                if any(file.endswith(ext) for ext in ['.py', '.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css', '.html']):
                    files_to_search.append(os.path.join(root, file))

    for filepath in files_to_search:
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                lines = f.readlines()
            for line_idx, line in enumerate(lines, 1):
                is_match = False
                if is_regex:
                    if re.search(query, line, flags):
                        is_match = True
                else:
                    if case_sensitive:
                        if query in line:
                            is_match = True
                    else:
                        if query.lower() in line.lower():
                            is_match = True
                if is_match:
                    matches.append({
                        "file": filepath,
                        "line_number": line_idx,
                        "snippet": line.strip()
                    })
        except Exception as e:
            continue

    return matches


def search_and_replace(file_path: str, target: str, replacement: str, count: int = -1) -> dict:
    """
    Replace target string in a file with replacement string.
    Returns details on number of replacements made.
    """
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"File '{file_path}' does not exist.")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    occurrences = content.count(target)
    if occurrences == 0:
        return {"status": "error", "message": f"Target string '{target}' not found in file.", "replacements": 0}

    new_content = content.replace(target, replacement, count if count > 0 else occurrences)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return {
        "status": "success",
        "file": file_path,
        "occurrences_found": occurrences,
        "replacements_made": occurrences if count <= 0 else min(count, occurrences)
    }


def add_line(file_path: str, line_content: str, at_line: int = None, insert_after: str = None, insert_before: str = None) -> dict:
    """
    Add a line to a file at a specific line number (1-indexed), or relative to target content.
    """
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"File '{file_path}' does not exist.")

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    line_to_add = line_content if line_content.endswith('\n') else line_content + '\n'

    if at_line is not None:
        idx = max(0, min(at_line - 1, len(lines)))
        lines.insert(idx, line_to_add)
        inserted_at = idx + 1
    elif insert_after is not None:
        inserted = False
        new_lines = []
        inserted_at = -1
        for i, line in enumerate(lines):
            new_lines.append(line)
            if insert_after in line and not inserted:
                new_lines.append(line_to_add)
                inserted = True
                inserted_at = i + 2
        if not inserted:
            return {"status": "error", "message": f"Pattern '{insert_after}' not found in file."}
        lines = new_lines
    elif insert_before is not None:
        inserted = False
        new_lines = []
        inserted_at = -1
        for i, line in enumerate(lines):
            if insert_before in line and not inserted:
                new_lines.append(line_to_add)
                inserted = True
                inserted_at = i + 1
            new_lines.append(line)
        if not inserted:
            return {"status": "error", "message": f"Pattern '{insert_before}' not found in file."}
        lines = new_lines
    else:
        # Default append to end of file
        lines.append(line_to_add)
        inserted_at = len(lines)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    return {
        "status": "success",
        "file": file_path,
        "inserted_at_line": inserted_at,
        "line_added": line_content.strip()
    }


def delete_lines(file_path: str, start_line: int, end_line: int = None) -> dict:
    """
    Delete line or range of lines from a file (1-indexed, inclusive).
    """
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"File '{file_path}' does not exist.")

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    end = end_line if end_line is not None else start_line
    start_idx = max(0, start_line - 1)
    end_idx = min(len(lines), end)

    if start_idx >= len(lines):
        return {"status": "error", "message": "Start line out of range."}

    deleted_count = end_idx - start_idx
    del lines[start_idx:end_idx]

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    return {
        "status": "success",
        "file": file_path,
        "deleted_count": deleted_count,
        "start_line": start_line,
        "end_line": end
    }


def get_file_outline(file_path: str) -> list:
    """
    Parse Python or TypeScript file and extract function, class, and method definitions with line numbers.
    """
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"File '{file_path}' does not exist.")

    symbols = []
    pattern = r"^\s*(class|def|function|const|export\s+function|export\s+const)\s+([A-Za-z0-9_]+)"

    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        for idx, line in enumerate(f, 1):
            match = re.search(pattern, line)
            if match:
                symbols.append({
                    "line_number": idx,
                    "kind": match.group(1).strip(),
                    "name": match.group(2).strip(),
                    "snippet": line.strip()
                })
    return symbols
