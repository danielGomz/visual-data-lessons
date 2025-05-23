import logging
from pathlib import Path

from manim import Scene, tempconfig

logging.basicConfig(level=logging.INFO)


class BaseScene(Scene):

    def add_safe_sound(self, sound_file, *args, **kwargs):
        """
        Adds a sound to the scene if the sound file exists.
        Logs a warning and skips playing the sound if the file is missing.

        Parameters
        ----------
        sound_file : str or pathlib.Path
            Path to the sound file to add.
        *args : tuple
            Additional positional arguments to pass to `self.add_sound`.
        **kwargs : dict
            Additional keyword arguments to pass to `self.add_sound`.

        Returns
        -------
        None
        """
        sound_path = Path(sound_file)
        if sound_path.exists():
            self.add_sound(sound_file, *args, **kwargs)
        else:
            logging.warning(
                f"⚠️ [AUDIO SKIPPED] Sound file not found: '{sound_file}'. It will not be played."
            )

    @classmethod
    def render_custom(cls, landscape: bool = True, preview: bool = False):
        """
        Renders the scene with a predefined configuration for landscape or portrait mode.

        This method sets up the rendering configuration dynamically using Manim's `tempconfig`,
        allowing you to switch between landscape (16:9) and portrait (9:16) formats.
        Useful for standardizing video formats depending on the target platform.

        Parameters
        ----------
        landscape : bool, optional
            Whether to render in landscape mode. If False, renders in portrait mode.
            Default is True.
        preview : bool, optional
            Currently unused. Reserved for future implementation (e.g., live preview or flags).
            Default is False.

        Returns
        -------
        None
        """
        logging.info("🚀 Initializing scene rendering... 🎬")

        if landscape:
            logging.info("🌄 Rendering in landscape mode (16:9, 1920x1080)... 🎬")
            with tempconfig(
                {
                    "background_color": "#283055",
                    "pixel_width": 1920,
                    "pixel_height": 1080,
                    "frame_width": 16,
                    "frame_height": 9,
                }
            ):

                scene = cls()
                scene.render()
        else:
            logging.info("📱 Rendering in portrait mode (9:16, 1080x1920)... 🎬")
            with tempconfig(
                {
                    "background_color": "#283055",
                    "pixel_width": 1080,
                    "pixel_height": 1920,
                    "frame_width": 9,
                    "frame_height": 16,
                }
            ):

                scene = cls()
                scene.render()
