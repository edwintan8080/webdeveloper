with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# New WhatsApp template - simple emojis that work in WhatsApp
def wa_url(dest, durasi):
    return (
        "https://wa.me/8615811252101?text="
        "Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0A"
        "Saya%20tertarik%20dengan%20paket%20tour%20China.%0A%0A"
        "Nama%3A%20%0A"
        "WhatsApp%3A%20%0A"
        "Email%3A%20%0A"
        f"Destinasi%3A%20{dest}%0A"
        "Jumlah%20Orang%3A%20%0A"
        "Tanggal%3A%20%0A"
        f"Durasi%3A%20{durasi}%0A"
        "Pesan%3A%20%0A%0A"
        "Terima%20kasih%20%F0%9F%99%8F"
    )

packages = [
    ("Beijing", "5H4M"),
    ("Shanghai", "4H3M"),
    ("Xi'an", "4H3M"),
    ("Chengdu", "4H3M"),
    ("Guilin", "5H4M"),
    ("Zhangjiajie", "5H4M"),
    ("Beijing-Xi'an-Shanghai", "8H7M"),
]

# Find and replace each package WhatsApp link
for dest, durasi in packages:
    # Find the old URL pattern
    old_pattern = f'href="https://wa.me/8615811252101?text=Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0ASaya%20tertarik%20dengan%20paket%20tour%20China.%0A%0A%E2%94%80%E2%94%80%E2%94%80%0A%F0%9F%91%A4%20Nama%3A%20%0A%F0%9F%93%B1%20WhatsApp%3A%20%0A%F0%9F%93%A7%20Email%3A%20%0A%F0%9F%8C%8F%20Destinasi%3A%20{dest}%0A%F0%9F%91%A5%20Jumlah%20Orang%3A%20%0A%F0%9F%93%85%20Tanggal%3A%20%0A%E2%8F%B1%EF%B8%8F%20Durasi%3A%20{durasi}%0A%F0%9F%93%9D%20Pesan%3A%20%0A%E2%94%80%E2%94%80%E2%94%80%0A%0ATerima%20kasih%20%F0%9F%99%8F" class="package-card__cta"'
    new_url = f'href="{wa_url(dest, durasi)}" class="package-card__cta"'
    
    if old_pattern in content:
        content = content.replace(old_pattern, new_url)
        print(f"Updated: {dest}")
    else:
        print(f"Not found: {dest}")

# Update Custom Trip
custom_old = 'href="https://wa.me/8615811252101?text=Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0ASaya%20ingin%20membuat%20custom%20trip%20ke%20China.%0A%0A%E2%94%80%E2%94%80%E2%94%80%0A%F0%9F%91%A4%20Nama%3A%20%0A%F0%9F%93%B1%20WhatsApp%3A%20%0A%F0%9F%93%A7%20Email%3A%20%0A%F0%9F%8C%8F%20Destinasi%3A%20%0A%F0%9F%91%A5%20Jumlah%20Orang%3A%20%0A%F0%9F%93%85%20Tanggal%3A%20%0A%E2%8F%B1%EF%B8%8F%20Durasi%3A%20%0A%F0%9F%93%9D%20Pesan%3A%20%0A%E2%94%80%E2%94%80%E2%94%80%0A%0ABisa%20dibantu%20buatkan%20itinerary%3F%20%F0%9F%99%8F" class="btn btn--primary"'
custom_new_url = (
    "https://wa.me/8615811252101?text="
    "Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0A"
    "Saya%20ingin%20membuat%20custom%20trip%20ke%20China.%0A%0A"
    "Nama%3A%20%0A"
    "WhatsApp%3A%20%0A"
    "Email%3A%20%0A"
    "Destinasi%3A%20%0A"
    "Jumlah%20Orang%3A%20%0A"
    "Tanggal%3A%20%0A"
    "Durasi%3A%20%0A"
    "Pesan%3A%20%0A%0A"
    "Bisa%20dibantu%20buatkan%20itinerary%3F%20%F0%9F%99%8F"
)
custom_new = f'href="{custom_new_url}" class="btn btn--primary"'

if custom_old in content:
    content = content.replace(custom_old, custom_new)
    print("Updated: Custom Trip")

# Update Float button
float_old = 'href="https://wa.me/8615811252101?text=Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0ASaya%20tertarik%20dengan%20paket%20tour%20China.%0A%0A%E2%94%80%E2%94%80%E2%94%80%0A%F0%9F%91%A4%20Nama%3A%20%0A%F0%9F%93%B1%20WhatsApp%3A%20%0A%F0%9F%93%A7%20Email%3A%20%0A%F0%9F%8C%8F%20Destinasi%3A%20%0A%F0%9F%91%A5%20Jumlah%20Orang%3A%20%0A%F0%9F%93%85%20Tanggal%3A%20%0A%E2%8F%B1%EF%B8%8F%20Durasi%3A%20%0A%F0%9F%93%9D%20Pesan%3A%20%0A%E2%94%80%E2%94%80%E2%94%80%0A%0ATerima%20kasih%20%F0%9F%99%8F" class="whatsapp-float"'
float_new_url = (
    "https://wa.me/8615811252101?text="
    "Halo%20Tourduachina.id%20%F0%9F%91%8B%0A%0A"
    "Saya%20tertarik%20dengan%20paket%20tour%20China.%0A%0A"
    "Nama%3A%20%0A"
    "WhatsApp%3A%20%0A"
    "Email%3A%20%0A"
    "Destinasi%3A%20%0A"
    "Jumlah%20Orang%3A%20%0A"
    "Tanggal%3A%20%0A"
    "Durasi%3A%20%0A"
    "Pesan%3A%20%0A%0A"
    "Terima%20kasih%20%F0%9F%99%8F"
)
float_new = f'href="{float_new_url}" class="whatsapp-float"'

if float_old in content:
    content = content.replace(float_old, float_new)
    print("Updated: Float button")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
