import os
import csv
import re

def process_files(start_dir):
    inventory = []
    assets = []
    mapping = []

    for root, dirs, files in os.walk(start_dir):
        for file in files:
            filepath = os.path.join(root, file)

            # Asset tracking
            if not file.endswith('.md'):
                assets.append(filepath)
                continue

            # Read content
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                print(f"Error reading {filepath}: {e}")
                continue

            word_count = len(content.split())

            # Complex MkDocs syntax detection
            complex_syntax = []
            if re.search(r'^!!! ', content, re.MULTILINE):
                complex_syntax.append('admonitions')
            if re.search(r'=== "', content, re.MULTILINE):
                complex_syntax.append('tabs')
            if '{{' in content and '}}' in content:
                complex_syntax.append('macros')
            if '<div class="grid' in content:
                complex_syntax.append('grid')

            old_url = filepath.replace('docs/', '/').replace('index.md', '').replace('.md', '/')
            if old_url == '//': old_url = '/'

            # Map new Docusaurus path based on current structure
            new_url = old_url
            if filepath.startswith('docs/guides/'):
                new_url = old_url.replace('/guides/', '/docs/guides/')
            elif filepath.startswith('docs/portfolio/'):
                new_url = old_url.replace('/portfolio/', '/docs/portfolio/')
            elif filepath.startswith('docs/blog/'):
                new_url = old_url # stays /blog/...

            inventory.append({
                'source_path': filepath,
                'word_count': word_count,
                'complex_syntax': ', '.join(complex_syntax) if complex_syntax else 'none',
            })

            mapping.append({
                'source_path': filepath,
                'old_url': old_url,
                'new_url': new_url
            })

    return inventory, assets, mapping

inventory, assets, mapping = process_files('docs')

with open('migration-planning/content_inventory.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['source_path', 'word_count', 'complex_syntax'])
    writer.writeheader()
    writer.writerows(inventory)

with open('migration-planning/static_assets.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['asset_path'])
    for a in assets:
        writer.writerow([a])

with open('migration-planning/url_mapping.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['source_path', 'old_url', 'new_url'])
    writer.writeheader()
    writer.writerows(mapping)

print("CSV files created successfully.")
