"""Generate the primary SWECircuit README workflow animation."""

from __future__ import annotations

import argparse
import math
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


WIDTH = 920
HEIGHT = 560
FRAME_MS = 90

COLORS = {
    "background": "#F7F9FC",
    "surface": "#FFFFFF",
    "ink": "#10233F",
    "muted": "#62718A",
    "line": "#CBD5E1",
    "rail": "#8B9AB0",
    "blue": "#2563EB",
    "blue_soft": "#EAF1FF",
    "teal": "#0F8C8C",
    "teal_soft": "#E7F7F5",
    "amber": "#C97A08",
    "amber_soft": "#FFF4D8",
    "violet": "#6D4BD1",
    "violet_soft": "#F1ECFF",
    "green": "#16845B",
    "green_soft": "#E7F6EF",
    "rose": "#C24167",
    "rose_soft": "#FDECF2",
    "navy_soft": "#E8EEF6",
}

MODULES = (
    (110, "SPEC", "", "blue", "blue_soft"),
    (216, "PLAN", "", "teal", "teal_soft"),
    (322, "COMPILE", "", "amber", "amber_soft"),
    (586, "VERIFY", "", "violet", "violet_soft"),
    (692, "MERGE", "", "green", "green_soft"),
    (798, "MEMORY", "", "rose", "rose_soft"),
)

AGENTS = (
    (420, "UI", "blue", "blue_soft"),
    (515, "API", "teal", "teal_soft"),
    (610, "TEST", "violet", "violet_soft"),
)


def parse_args() -> argparse.Namespace:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=root / "swecircuit-flow.gif",
        help="GIF output path.",
    )
    parser.add_argument(
        "--qa-dir",
        type=Path,
        help="Optional directory for representative PNG frames.",
    )
    return parser.parse_args()


def font_candidates(bold: bool) -> list[Path]:
    filename = "seguisb.ttf" if bold else "segoeui.ttf"
    candidates: list[Path] = []
    if font_dir := os.environ.get("SWECIRCUIT_FONT_DIR"):
        candidates.append(Path(font_dir) / filename)
    candidates.extend(
        [
            Path("C:/Windows/Fonts") / filename,
            Path("/usr/share/fonts/truetype/dejavu")
            / ("DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"),
            Path("/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf"),
        ]
    )
    return candidates


def load_font(size: int, *, bold: bool = False) -> ImageFont.FreeTypeFont:
    for candidate in font_candidates(bold):
        if candidate.is_file():
            return ImageFont.truetype(str(candidate), size=size)
    raise FileNotFoundError(
        "No supported font found. Set SWECIRCUIT_FONT_DIR to Segoe UI font files."
    )


FONTS = {
    "eyebrow": load_font(16, bold=True),
    "title": load_font(34, bold=True),
    "subtitle": load_font(19),
    "phase": load_font(17, bold=True),
    "module": load_font(22, bold=True),
    "detail": load_font(15),
    "agent": load_font(20, bold=True),
    "small": load_font(14),
    "trace": load_font(18, bold=True),
}


def clamp(value: float) -> float:
    return max(0.0, min(1.0, value))


def ease(value: float) -> float:
    value = clamp(value)
    return value * value * (3.0 - 2.0 * value)


def progress(t: float, start: float, end: float) -> float:
    if end <= start:
        return float(t >= end)
    return ease((t - start) / (end - start))


def mix_hex(first: str, second: str, amount: float) -> str:
    amount = clamp(amount)
    a = tuple(int(first[index : index + 2], 16) for index in (1, 3, 5))
    b = tuple(int(second[index : index + 2], 16) for index in (1, 3, 5))
    mixed = tuple(round(x + (y - x) * amount) for x, y in zip(a, b, strict=True))
    return "#" + "".join(f"{channel:02X}" for channel in mixed)


def text_center(
    draw: ImageDraw.ImageDraw,
    xy: tuple[float, float],
    value: str,
    font: ImageFont.FreeTypeFont,
    fill: str,
) -> None:
    draw.text(xy, value, font=font, fill=fill, anchor="mm")


def draw_arrowhead(
    draw: ImageDraw.ImageDraw,
    point: tuple[float, float],
    direction: str,
    color: str,
    size: int = 8,
) -> None:
    x, y = point
    if direction == "right":
        points = ((x, y), (x - size, y - size), (x - size, y + size))
    elif direction == "up":
        points = ((x, y), (x - size, y + size), (x + size, y + size))
    else:
        points = ((x, y), (x - size, y - size), (x + size, y - size))
    draw.polygon(points, fill=color)


def draw_module(
    draw: ImageDraw.ImageDraw,
    x: int,
    label: str,
    detail: str,
    accent_key: str,
    soft_key: str,
    activation: float,
) -> None:
    y, width, height = 205, 96, 96
    accent = COLORS[accent_key]
    border = mix_hex(COLORS["line"], accent, activation)
    fill = mix_hex(COLORS["surface"], COLORS[soft_key], activation)
    connector_fill = mix_hex(COLORS["surface"], COLORS[soft_key], activation)

    draw.rounded_rectangle(
        (x, y, x + width, y + height),
        radius=11,
        fill=fill,
        outline=border,
        width=3,
    )
    for connector_x in (x - 7, x + width - 7):
        draw.rounded_rectangle(
            (connector_x, y + 35, connector_x + 14, y + 61),
            radius=4,
            fill=connector_fill,
            outline=border,
            width=3,
        )
    draw.rounded_rectangle(
        (x + 18, y + 15, x + width - 18, y + 20),
        radius=3,
        fill=mix_hex(COLORS["line"], accent, activation),
    )
    text_center(
        draw,
        (x + width / 2, y + 55),
        label,
        FONTS["module"],
        COLORS["ink"],
    )
    if detail:
        text_center(
            draw,
            (x + width / 2, y + 78),
            detail,
            FONTS["detail"],
            COLORS["muted"],
        )


def draw_goal(draw: ImageDraw.ImageDraw, activation: float) -> None:
    x, y, width, height = 20, 211, 75, 84
    fill = mix_hex(COLORS["navy_soft"], COLORS["ink"], activation)
    text = mix_hex(COLORS["ink"], COLORS["surface"], activation)
    draw.rounded_rectangle(
        (x, y, x + width, y + height),
        radius=11,
        fill=fill,
        outline=COLORS["ink"],
        width=3,
    )
    text_center(draw, (x + width / 2, y + 42), "GOAL", FONTS["module"], text)



def draw_agent(
    draw: ImageDraw.ImageDraw,
    x: int,
    label: str,
    accent_key: str,
    soft_key: str,
    activation: float,
) -> None:
    y, width, height = 370, 84, 76
    accent = COLORS[accent_key]
    border = mix_hex(COLORS["line"], accent, activation)
    fill = mix_hex(COLORS["surface"], COLORS[soft_key], activation)
    draw.rounded_rectangle(
        (x, y, x + width, y + height),
        radius=10,
        fill=fill,
        outline=border,
        width=3,
    )
    draw.rounded_rectangle(
        (x + 18, y + 15, x + width - 18, y + 20),
        radius=3,
        fill=mix_hex(COLORS["line"], accent, activation),
    )
    text_center(draw, (x + width / 2, y + 48), label, FONTS["agent"], COLORS["ink"])


def draw_packet(
    draw: ImageDraw.ImageDraw,
    start: tuple[float, float],
    end: tuple[float, float],
    amount: float,
    color: str,
) -> None:
    x = start[0] + (end[0] - start[0]) * ease(amount)
    y = start[1] + (end[1] - start[1]) * ease(amount)
    draw.rounded_rectangle((x - 7, y - 7, x + 7, y + 7), radius=3, fill=color)


def draw_frame(t: float) -> Image.Image:
    image = Image.new("RGB", (WIDTH, HEIGHT), COLORS["background"])
    draw = ImageDraw.Draw(image)

    draw.text((20, 32), "HOW SWECIRCUIT WORKS", font=FONTS["eyebrow"], fill=COLORS["blue"])
    draw.text(
        (20, 60),
        "One goal. Modular work. Verified change.",
        font=FONTS["title"],
        fill=COLORS["ink"],
    )

    draw.text((20, 174), "GOAL", font=FONTS["phase"], fill=COLORS["muted"])
    draw.text((110, 174), "WORKFLOW MODULES", font=FONTS["phase"], fill=COLORS["muted"])
    draw.text((420, 329), "HOST MAY PARALLELIZE", font=FONTS["phase"], fill=COLORS["muted"])
    draw.text((586, 174), "OWNER VERIFIES + LEARNS", font=FONTS["phase"], fill=COLORS["muted"])

    draw.line((95, 233, 900, 233), fill=COLORS["rail"], width=5)
    draw.line((95, 281, 900, 281), fill=COLORS["rail"], width=5)
    draw_arrowhead(draw, (900, 257), "right", COLORS["rail"], size=9)

    route_center = (370, 301)
    verify_center = (634, 301)
    split_color = mix_hex(COLORS["line"], COLORS["amber"], progress(t, 0.28, 0.42))
    join_color = mix_hex(COLORS["line"], COLORS["violet"], progress(t, 0.58, 0.74))

    draw.line((route_center[0], route_center[1], route_center[0], 351), fill=split_color, width=4)
    draw.line((462, 351, 652, 351), fill=split_color, width=4)
    draw.line((route_center[0], 351, 462, 351), fill=split_color, width=4)
    for x, _, _, _ in AGENTS:
        center = x + 42
        draw.line((center, 351, center, 366), fill=split_color, width=4)
        draw_arrowhead(draw, (center, 366), "down", split_color, size=6)

    for x, _, _, _ in AGENTS:
        center = x + 42
        draw.line((center, 450, center, 470), fill=join_color, width=4)
    draw.line((462, 470, 652, 470), fill=join_color, width=4)
    draw.line((verify_center[0], 470, verify_center[0], 305), fill=join_color, width=4)
    draw_arrowhead(draw, (verify_center[0], 305), "up", join_color, size=7)

    activation_starts = (0.07, 0.16, 0.25, 0.72, 0.81, 0.90)
    for module, start in zip(MODULES, activation_starts, strict=True):
        draw_module(draw, *module, progress(t, start, start + 0.08))

    goal_activation = progress(t, 0.01, 0.07)
    draw_goal(draw, goal_activation)

    agent_activation = progress(t, 0.38, 0.50)
    pulse = 0.88 + 0.12 * math.sin(max(0.0, t - 0.42) * math.pi * 10)
    for agent in AGENTS:
        draw_agent(draw, *agent, clamp(agent_activation * pulse))

    outbound_colors = (COLORS["blue"], COLORS["teal"], COLORS["violet"])
    for index, (agent, color) in enumerate(zip(AGENTS, outbound_colors, strict=True)):
        center = (agent[0] + 42, 363)
        send = progress(t, 0.30 + index * 0.035, 0.43 + index * 0.035)
        draw_packet(draw, (370, 351), center, send, color)
        receive = progress(t, 0.55 + index * 0.035, 0.69 + index * 0.035)
        draw_packet(draw, (agent[0] + 42, 458), (634, 470), receive, color)

    trace_progress = progress(t, 0.05, 0.96)
    draw.line((20, 510, 900, 510), fill=COLORS["line"], width=4)
    draw.line((20, 510, 20 + 880 * trace_progress, 510), fill=COLORS["blue"], width=4)
    trace_label = "FULL EXECUTION TRACE"
    draw.rounded_rectangle((20, 482, 270, 538), radius=8, fill=COLORS["surface"])
    draw.text((38, 499), trace_label, font=FONTS["trace"], fill=COLORS["ink"])

    return image


def build_frames() -> tuple[list[Image.Image], list[int]]:
    timeline = [0.0] * 5 + [index / 34 for index in range(35)] + [1.0] * 14
    frames = [draw_frame(t) for t in timeline]
    durations = [FRAME_MS] * len(frames)
    durations[-14:] = [110] * 14
    return frames, durations


def save_gif(output: Path, frames: list[Image.Image], durations: list[int]) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        output,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        disposal=2,
        optimize=True,
    )


def write_qa_frames(qa_dir: Path, frames: list[Image.Image]) -> None:
    qa_dir.mkdir(parents=True, exist_ok=True)
    indexes = {
        "01-start.png": 0,
        "02-modules.png": 18,
        "03-parallel.png": 31,
        "04-complete.png": len(frames) - 1,
    }
    for filename, index in indexes.items():
        frames[index].save(qa_dir / filename)


def validate(output: Path, source_frames: int) -> None:
    if output.stat().st_size > 3_000_000:
        raise ValueError(f"GIF exceeds 3 MB: {output.stat().st_size} bytes")
    with Image.open(output) as image:
        if image.size != (WIDTH, HEIGHT):
            raise ValueError(f"Unexpected dimensions: {image.size}")
        if not 30 <= image.n_frames <= source_frames:
            raise ValueError(
                f"Unexpected optimized frame count: {image.n_frames} "
                f"from {source_frames} source frames"
            )
        total_duration = 0
        for frame_index in range(image.n_frames):
            image.seek(frame_index)
            total_duration += int(image.info.get("duration", 0))
        if not 4_000 <= total_duration <= 7_000:
            raise ValueError(f"Unexpected loop duration: {total_duration} ms")


def main() -> None:
    args = parse_args()
    frames, durations = build_frames()
    save_gif(args.output, frames, durations)
    validate(args.output, len(frames))
    if args.qa_dir:
        write_qa_frames(args.qa_dir, frames)
    print(
        f"Generated {args.output} | {WIDTH}x{HEIGHT} | "
        f"{len(frames)} frames | {args.output.stat().st_size} bytes"
    )


if __name__ == "__main__":
    main()
