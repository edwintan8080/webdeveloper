import re

for filename in ['index.html', 'en/index.html']:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace style block with link tag
    new_content = re.sub(
        r'<style>.*?</style>',
        '<link rel="stylesheet" href="/css/style.css">',
        content,
        flags=re.DOTALL
    )
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {filename}")
