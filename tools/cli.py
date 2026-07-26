#!/usr/bin/env python3
"""
CLI Wrapper for Codex Code Search & Edit Tools
Usage:
  python tools/cli.py find --path backend --query "JournalEntry"
  python tools/cli.py replace --file path/to/file.py --target "old" --replace "new"
  python tools/cli.py add-line --file path/to/file.py --line "import sys" --at 1
  python tools/cli.py delete --file path/to/file.py --start 10 --end 15
  python tools/cli.py outline --file path/to/file.py
"""

import sys
import argparse
import json
from codex_tools import find_text, search_and_replace, add_line, delete_lines, get_file_outline

def main():
    parser = argparse.ArgumentParser(description="Codex Search, Edit & Code Manipulation CLI Tools")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # Subcommand: find
    find_parser = subparsers.add_parser("find", help="Find text or regex pattern in files")
    find_parser.add_argument("--path", required=True, help="Directory or file path to search")
    find_parser.add_argument("--query", required=True, help="Text query or regex pattern")
    find_parser.add_argument("--regex", action="store_true", help="Use regex matching")
    find_parser.add_argument("--case-sensitive", action="store_true", help="Perform case-sensitive match")

    # Subcommand: replace
    replace_parser = subparsers.add_parser("replace", help="Search and replace text in a file")
    replace_parser.add_argument("--file", required=True, help="Target file path")
    replace_parser.add_argument("--target", required=True, help="Exact text to replace")
    replace_parser.add_argument("--replace", required=True, help="Replacement text")
    replace_parser.add_argument("--count", type=int, default=-1, help="Max replacements")

    # Subcommand: add-line
    add_parser = subparsers.add_parser("add-line", help="Insert a line into a file")
    add_parser.add_argument("--file", required=True, help="Target file path")
    add_parser.add_argument("--line", required=True, help="Line content to insert")
    add_parser.add_argument("--at", type=int, help="Line number (1-indexed)")
    add_parser.add_argument("--after", help="Insert after matching line pattern")
    add_parser.add_argument("--before", help="Insert before matching line pattern")

    # Subcommand: delete
    delete_parser = subparsers.add_parser("delete", help="Delete lines from a file")
    delete_parser.add_argument("--file", required=True, help="Target file path")
    delete_parser.add_argument("--start", type=int, required=True, help="Start line number")
    delete_parser.add_argument("--end", type=int, help="End line number")

    # Subcommand: outline
    outline_parser = subparsers.add_parser("outline", help="Get code outline of classes & functions")
    outline_parser.add_argument("--file", required=True, help="Target file path")

    args = parser.parse_args()

    if args.command == "find":
        res = find_text(args.path, args.query, is_regex=args.regex, case_sensitive=args.case_sensitive)
        print(json.dumps(res, indent=2))
    elif args.command == "replace":
        res = search_and_replace(args.file, args.target, args.replace, count=args.count)
        print(json.dumps(res, indent=2))
    elif args.command == "add-line":
        res = add_line(args.file, args.line, at_line=args.at, insert_after=args.after, insert_before=args.before)
        print(json.dumps(res, indent=2))
    elif args.command == "delete":
        res = delete_lines(args.file, args.start, end_line=args.end)
        print(json.dumps(res, indent=2))
    elif args.command == "outline":
        res = get_file_outline(args.file)
        print(json.dumps(res, indent=2))

if __name__ == "__main__":
    main()
