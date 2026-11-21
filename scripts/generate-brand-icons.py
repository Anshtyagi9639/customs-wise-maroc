"""Generates the provisional Customs Wise Maroc brand mark in every format.

Usage (from the project root, needs Pillow):  python scripts/generate-brand-icons.py .
Outputs: app/favicon.ico, app/icon.svg, app/apple-icon.png, public/icons/*, public/logos/*.
If the geometry changes, update components/ui/logo.tsx and app/opengraph-image.tsx too.

Geometry (64x64 grid): rounded square in ship #0a3542, a "C" (open arc) and a
"W" (stroked polyline) in cargo #f9ed32. The same geometry is used for the SVG
and for the rasterised PNG/ICO files, so they all match.
"""
import os, sys, math
from PIL import Image, ImageDraw

root = sys.argv[1]
SHIP, CARGO, WHITE = "#0a3542", "#f9ed32", "#ffffff"

# ---- geometry on a 64 grid ----
C_CX, C_CY, C_R, STROKE = 21, 32, 11.5, 6.5
W_PTS = [(35.5, 21), (40.5, 43), (46, 30), (51.5, 43), (56.5, 21)]
RADIUS = 13  # corner radius of the rounded square

def arc_point(deg):
    a = math.radians(deg)
    return C_CX + C_R * math.cos(a), C_CY + C_R * math.sin(a)

(sx, sy), (ex, ey) = arc_point(-45), arc_point(45)
c_path = f"M{sx:.2f} {sy:.2f} A{C_R} {C_R} 0 1 0 {ex:.2f} {ey:.2f}"
w_path = "M" + " L".join(f"{x} {y}" for x, y in W_PTS)

def svg(rounded=True, size=64, title=True):
    rx = RADIUS if rounded else 0
    t = "<title>Customs Wise Maroc</title>" if title else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="{size}" height="{size}" role="img" aria-label="Customs Wise Maroc">{t}'
        f'<rect width="64" height="64" rx="{rx}" fill="{SHIP}"/>'
        f'<path d="{c_path}" fill="none" stroke="{CARGO}" stroke-width="{STROKE}" stroke-linecap="round"/>'
        f'<path d="{w_path}" fill="none" stroke="{CARGO}" stroke-width="{STROKE}" stroke-linecap="round" stroke-linejoin="round"/>'
        "</svg>\n"
    )

def raster(px, rounded=True, glyph_scale=1.0):
    """Draw at 8x then downsample for smooth edges. glyph_scale < 1 adds a safe zone (maskable)."""
    S = px * 8
    k = S / 64
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if rounded:
        d.rounded_rectangle([0, 0, S - 1, S - 1], radius=int(RADIUS * k), fill=SHIP)
    else:
        d.rectangle([0, 0, S, S], fill=SHIP)
    off = 32 * (1 - glyph_scale)
    f = lambda v: (off + v * glyph_scale) * k
    w = max(1, int(STROKE * glyph_scale * k))
    r = C_R * glyph_scale * k
    cx, cy = f(C_CX), f(C_CY)
    d.arc([cx - r - w / 2, cy - r - w / 2, cx + r + w / 2, cy + r + w / 2], 45, 315, fill=CARGO, width=w)
    for ang in (45, 315):  # round caps on the arc ends
        px_, py_ = cx + r * math.cos(math.radians(ang)), cy + r * math.sin(math.radians(ang))
        d.ellipse([px_ - w / 2, py_ - w / 2, px_ + w / 2, py_ + w / 2], fill=CARGO)
    pts = [(f(x), f(y)) for x, y in W_PTS]
    d.line(pts, fill=CARGO, width=w, joint="curve")
    for x, y in (pts[0], pts[-1]):
        d.ellipse([x - w / 2, y - w / 2, x + w / 2, y + w / 2], fill=CARGO)
    return img.resize((px, px), Image.LANCZOS)

def W(path, data, mode="w"):
    full = os.path.join(root, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, mode, encoding="utf8", newline="\n") as fh:
        fh.write(data)

# SVGs
W("app/icon.svg", svg(size=64))
W("public/logos/customs-wise-maroc-mark.svg", svg(size=512))
W("public/logos/customs-wise-maroc.svg",
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 64" width="330" height="64" role="img" aria-label="Customs Wise Maroc">'
  "<title>Customs Wise Maroc</title>"
  + svg(title=False).replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Customs Wise Maroc">', '<svg x="0" y="0" width="64" height="64" viewBox="0 0 64 64">').strip()
  + f'<text x="78" y="43" font-family="Oswald, \'Arial Narrow\', Arial, sans-serif" font-size="30" font-weight="600" letter-spacing="1" fill="{SHIP}">CUSTOMS<tspan fill="#176a90">WISE</tspan></text>'
  + f'<rect x="262" y="20" width="62" height="24" rx="3" fill="{SHIP}"/>'
  + f'<text x="293" y="37.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="{WHITE}">MAROC</text>'
  "</svg>\n")

# Rasters
os.makedirs(os.path.join(root, "public/icons"), exist_ok=True)
raster(512).save(os.path.join(root, "public/icons/icon-512.png"))
raster(192).save(os.path.join(root, "public/icons/icon-192.png"))
raster(512, rounded=False, glyph_scale=0.78).save(os.path.join(root, "public/icons/icon-maskable-512.png"))
raster(180, rounded=False).save(os.path.join(root, "app/apple-icon.png"))  # iOS rounds the corners itself
ico = raster(256)
ico.save(os.path.join(root, "app/favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("done")
