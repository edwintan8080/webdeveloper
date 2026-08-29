import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

def wa_url(dest, durasi):
    return (
        "https://wa.me/8615811252101?text="
        "Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0A"
        "Saya%20tertarik%20dengan%20paket%20tour%20China.%0A%0A"
        "%E2%94%80%E2%94%80%E2%94%80%0A"
        "%F0%9F%91%A4%20Nama%3A%20%0A"
        "%F0%9F%93%B1%20WhatsApp%3A%20%0A"
        "%F0%9F%93%A7%20Email%3A%20%0A"
        f"%F0%9F%8C%8F%20Destinasi%3A%20{dest}%0A"
        "%F0%9F%91%A5%20Jumlah%20Orang%3A%20%0A"
        "%F0%9F%93%85%20Tanggal%3A%20%0A"
        f"%E2%8F%B1%EF%B8%8F%20Durasi%3A%20{durasi}%0A"
        "%F0%9F%93%9D%20Pesan%3A%20%0A"
        "%E2%94%80%E2%94%80%E2%94%80%0A%0A"
        "Terima%20kasih%20%F0%9F%99%8F"
    )

# Package replacements (old text -> new URL)
packages = [
    ("Shanghai Modern", "4H3M", "Shanghai"),
    ("Xi'an Ancient", "4H3M", "Xi'an"),
    ("Chengdu Panda", "4H3M", "Chengdu"),
    ("Guilin Nature", "5H4M", "Guilin"),
    ("Zhangjiajie Adventure", "5H4M", "Zhangjiajie"),
    ("China Golden Route", "8H7M", "Beijing-Xi'an-Shanghai"),
]

for name, durasi, dest in packages:
    old_text = f'href="https://wa.me/8615811252101?text=Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0ASaya%20tertarik%20dengan%20paket%20*{name}*'
    new_text = f'href="{wa_url(dest, durasi)}"'
    if old_text in content:
        # Find the full old href and replace it
        pattern = re.escape(old_text) + r'[^"]*"'
        content = re.sub(pattern, new_text, content)
        print(f"Updated: {name}")

# Custom Trip
custom_url = (
    "https://wa.me/8615811252101?text="
    "Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0A"
    "Saya%20ingin%20membuat%20custom%20trip%20ke%20China.%0A%0A"
    "%E2%94%80%E2%94%80%E2%94%80%0A"
    "%F0%9F%91%A4%20Nama%3A%20%0A"
    "%F0%9F%93%B1%20WhatsApp%3A%20%0A"
    "%F0%9F%93%A7%20Email%3A%20%0A"
    "%F0%9F%8C%8F%20Destinasi%3A%20%0A"
    "%F0%9F%91%A5%20Jumlah%20Orang%3A%20%0A"
    "%F0%9F%93%85%20Tanggal%3A%20%0A"
    "%E2%8F%B1%EF%B8%8F%20Durasi%3A%20%0A"
    "%F0%9F%93%9D%20Pesan%3A%20%0A"
    "%E2%94%80%E2%94%80%E2%94%80%0A%0A"
    "Bisa%20dibantu%20buatkan%20itinerary%3F%20%F0%9F%99%8F"
)
old_custom = 'href="https://wa.me/8615811252101?text=Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0ASaya%20ingin%20membuat%20*custom%20trip*'
if old_custom in content:
    pattern = re.escape(old_custom) + r'[^"]*"'
    content = re.sub(pattern, f'href="{custom_url}"', content)
    print("Updated: Custom Trip")

# Float button (general)
float_url = (
    "https://wa.me/8615811252101?text="
    "Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0A"
    "Saya%20tertarik%20dengan%20paket%20tour%20China.%0A%0A"
    "%E2%94%80%E2%94%80%E2%94%80%0A"
    "%F0%9F%91%A4%20Nama%3A%20%0A"
    "%F0%9F%93%B1%20WhatsApp%3A%20%0A"
    "%F0%9F%93%A7%20Email%3A%20%0A"
    "%F0%9F%8C%8F%20Destinasi%3A%20%0A"
    "%F0%9F%91%A5%20Jumlah%20Orang%3A%20%0A"
    "%F0%9F%93%85%20Tanggal%3A%20%0A"
    "%E2%8F%B1%EF%B8%8F%20Durasi%3A%20%0A"
    "%F0%9F%93%9D%20Pesan%3A%20%0A"
    "%E2%94%80%E2%94%80%E2%94%80%0A%0A"
    "Terima%20kasih%20%F0%9F%99%8F"
)
old_float = 'href="https://wa.me/8615811252101?text=Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0ASaya%20tertarik%20dengan%20paket%20tour%20China.'
if old_float in content:
    pattern = re.escape(old_float) + r'[^"]*"'
    content = re.sub(pattern, f'href="{float_url}"', content)
    print("Updated: Float button")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
