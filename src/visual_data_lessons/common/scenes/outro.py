from manim import DL, DOWN, ORANGE, UP, WHITE, YELLOW, FadeIn, FadeOut, Text, Write

from visual_data_lessons.common.objects.subscribe_reminder import SubscribeReminder
from visual_data_lessons.common.scenes.base_scene import BaseScene


class OutroScene(BaseScene):

    def display_outro(self):
        text_size_factor = self.get_text_size_factor()
        thank_you = Text(
            "Thank You for Watching!",
            font_size=72 * text_size_factor,
            gradient=(YELLOW, ORANGE),
        ).shift(UP * 2)

        subscribe = Text(
            "Subscribe for more content!",
            font_size=36 * text_size_factor,
            color=WHITE,
        ).next_to(thank_you, DOWN)
        self.add_safe_sound(
            "src/visual_data_lessons/common/assets/sound/Allemande (Sting) - Wahneta Meixsell.wav"
        )
        self.play(Write(thank_you), run_time=1)

        reminder = SubscribeReminder().to_corner(DL)

        self.play(Write(subscribe, shift=UP), FadeIn(reminder, shift=UP), run_time=0.75)

        self.play(reminder.animate())

        self.play(FadeOut(thank_you), FadeOut(subscribe), FadeOut(reminder), run_time=0.75)

    def construct(self):
        self.display_outro()
