#!/bin/bash
# Tour & Travel Website — Quick Start Script
# Jalankan script ini untuk memulai project

set -e

echo "🚀 Setting up Tour & Travel Website project..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if Claude Code is installed
if ! command -v claude &> /dev/null; then
    echo -e "${YELLOW}⚠️  Claude Code belum terinstall.${NC}"
    echo "Install dengan: npm install -g @anthropic-ai/claude-code"
    echo ""
    read -p "Mau install sekarang? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install -g @anthropic-ai/claude-code
        echo -e "${GREEN}✅ Claude Code terinstall!${NC}"
    else
        echo "Install manual: npm install -g @anthropic-ai/claude-code"
        exit 1
    fi
fi

# Check Claude auth
echo -e "${BLUE}🔍 Checking Claude Code authentication...${NC}"
if ! claude auth status &> /dev/null; then
    echo -e "${YELLOW}⚠️  Belum login ke Claude Code.${NC}"
    echo "Jalankan: claude auth login"
    exit 1
fi
echo -e "${GREEN}✅ Authenticated!${NC}"
echo ""

# Create project directory
PROJECT_DIR="$HOME/tour-travel-website"
if [ -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}📁 Folder $PROJECT_DIR sudah ada.${NC}"
    read -p "Mau lanjutkan? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

echo -e "${BLUE}📁 Project directory: $PROJECT_DIR${NC}"
echo ""

# Show menu
echo "=========================================="
echo "  🌴 Tour & Travel Website Builder"
echo "=========================================="
echo ""
echo "Pilih opsi:"
echo ""
echo "  1) 🚀 Build website lengkap (recommended)"
echo "     → Claude Code akan buat semua file sekaligus"
echo ""
echo "  2) 🔨 Build bertahap (per bagian)"
echo "     → Lebih terkontrol, per file"
echo ""
echo "  3) 📖 Lihat prompt saja"
echo "     → Copy prompt, jalankan manual"
echo ""
echo "  4) 📤 Buka PROMPT.md"
echo "     → Lihat semua prompt yang tersedia"
echo ""
read -p "Pilih (1-4): " choice

case $choice in
    1)
        echo ""
        echo -e "${GREEN}🚀 Memulai build website lengkap...${NC}"
        echo "Claude Code akan bekerja, tunggu beberapa menit..."
        echo ""
        
        # Read the CLAUDE.md for context
        claude -p "Baca CLAUDE.md untuk context project. Buatkan website tour & travel lengkap dan production-ready. Ikuti SEMUA requirements di CLAUDE.md. Buat semua file: index.html, tours.html, tour-detail.html, about.html, contact.html, blog.html, faq.html, css/style.css, css/components.css, css/responsive.css, js/main.js, js/schema.js, js/analytics.js, llms.txt, llms-full.txt, robots.txt, sitemap.xml, .htaccess, 404.html. Setiap halaman harus punya konten lengkap (500+ kata) dalam Bahasa Indonesia. Schema markup JSON-LD harus valid. Design warm premium travel aesthetic." \
            --max-turns 50 \
            --verbose
        ;;
    
    2)
        echo ""
        echo -e "${GREEN}🔨 Mode bertahap:${NC}"
        echo ""
        echo "Jalankan perintah berikut satu per satu:"
        echo ""
        echo -e "${BLUE}Step 1: Homepage${NC}"
        echo '  claude -p "Buat index.html dan css/style.css untuk tour & travel website. Baca CLAUDE.md. Mobile-first, warm travel aesthetic, full schema markup." --max-turns 15'
        echo ""
        echo -e "${BLUE}Step 2: Tour pages${NC}"
        echo '  claude -p "Buat tours.html dan tour-detail.html. 6 paket tour Bali/Lombok/Komodo/Raja Ampat/Yogyakarta/Bromo. Harga dalam IDR." --max-turns 15'
        echo ""
        echo -e "${BLUE}Step 3: Info pages${NC}"
        echo '  claude -p "Buat about.html, contact.html, faq.html. Schema markup lengkap. Testimoni realistis." --max-turns 15'
        echo ""
        echo -e "${BLUE}Step 4: JavaScript${NC}"
        echo '  claude -p "Buat js/main.js, js/schema.js, js/analytics.js. Mobile menu, smooth scroll, form validation, dynamic schema." --max-turns 15'
        echo ""
        echo -e "${BLUE}Step 5: SEO files${NC}"
        echo '  claude -p "Buat llms.txt, llms-full.txt, robots.txt, sitemap.xml, .htaccess, 404.html. Hostinger compatible." --max-turns 10'
        echo ""
        echo -e "${BLUE}Step 6: Review${NC}"
        echo '  claude -p "Review semua file. Pastikan HTML valid, schema JSON-LD valid, responsive, accessibility OK." --max-turns 10'
        ;;
    
    3)
        echo ""
        cat PROMPT.md
        ;;
    
    4)
        echo ""
        if command -v xdg-open &> /dev/null; then
            xdg-open PROMPT.md
        elif command -v open &> /dev/null; then
            open PROMPT.md
        else
            cat PROMPT.md
        fi
        ;;
    
    *)
        echo "Pilihan tidak valid"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Selesai!${NC}"
echo ""
echo "📂 Website files ada di: $PROJECT_DIR"
echo ""
echo "📤 Untuk deploy ke Hostinger:"
echo "   1. Login ke hPanel Hostinger"
echo "   2. Buka File Manager"
echo "   3. Upload semua file ke public_html/"
echo "   4. Pastikan .htaccess ter-upload"
echo "   5. Buka website Anda!"
echo ""
echo "📊 Setelah deploy, submit ke:"
echo "   - Google Search Console: https://search.google.com/search-console"
echo "   - Bing Webmaster: https://www.bing.com/webmasters"
echo ""
echo "🌴 Happy travels!"
