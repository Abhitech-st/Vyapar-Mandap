import os
import tempfile
import unittest
from codex_tools import find_text, search_and_replace, add_line, delete_lines, get_file_outline

class TestCodexTools(unittest.TestCase):

    def setUp(self):
        self.test_dir = tempfile.TemporaryDirectory()
        self.sample_file = os.path.join(self.test_dir.name, "sample.py")
        content = (
            "class SampleClass:\n"
            "    def __init__(self):\n"
            "        self.name = 'vyapar'\n"
            "\n"
            "    def calculate_total(self, amount):\n"
            "        return amount * 1.18\n"
        )
        with open(self.sample_file, 'w', encoding='utf-8') as f:
            f.write(content)

    def tearDown(self):
        self.test_dir.cleanup()

    def test_find_text(self):
        matches = find_text(self.sample_file, "calculate_total")
        self.assertEqual(len(matches), 1)
        self.assertEqual(matches[0]["line_number"], 5)

    def test_search_and_replace(self):
        res = search_and_replace(self.sample_file, "1.18", "1.05")
        self.assertEqual(res["status"], "success")
        with open(self.sample_file, 'r', encoding='utf-8') as f:
            new_content = f.read()
        self.assertIn("1.05", new_content)
        self.assertNotIn("1.18", new_content)

    def test_add_line_at_beginning(self):
        res = add_line(self.sample_file, "#!/usr/bin/env python3", at_line=1)
        self.assertEqual(res["status"], "success")
        with open(self.sample_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        self.assertTrue(lines[0].startswith("#!/usr/bin/env python3"))

    def test_add_line_insert_after(self):
        res = add_line(self.sample_file, "        # Helper comment", insert_after="def calculate_total")
        self.assertEqual(res["status"], "success")
        with open(self.sample_file, 'r', encoding='utf-8') as f:
            content = f.read()
        self.assertIn("Helper comment", content)

    def test_delete_lines(self):
        res = delete_lines(self.sample_file, 4, 4)
        self.assertEqual(res["status"], "success")

    def test_get_file_outline(self):
        symbols = get_file_outline(self.sample_file)
        names = [s["name"] for s in symbols]
        self.assertIn("SampleClass", names)
        self.assertIn("calculate_total", names)

if __name__ == "__main__":
    unittest.main()
