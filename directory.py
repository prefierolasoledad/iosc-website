import os
import sys
from pathlib import Path


def extract_directory_structure(root_path, output_file, max_depth=None, exclude_dirs=None, include_files=True):
    """
    Extract directory structure and save to file

    Args:
        root_path (str): Path to the root directory
        output_file (str): Output file path
        max_depth (int): Maximum depth to traverse (None for unlimited)
        exclude_dirs (list): List of directory names to exclude
        include_files (bool): Whether to include files in output
    """
    if exclude_dirs is None:
        exclude_dirs = ['.git', 'node_modules', '.next', '__pycache__', '.venv', 'venv', 'dist', 'build']

    root_path = Path(root_path).resolve()

    def should_exclude(path):
        return any(excluded in path.parts for excluded in exclude_dirs)

    def get_tree_structure(path, prefix="", depth=0):
        if max_depth is not None and depth > max_depth:
            return []

        if should_exclude(path):
            return []

        items = []
        try:
            # Get all items in directory
            all_items = sorted(path.iterdir(), key=lambda x: (x.is_file(), x.name.lower()))

            for i, item in enumerate(all_items):
                if should_exclude(item):
                    continue

                is_last = i == len(all_items) - 1
                current_prefix = "└── " if is_last else "├── "
                next_prefix = "    " if is_last else "│   "

                if item.is_dir():
                    items.append(f"{prefix}{current_prefix}{item.name}/")
                    items.extend(get_tree_structure(item, prefix + next_prefix, depth + 1))
                elif include_files:
                    items.append(f"{prefix}{current_prefix}{item.name}")

        except PermissionError:
            items.append(f"{prefix}[Permission Denied]")

        return items

    try:
        structure_lines = [f"{root_path.name}/"]
        structure_lines.extend(get_tree_structure(root_path))

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(structure_lines))

        print(f"Directory structure saved to: {output_file}")
        print(f"Total lines: {len(structure_lines)}")

        # Also print first few lines as preview
        print("\nPreview:")
        print('\n'.join(structure_lines[:20]))
        if len(structure_lines) > 20:
            print("...")

    except Exception as e:
        print(f"Error: {e}")


def simple_structure(root_path, output_file, max_depth=2):
    """Simplified version that just lists directories and key files"""
    root_path = Path(root_path).resolve()
    exclude_dirs = {'.git', 'node_modules', '.next', '__pycache__', '.venv', 'venv', 'dist', 'build'}
    key_files = {'package.json', 'requirements.txt', 'Dockerfile', 'README.md', 'next.config.js', 'tailwind.config.js'}

    structure = []

    def traverse(path, depth=0, prefix=""):
        if depth > max_depth:
            return

        try:
            items = sorted(path.iterdir(), key=lambda x: (x.is_file(), x.name.lower()))

            for item in items:
                if item.name.startswith('.') and item.name not in {'.env.example', '.gitignore'}:
                    continue
                if item.name in exclude_dirs:
                    continue

                if item.is_dir():
                    structure.append(f"{prefix}{item.name}/")
                    if depth < max_depth:
                        traverse(item, depth + 1, prefix + "  ")
                elif item.name in key_files or depth == 0:
                    structure.append(f"{prefix}{item.name}")

        except PermissionError:
            pass

    structure.append(f"{root_path.name}/")
    traverse(root_path)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(structure))

    print(f"Simple structure saved to: {output_file}")
    print('\n'.join(structure))


if __name__ == "__main__":
    # Example usage
    current_dir = "."  # Current directory
    output_file = "directory_structure.txt"

    # You can modify these parameters
    ROOT_PATH = current_dir
    OUTPUT_FILE = output_file
    MAX_DEPTH = 3  # Limit depth to avoid huge outputs
    INCLUDE_FILES = True  # Set to False to only show directories

    print("Choose extraction method:")
    print("1. Full tree structure")
    print("2. Simple structure (directories + key files only)")

    choice = input("Enter choice (1 or 2): ").strip()

    if choice == "2":
        simple_structure(ROOT_PATH, OUTPUT_FILE, MAX_DEPTH)
    else:
        extract_directory_structure(
            root_path=ROOT_PATH,
            output_file=OUTPUT_FILE,
            max_depth=MAX_DEPTH,
            include_files=INCLUDE_FILES
        )