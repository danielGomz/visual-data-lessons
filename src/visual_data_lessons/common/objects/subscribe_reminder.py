from manim import (
    BLACK,
    BOLD,
    DOWN,
    RIGHT,
    WHITE,
    AnimationGroup,
    Circle,
    FadeIn,
    FadeOut,
    Group,
    ImageMobject,
    RoundedRectangle,
    Succession,
    Text,
    TransformMatchingShapes,
)

from ..config import LOGO_PATH


class SubscribeReminder(Group):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        image = ImageMobject(LOGO_PATH).set_width(1)
        circle = Circle(radius=image.width / 2, color="#FF0000", stroke_width=10)
        image.move_to(circle)

        rounded_rectangle = RoundedRectangle(
            width=3.5,
            height=0.75,
            corner_radius=0.3,
            stroke_width=0,
            fill_color=WHITE,
            fill_opacity=1,
        )

        rounded_rectangle.next_to(image, RIGHT, buff=-image.height / 2)

        subscribe_button = RoundedRectangle(
            width=1.125,
            height=0.375,
            corner_radius=0.15,
            stroke_width=0,
            fill_color="#0F0F0F",
            fill_opacity=1,
        )
        subscribe_text = Text(
            "Subscribe",
            font_size=12,
            color=WHITE,
            weight=BOLD,
        )

        like_text = Text("", font_size=36, color="#0F0F0F")
        bell_text = Text("󰂜", font_size=36, color="#0F0F0F")

        bell_text.next_to(circle, RIGHT, buff=0.3)
        subscribe_button.next_to(bell_text, RIGHT, buff=0.3)
        subscribe_text.move_to(subscribe_button)
        like_text.next_to(subscribe_button, RIGHT, buff=0.3)

        logo_group = Group(circle, image)
        button_group = Group(subscribe_button, subscribe_text, like_text, bell_text)
        full_reminder = Group(rounded_rectangle, logo_group, button_group)

        self.add(full_reminder)

        self.rounded_rectangle = rounded_rectangle
        self.logo_group = logo_group
        self.button_group = button_group

    def animate_reminder(self):
        cursor_text = Text("󰇀", font_size=20, color=WHITE, stroke_width=1, stroke_color=BLACK)
        cursor_text.z_index = 10
        cursor_text.next_to(self.rounded_rectangle, RIGHT, buff=0.3)

        new_subscribe_text = Text("Subscribed", font_size=12, color=WHITE, weight=BOLD)
        new_subscribe_text.scale(self.button_group[1].height / new_subscribe_text.height)
        new_subscribe_text.move_to(self.button_group[0])

        new_bell_text = Text("󰂟", font_size=40, color="#FFA500")
        new_bell_text.scale(self.button_group[3].height / new_bell_text.height)
        new_bell_text.move_to(self.button_group[3].get_center())

        new_like_text = Text("", font_size=36, color="#0F0F0F")
        new_like_text.scale(self.button_group[2].height / new_like_text.height)
        new_like_text.move_to(self.button_group[2].get_center())

        self.add(cursor_text)

        return Succession(
            FadeIn(cursor_text, run_time=0.8),  # un poco más lento que antes
            AnimationGroup(
                cursor_text.animate.move_to(self.button_group[1].get_center() + DOWN * 0.2),
                self.button_group[0].animate.set_color("#FF0000"),
                lag_ratio=1,
                run_time=1.0,
            ),
            TransformMatchingShapes(self.button_group[1], new_subscribe_text, run_time=1.0),
            AnimationGroup(
                cursor_text.animate.move_to(self.button_group[3].get_center() + DOWN * 0.2),
                TransformMatchingShapes(self.button_group[3], new_bell_text),
                lag_ratio=1,
                run_time=1.0,
            ),
            AnimationGroup(
                cursor_text.animate.move_to(self.button_group[2].get_center() + DOWN * 0.2),
                TransformMatchingShapes(self.button_group[2], new_like_text),
                lag_ratio=1,
                run_time=1.0,
            ),
            FadeOut(cursor_text, run_time=0.8),
        )
