import logging
from pathlib import Path

import manimpango

logging.basicConfig(level=logging.INFO)

SRC_ROOT = Path(__file__).resolve().parents[2]
FONTS_DIR = SRC_ROOT / "visual_data_lessons" / "common" / "assets" / "fonts" / "FiraCode"

IMAGES_DIR = SRC_ROOT / "visual_data_lessons" / "common" / "assets" / "images"
LOGO_PATH = IMAGES_DIR / "logo.png"

DEFAULT_FONT_FILE = FONTS_DIR / "FiraCodeNerdFontMono-Regular.ttf"
DEFAULT_FONT_NAME = "FiraCode Nerd Font Mono"

if DEFAULT_FONT_FILE.exists():
    manimpango.register_font(str(DEFAULT_FONT_FILE))
    logging.info(f"✅ Registered font: {DEFAULT_FONT_FILE.name}")
else:
    logging.warning(f"⚠️ Font file not found: {DEFAULT_FONT_FILE}")


DEFAULT_FONT = DEFAULT_FONT_NAME
