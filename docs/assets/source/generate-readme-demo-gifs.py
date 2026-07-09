"""Generate the TraceRail README visual assets.

The README visuals are text-heavy onboarding diagrams, so the source is
deterministic. The design goal is comprehension before polish: one sentence,
one diagram, one takeaway per visual. The primary README asset is a static concept visual; the GIFs are supporting generated examples.
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
    "grid": "#141C29",
    "panel": "#F8FAFC",
    "card": "#FFFFFF",
    "ink": "#111827",
    "muted": "#64748B",
    "border": "#D8E0EA",
    "teal": "#0F766E",
    "teal_soft": "#DDF7F2",
    "blue": "#2F64F6",
    "blue_soft": "#E6EDFF",
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
        candidates.extend([r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"])
    candidates.extend([r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"])
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


FONT = {
    "eyebrow": font(22, True),
    "title": font(52, True),
    "subtitle": font(28),
    "section": font(34, True),
    "label": font(30, True),
    "body": font(24),
    "small": font(20),
    "takeaway": font(26, True),
}


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
        for offset, alpha in ((14, 18), (7, 16), (3, 12)):
            od.rounded_rectangle((x1, y1 + offset, x2, y2 + offset), radius=radius, fill=(15, 23, 42, alpha))
        img.alpha_composite(overlay)
        draw = ImageDraw.Draw(img)
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def centered(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, font_obj, fill: str) -> None:
    x1, y1, x2, y2 = box
    tw, th = text_size(draw, text, font_obj)
    draw.text((x1 + (x2 - x1 - tw) / 2, y1 + (y2 - y1 - th) / 2 - 2), text, font=font_obj, fill=fill)


def draw_arrow(draw: ImageDraw.ImageDraw, start: tuple[int, int], end: tuple[int, int], color: str, width: int = 5) -> None:
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
        draw.line((x, 0, x, H), fill=COLORS["grid"], width=1)
    for y in range(0, H, 48):
        draw.line((0, y, W, y), fill=COLORS["grid"], width=1)


def base_frame(step: str, title: str, subtitle: str) -> Image.Image:
    img = Image.new("RGBA", (W, H), COLORS["bg"])
    draw = ImageDraw.Draw(img)
    draw_grid(draw)
    rounded(img, (72, 58, 260, 106), 18, "#132033", outline="#243146")
    draw.text((98, 72), "TraceRail", font=FONT["eyebrow"], fill="#E6F3EF")
    draw.text((1110, 72), step, font=FONT["eyebrow"], fill="#8BD5C8")
    draw.text((72, 124), title, font=FONT["title"], fill="#F8FAFC")
    draw.text((76, 190), subtitle, font=FONT["subtitle"], fill="#C8D2DE")
    rounded(img, (72, 248, 1368, 744), 30, COLORS["panel"], outline="#CBD5E1", width=2, shadow=True)
    return img


def card(
    img: Image.Image,
    box: tuple[int, int, int, int],
    title: str,
    detail: str,
    accent: str,
    active: bool = True,
) -> None:
    draw = ImageDraw.Draw(img)
    fill = COLORS[f"{accent}_soft"] if active else "#F1F5F9"
    outline = COLORS[accent] if active else COLORS["border"]
    rounded(img, box, 22, fill, outline=outline, width=4 if active else 2)
    draw.text((box[0] + 24, box[1] + 24), title, font=FONT["label"], fill=COLORS["ink"] if active else COLORS["muted"])
    draw.text((box[0] + 24, box[1] + 72), detail, font=FONT["body"], fill=COLORS["muted"])


def takeaway(img: Image.Image, text: str) -> None:
    draw = ImageDraw.Draw(img)
    rounded(img, (260, 674, 1180, 724), 18, COLORS["slate"], outline=None)
    centered(draw, (260, 674, 1180, 724), text, FONT["takeaway"], "#FFFFFF")



def concept_image() -> Image.Image:
    img = Image.new("RGBA", (W, H), COLORS["bg"])
    draw = ImageDraw.Draw(img)
    draw_grid(draw)

    rounded(img, (72, 58, 262, 106), 16, "#132033", outline="#263B56", width=1)
    draw.text((96, 72), "TraceRail", font=FONT["body"], fill="#F8FAFC")
    draw.text((72, 140), "Composable rails for AI software engineering", font=FONT["title"], fill="#F8FAFC")
    draw.text(
        (76, 202),
        "A goal moves through modules. Gates route outcomes. Evidence becomes memory.",
        font=FONT["subtitle"],
        fill="#CBD5E1",
    )

    rounded(img, (72, 252, 1368, 404), 24, "#F8FAFC", outline="#D8E0EA", width=2, shadow=True)
    draw.text((116, 286), "Core expression", font=FONT["section"], fill=COLORS["ink"])
    expression = [
        ("goal", "teal", 132, 334, 292),
        ("module", "blue", 360, 334, 560),
        ("gate", "amber", 628, 334, 798),
        ("evidence", "rose", 866, 334, 1086),
        ("memory", "green", 1154, 334, 1314),
    ]
    for label, accent, x1, y1, x2 in expression:
        rounded(img, (x1, y1, x2, y1 + 50), 16, COLORS[f"{accent}_soft"], outline=COLORS[accent], width=3)
        centered(draw, (x1, y1, x2, y1 + 50), label, FONT["body"], COLORS["ink"])
    for x in [318, 586, 824, 1112]:
        draw.text((x, 340), "|", font=FONT["label"], fill="#334155")

    panel_specs = [
        (72, 446, 446, 704, "Module", "one reusable contract"),
        (533, 446, 907, 704, "Rail", "modules composed in order"),
        (994, 446, 1368, 704, "Scale", "bounded slices"),
    ]
    for x1, y1, x2, y2, title, subtitle in panel_specs:
        rounded(img, (x1, y1, x2, y2), 20, "#F8FAFC", outline="#D8E0EA", width=2, shadow=True)
        draw.text((x1 + 28, y1 + 28), title, font=FONT["section"], fill=COLORS["ink"])
        draw.text((x1 + 28, y1 + 70), subtitle, font=FONT["body"], fill=COLORS["muted"])

    contract_items = ["input", "action", "output", "gate", "outcome"]
    for idx, item in enumerate(contract_items):
        y = 546 + idx * 30
        rounded(img, (116, y, 400, y + 22), 8, "#E6EDFF", outline="#A9BDFE", width=1)
        draw.text((136, y - 1), item, font=FONT["small"], fill=COLORS["slate"])

    rail_items = [
        ("clarify", COLORS["teal"]),
        ("spec", COLORS["blue"]),
        ("arch", COLORS["amber"]),
        ("build", COLORS["rose"]),
        ("verify", COLORS["green"]),
    ]
    x = 570
    for idx, (item, color) in enumerate(rail_items):
        rounded(img, (x, 552, x + 58, 598), 10, "#FFFFFF", outline=color, width=3)
        centered(draw, (x, 552, x + 58, 598), item, FONT["small"], COLORS["ink"])
        if idx < len(rail_items) - 1:
            draw.text((x + 62, 562), "|", font=FONT["body"], fill=COLORS["muted"])
        x += 65
    rounded(img, (578, 628, 862, 664), 12, COLORS["amber_soft"], outline=COLORS["amber"], width=2)
    centered(draw, (578, 628, 862, 664), "+ add security_review", FONT["small"], COLORS["amber"])

    rounded(img, (1038, 574, 1164, 622), 12, COLORS["teal_soft"], outline=COLORS["teal"], width=2)
    centered(draw, (1038, 574, 1164, 622), "goal", FONT["small"], COLORS["teal"])
    rounded(img, (1222, 520, 1346, 562), 12, COLORS["blue_soft"], outline=COLORS["blue"], width=2)
    centered(draw, (1222, 520, 1346, 562), "agent A", FONT["small"], COLORS["blue"])
    rounded(img, (1222, 580, 1346, 622), 12, COLORS["amber_soft"], outline=COLORS["amber"], width=2)
    centered(draw, (1222, 580, 1346, 622), "agent B", FONT["small"], COLORS["amber"])
    rounded(img, (1222, 640, 1346, 682), 12, COLORS["rose_soft"], outline=COLORS["rose"], width=2)
    centered(draw, (1222, 640, 1346, 682), "agent C", FONT["small"], COLORS["rose"])
    draw_arrow(draw, (1164, 598), (1222, 541), COLORS["blue"], width=3)
    draw_arrow(draw, (1164, 598), (1222, 601), COLORS["amber"], width=3)
    draw_arrow(draw, (1164, 598), (1222, 661), COLORS["rose"], width=3)

    rounded(img, (260, 736, 1180, 782), 18, "#334155", outline=None)
    centered(draw, (260, 736, 1180, 782), "Simple surface. Strong gates. Traceable parallel work.", FONT["takeaway"], "#F8FAFC")
    return img.convert("RGB")

def workflow_frame(stage: int) -> Image.Image:
    img = base_frame(
        "01 / START",
        "Turn a goal into evidence",
        "TraceRail gives the agent a visible path from request to memory.",
    )
    draw = ImageDraw.Draw(img)
    draw.text((132, 300), "A normal request becomes a traceable work package.", font=FONT["section"], fill=COLORS["ink"])

    items = [
        ("Goal", "what to do", "teal"),
        ("Spec", "success criteria", "blue"),
        ("Tasks", "small steps", "amber"),
        ("Evidence", "tests + review", "rose"),
        ("Memory", "what we learned", "green"),
    ]
    x = 132
    y = 398
    w = 210
    gap = 28
    visible = min(stage, len(items))
    for idx, (title, detail, accent) in enumerate(items):
        box = (x + idx * (w + gap), y, x + idx * (w + gap) + w, y + 128)
        card(img, box, title, detail, accent, active=idx < visible)
        if idx < len(items) - 1:
            color = COLORS["slate"] if idx + 1 < visible else "#C4CEDA"
            draw_arrow(draw, (box[2] + 8, y + 64), (box[2] + gap - 8, y + 64), color, width=4)

    takeaway(img, "Takeaway: every change leaves a trail")
    return img.convert("RGB")


def gates_frame(stage: int) -> Image.Image:
    img = base_frame(
        "02 / CONTROL",
        "Gates route the next move",
        "When work gets stuck, TraceRail chooses a route instead of random retries.",
    )
    draw = ImageDraw.Draw(img)

    rounded(img, (160, 326, 530, 486), 28, COLORS["card"], outline=COLORS["border"], width=2)
    draw.text((200, 364), "Checkpoint", font=FONT["section"], fill=COLORS["ink"])
    draw.text((200, 414), "verify against evidence", font=FONT["body"], fill=COLORS["muted"])

    routes = [
        ("pass", "continue", "green", (720, 292, 1030, 366)),
        ("fix", "clear defect", "amber", (720, 386, 1030, 460)),
        ("diagnose", "unknown cause", "rose", (720, 480, 1030, 554)),
        ("clarify", "unclear intent", "blue", (720, 574, 1030, 648)),
    ]

    visible = min(stage, len(routes))
    for idx, (label, detail, accent, box) in enumerate(routes):
        active = idx < visible
        fill = COLORS[f"{accent}_soft"] if active else "#F1F5F9"
        outline = COLORS[accent] if active else COLORS["border"]
        rounded(img, box, 20, fill, outline=outline, width=4 if active else 2)
        draw.text((box[0] + 28, box[1] + 18), label, font=FONT["label"], fill=COLORS["ink"] if active else COLORS["muted"])
        draw.text((box[0] + 160, box[1] + 24), detail, font=FONT["body"], fill=COLORS["muted"])
        color = COLORS[accent] if active else "#C4CEDA"
        draw_arrow(draw, (530, 406), (box[0] - 18, (box[1] + box[3]) // 2), color, width=4)

    rounded(img, (1080, 382, 1258, 486), 22, COLORS["slate_soft"], outline=COLORS["border"], width=2)
    draw.text((1118, 396), "typed", font=FONT["label"], fill=COLORS["slate"])
    draw.text((1100, 436), "outcome", font=FONT["label"], fill=COLORS["slate"])
    takeaway(img, "Takeaway: failures become decisions, not thrash")
    return img.convert("RGB")


def scale_frame(stage: int) -> Image.Image:
    img = base_frame(
        "03 / SCALE",
        "Scale with contracts",
        "More agents are safe only when each work slice has boundaries and evidence.",
    )
    draw = ImageDraw.Draw(img)

    rounded(img, (130, 386, 402, 488), 24, COLORS["teal_soft"], outline=COLORS["teal"], width=4)
    centered(draw, (130, 386, 402, 488), "shared goal", FONT["label"], COLORS["teal"])

    units = [
        ("Work unit A", "scope + files", "blue", (520, 282, 840, 394)),
        ("Work unit B", "owner + limits", "amber", (520, 414, 840, 526)),
        ("Work unit C", "evidence required", "rose", (520, 546, 840, 658)),
    ]
    visible = min(stage, len(units))
    for idx, (title, detail, accent, box) in enumerate(units):
        active = idx < visible
        start = (402, 437)
        end = (box[0] - 18, (box[1] + box[3]) // 2)
        draw_arrow(draw, start, end, COLORS[accent] if active else "#C4CEDA", width=4)
        card(img, box, title, detail, accent, active=active)

    if stage >= 4:
        rounded(img, (1010, 386, 1292, 488), 24, COLORS["green_soft"], outline=COLORS["green"], width=4)
        centered(draw, (1010, 386, 1292, 488), "integration owner", FONT["label"], COLORS["green"])
        for _, _, accent, box in units:
            start = (box[2] + 18, (box[1] + box[3]) // 2)
            end = (1010, 437)
            draw_arrow(draw, start, end, COLORS[accent], width=3)

    takeaway(img, "Takeaway: many agents need bounded contracts")
    return img.convert("RGB")


def save_gif(path: Path, frames: list[Image.Image], duration: int = 900) -> None:
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
    concept_image().save(ASSET_DIR / "tracerail-concept.png")
    save_gif(
        ASSET_DIR / "tracerail-module-contract.gif",
        [workflow_frame(i) for i in [1, 2, 3, 4, 5, 5]],
    )
    save_gif(
        ASSET_DIR / "tracerail-rail-flow.gif",
        [gates_frame(i) for i in [1, 2, 3, 4, 4]],
    )
    save_gif(
        ASSET_DIR / "tracerail-platform-composition.gif",
        [scale_frame(i) for i in [1, 2, 3, 4, 4]],
    )
    print("Generated comprehension-first README assets in docs/assets.")


if __name__ == "__main__":
    main()
