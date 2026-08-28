import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if style_match:
    css_content = style_match.group(1)
    with open('css/style.css', 'w', encoding='utf-8') as f:
        f.write(css_content.strip())
    print(f"Extracted CSS: {len(css_content)} bytes")
else:
    print("No style block found")
