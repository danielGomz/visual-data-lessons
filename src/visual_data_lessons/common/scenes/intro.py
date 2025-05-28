from manim import (
    BLUE,
    BOLD,
    DOWN,
    GREEN,
    UP,
    Circumscribe,
    FadeIn,
    FadeOut,
    Text,
    Transform,
    Write,
)

from visual_data_lessons.common.scenes.base_scene import BaseScene


class IntroScene(BaseScene):
    def display_intro(self, video_title: str = None, author_name: str = "Daniel Gómez") -> None:
        """
        Display the intro sequence with project name, author, and optional video title.

        Parameters
        ----------
        video_title : str, optional
            The title of the video to display. If None, the intro remains generic.
        author_name : str
            The name of the author or presenter.
        """
        self.add_safe_sound(
            "src/visual_data_lessons/common/assets/sound/Granite (Sting) - Ethan Meixsell.wav"
        )
        scale = self.get_text_size_factor()

        project_name = Text(
            "Visual Data Lessons",
            font_size=72 * scale,
            gradient=(GREEN, BLUE),
            weight=BOLD,
        )

        host_text = Text(
            f"Presented by {author_name}",
            font_size=36 * scale,
            weight="LIGHT",
        ).next_to(project_name, DOWN)

        self.play(Write(project_name), run_time=0.5)
        self.play(FadeIn(host_text, shift=UP), run_time=0.7)

        if video_title:
            title_text = Text(
                video_title,
                font_size=72 * scale,
                gradient=(GREEN, BLUE),
                weight=BOLD,
            )
            self.play(Transform(project_name, title_text), FadeOut(host_text))
            self.play(Circumscribe(project_name, color=BLUE))
            self.play(FadeOut(project_name, scale=0.3))

    def construct(self) -> None:
        self.display_intro("Video title")
