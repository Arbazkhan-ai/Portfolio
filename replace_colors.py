import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements
    # 1. text-white -> text-[var(--color-text-primary)]
    content = re.sub(r'\btext-white\b', 'text-[var(--color-text-primary)]', content)
    
    # 2. hover:text-white -> hover:text-[var(--color-text-primary)]
    content = re.sub(r'hover:text-white\b', 'hover:text-[var(--color-text-primary)]', content)
    
    # 3. bg-white/ -> bg-black/ (for subtle glass backgrounds)
    content = re.sub(r'bg-white/\[?([\d\.]+)\]?', r'bg-black/[\1]', content)
    
    # 4. border-white/ -> border-black/
    content = re.sub(r'border-white/\[?([\d\.]+)\]?', r'border-black/[\1]', content)
    
    # 5. hover:border-white/ -> hover:border-black/
    content = re.sub(r'hover:border-white/\[?([\d\.]+)\]?', r'hover:border-black/[\1]', content)

    # 6. hover:bg-white/ -> hover:bg-black/
    content = re.sub(r'hover:bg-white/\[?([\d\.]+)\]?', r'hover:bg-black/[\1]', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    src_dir = os.path.join('d:\\Portfolio\\ai-portfolio', 'src')
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                replace_in_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
