"""Generate the TraceRail README demo GIFs.

This script is intentionally deterministic and dependency-light. It uses Pillow
to render text-heavy diagrams where exact labels matter more than generative
illustration. Run it from the repository root.
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
ASSET_DIR = ROOT / "assets"
W, H = 1440, 810

COLORS = {
    "bg": "#0B1018",
    "bg_grid": "#151C29",
    "panel": "#F8FAFC",
    "panel_2": "#FFFFFF",
    "ink": "#111827",
    "muted": "#64748B",
    "border": "#D8E0EA",
    "soft_border": "#E7ECF3",
    "teal": "#0F766E",
    "teal_soft": "#DDF7F2",
    "blue": "#2F64F6",
    "blue_soft": "#E5EDFF",
    "amber": "#B45309",
    "amber_soft": "#FEF0D6",
    "rose": "#BE123C",
    "rose_soft": "#FFE4EC",
    "green": "#16824D",
    "green_soft": "#E1F7EA",
    "slate": "#334155",
    "slate_soft": "#EEF2F6",
}


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = []
    if bold:
        candidates.extend(
            [
                r"C:\Windows\Fonts\segoeuib.ttf",
                r"C:\Windows\Fonts\arialbd.ttf",
            ]
        )
    candidates.extend(
        [
            r"C:\Windows\Fonts\segoeui.ttf",
            r"C:\Windows\Fonts\arial.ttf",
        ]
    )
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


FONT = {
    "eyebrow": font(22, True),
    "title": font(54, True),
    "subtitle": font(28),
    "section": font(34, True),
    "label": font(30, True),
    "body": font(24),
    "small": font(20),
    "chip": font(22, True),
}


def rgb(name: str) -> str:
    return COLORS[name]


def text_size(draw: ImageDraw.ImageDraw, text: str, font_obj: ImageFont.ImageFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=font_obj)
    return box[2] - box[0], box[3] - box[1]


def rounded(
    img: Image.Image,
    box: tuple[int, int, int, int],
    radius: int,
    fill: str,
    outline: str | None = None,
    width: int = 1,
    shadow: bool = False,
) -> None:
    draw = ImageDraw.Draw(img)
    if shadow:
        overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        x1, y1, x2, y2 = box
        for offset, alpha in ((16, 18), (8, 18), (3, 14)):
            od.rounded_rectangle(
                (x1, y1 + offset, x2, y2 + offset),
                radius=radius,
                fill=(15, 23, 42, alpha),
            )
        img.alpha_composite(overlay)
        draw = ImageDraw.Draw(img)
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def centered(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    text: str,
    font_obj: ImageFont.ImageFont,
    fill: str,
) -> None:
    x1, y1, x2, y2 = box
    tw, th = text_size(draw, text, font_obj)
    draw.text((x1 + (x2 - x1 - tw) / 2, y1 + (y2 - y1 - th) / 2 - 2), text, font=font_obj, fill=fill)


def draw_arrow(
    draw: ImageDraw.ImageDraw,
    start: tuple[int, int],
    end: tuple[int, int],
    color: str,
    width: int = 5,
) -> None:
    x1, y1 = start
    x2, y2 = end
    draw.line((x1, y1, x2, y2), fill=color, width=width)
    angle = math.atan2(y2 - y1, x2 - x1)
    size = 15
    points = [
        (x2, y2),
        (x2 - size * math.cos(angle - math.pi / 6), y2 - size * math.sin(angle - math.pi / 6)),
        (x2 - size * math.cos(angle + math.pi / 6), y2 - size * math.sin(angle + math.pi / 6)),
    ]
    draw.polygon(points, fill=color)


def draw_grid(draw: ImageDraw.ImageDraw) -> None:
    for x in range(0, W, 48):
        draw.line((x, 0, x, H), fill=rgb("bg_grid"), width=1)
    for y in range(0, H, 48):
        draw.line((0, y, W, y), fill=rgb("bg_grid"), width=1)


def base_frame(step: str, title: str, subtitle: str) -> Image.Image:
    img = Image.new("RGBA", (W, H), rgb("bg"))
    draw = ImageDraw.Draw(img)
    draw_grid(draw)

    rounded(img, (72, 58, 260, 106), 18, "#132033", outline="#243146", width=1)
    draw.text((98, 72), "TraceRail", font=FONT["eyebrow"], fill="#E6F3EF")
    draw.text((1110, 72), step, font=FONT["eyebrow"], fill="#8BD5C8")
    draw.text((72, 124), title, font=FONT["title"], fill="#F8FAFC")
    draw.text((76, 190), subtitle, font=FONT["subtitle"], fill="#C8D2DE")

    rounded(img, (72, 248, 1368, 744), 30, rgb("panel"), outline="#CBD5E1", width=2, shadow=True)
    return img


def chip(
    img: Image.Image,
    box: tuple[int, int, int, int],
    label: str,
    fill: str,
    fg: str = "#FFFFFF",
    outline: str | None = None,
) -> None:
    rounded(img, box, 18, fill, outline=outline, width=2 if outline else 1)
    centered(ImageDraw.Draw(img), box, label, FONT["chip"], fg)


def module_contract_frame(active_count: int) -> Image.Image:
    img = base_frame(
        "01 / MODULE",
        "Define one module contract",
        "Every workflow stage keeps the same shape: input, action, output, gate, outcome.",
    )
    draw = ImageDraw.Draw(img)

    rounded(img, (140, 308, 1300, 650), 28, rgb("panel_2"), outline=rgb("border"), width=2)
    draw.text((188, 344), "Module: architecture_review", font=FONT["section"], fill=rgb("ink"))
    draw.text((188, 390), "Swap the capability. Keep the contract.", font=FONT["body"], fill=rgb("muted"))

    slots = [
        ("Input", "spec + context", "teal", "teal_soft"),
        ("Action", "review design", "blue", "blue_soft"),
        ("Output", "decision note", "amber", "amber_soft"),
        ("Gate", "check criteria", "rose", "rose_soft"),
        ("Outcome", "typed route", "green", "green_soft"),
    ]
    x = 188
    y = 472
    slot_w = 178
    gap = 43

    for idx, (label, detail, accent, soft) in enumerate(slots):
        box = (x + idx * (slot_w + gap), y, x + idx * (slot_w + gap) + slot_w, y + 116)
        revealed = idx < active_count
        current = idx == active_count - 1
        fill = rgb(soft) if revealed else "#F3F6FA"
        outline = rgb(accent) if revealed else rgb("border")
        rounded(img, box, 20, fill, outline=outline, width=5 if current else 2)
        draw.text((box[0] + 22, box[1] + 24), label, font=FONT["label"], fill=rgb("ink") if revealed else rgb("muted"))
        draw.text((box[0] + 22, box[1] + 70), detail, font=FONT["small"], fill=rgb("muted"))
        if idx < len(slots) - 1:
            start = (box[2] + 12, box[1] + 58)
            end = (box[2] + gap - 14, box[1] + 58)
            draw_arrow(draw, start, end, rgb("slate") if revealed and idx + 1 < active_count else "#C9D3DF", width=4)

    chip(img, (508, 674, 932, 720), "same contract -> swappable modules", rgb("slate"))
    return img.convert("RGB")


def rail_frame(stage: int) -> Image.Image:
    img = base_frame(
        "02 / RAIL",
        "Compose modules into a rail",
        "A rail is a readable path. Gates decide when to pass, fix, diagnose, split, or learn.",
    )
    draw = ImageDraw.Draw(img)

    show_security = stage >= 3
    modules = ["goal", "clarify", "spec"]
    if show_security:
        modules.append("security")
    modules.extend(["arch", "plan", "build", "verify", "memory"])

    total_w = 1188
    start_x = 126
    gap = 18
    card_w = int((total_w - gap * (len(modules) - 1)) / len(modules))
    y = 386

    draw.text((126, 294), "Feature rail", font=FONT["section"], fill=rgb("ink"))
    draw.text((126, 338), "Modules run left to right; any gate can route work safely.", font=FONT["body"], fill=rgb("muted"))

    if stage == 2:
        insert_x = start_x + 3 * (card_w + gap) - gap // 2
        rounded(img, (insert_x - 116, 270, insert_x + 116, 324), 18, rgb("rose_soft"), outline=rgb("rose"), width=3)
        centered(draw, (insert_x - 116, 270, insert_x + 116, 324), "insert gate", FONT["chip"], rgb("rose"))
        draw.line((insert_x, 324, insert_x, y - 18), fill=rgb("rose"), width=4)

    for idx, name in enumerate(modules):
        x = start_x + idx * (card_w + gap)
        active = (stage >= 4 and name in {"security", "verify"}) or (stage == 1 and name == "arch")
        accent = rgb("rose") if name == "security" else rgb("teal") if name in {"clarify", "spec", "arch"} else rgb("blue")
        fill = "#FFFFFF"
        outline = accent if active or name == "security" else rgb("border")
        rounded(img, (x, y, x + card_w, y + 86), 20, fill, outline=outline, width=5 if active else 2)
        label = "sec" if name == "security" and card_w < 112 else name
        centered(draw, (x, y, x + card_w, y + 86), label, FONT["label"], rgb("ink"))
        if idx < len(modules) - 1:
            draw_arrow(draw, (x + card_w + 6, y + 43), (x + card_w + gap - 7, y + 43), "#AAB7C6", width=3)

    if stage >= 4:
        rounded(img, (164, 524, 1276, 650), 26, "#FFFFFF", outline=rgb("border"), width=2)
        draw.text((206, 568), "Typed outcomes", font=FONT["section"], fill=rgb("ink"))
        outcomes = [("pass", "teal"), ("fix", "amber"), ("diagnose", "rose"), ("split", "blue"), ("learn", "green")]
        ox = 524
        for label, color in outcomes:
            chip(img, (ox, 556, ox + 126, 610), label, rgb(color))
            ox += 142
    else:
        rounded(img, (306, 538, 1134, 620), 24, rgb("slate_soft"), outline=rgb("border"), width=2)
        centered(draw, (306, 538, 1134, 620), "drop in a review gate without rewriting the workflow", FONT["label"], rgb("slate"))

    if stage >= 5:
        rounded(img, (250, 668, 1190, 716), 18, rgb("teal_soft"), outline="#B9EADF", width=2)
        centered(draw, (250, 668, 1190, 716), "simple rail, stronger gates, clear evidence", FONT["body"], rgb("teal"))

    return img.convert("RGB")


def platform_frame(stage: int) -> Image.Image:
    img = base_frame(
        "03 / PLATFORM",
        "Expand rails into a platform",
        "TraceRail stays file-based at the core, then grows through optional packs and adapters.",
    )
    draw = ImageDraw.Draw(img)

    columns = [
        ("Modules", ["clarify", "spec", "arch review", "verify"], "teal"),
        ("Rails", ["feature rail", "diagnosis rail", "release rail"], "blue"),
        ("Packs", ["orchestration", "project rules", "community add-ons"], "amber"),
        ("Agents", ["IDE agent", "subagents", "memory"], "rose"),
    ]
    col_w = 282
    gap = 34
    start_x = 126
    y = 306

    for idx, (title, items, color, *_) in enumerate(columns):
        x = start_x + idx * (col_w + gap)
        visible = idx <= stage
        fill = "#FFFFFF" if visible else "#F3F6FA"
        outline = rgb(color) if visible and idx == stage else rgb("border")
        rounded(img, (x, y, x + col_w, y + 326), 26, fill, outline=outline, width=4 if visible and idx == stage else 2)
        draw.text((x + 34, y + 36), title, font=FONT["section"], fill=rgb("ink") if visible else rgb("muted"))
        item_y = y + 104
        for item in items:
            item_fill = rgb(f"{color}_soft") if visible else "#EEF2F6"
            item_fg = rgb(color) if visible else rgb("muted")
            rounded(img, (x + 34, item_y, x + col_w - 34, item_y + 46), 16, item_fill, outline=None)
            centered(draw, (x + 34, item_y, x + col_w - 34, item_y + 46), item, FONT["chip"], item_fg)
            item_y += 58
        if idx < len(columns) - 1:
            arrow_color = rgb("blue") if visible and idx < stage else "#AAB7C6"
            draw_arrow(draw, (x + col_w + 8, y + 154), (x + col_w + gap - 10, y + 154), arrow_color, width=5)

    if stage >= 3:
        rounded(img, (264, 676, 1176, 724), 18, rgb("teal_soft"), outline="#B9EADF", width=2)
        centered(draw, (264, 676, 1176, 724), "goal -> rail -> evidence -> memory", FONT["label"], rgb("teal"))
    else:
        rounded(img, (318, 676, 1122, 724), 18, rgb("slate_soft"), outline=rgb("border"), width=2)
        centered(draw, (318, 676, 1122, 724), "add layers only when the workflow needs them", FONT["label"], rgb("slate"))

    return img.convert("RGB")


def save_gif(path: Path, frames: list[Image.Image], duration: int = 780) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        path,
        save_all=True,
        append_images=frames[1:],
        duration=duration,
        loop=0,
        optimize=True,
        disposal=2,
    )


def main() -> None:
    save_gif(
        ASSET_DIR / "tracerail-module-contract.gif",
        [module_contract_frame(i) for i in [1, 2, 3, 4, 5, 5]],
    )
    save_gif(
        ASSET_DIR / "tracerail-rail-flow.gif",
        [rail_frame(i) for i in [1, 2, 3, 4, 5, 5]],
    )
    save_gif(
        ASSET_DIR / "tracerail-platform-composition.gif",
        [platform_frame(i) for i in [0, 1, 2, 3, 3]],
    )
    print("Generated README demo GIFs in docs/assets.")


if __name__ == "__main__":
    main()
