import { Series } from "remotion";

import { Intro, INTRO_DURATION } from "../../common/scenes/Intro";

import { Outro, OUTRO_DURATION } from "../../common/scenes/Outro";

import { Scene01, SCENE_01_DURATION } from "./scenes/Scene01";

export const VIDEO_DURATION =
  INTRO_DURATION + SCENE_01_DURATION + OUTRO_DURATION;

export const TestVideo = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={INTRO_DURATION}>
        <Intro videoTitle="Visual Data Lessons — Test 000" />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENE_01_DURATION}>
        <Scene01 />
      </Series.Sequence>

      <Series.Sequence durationInFrames={OUTRO_DURATION}>
        <Outro />
      </Series.Sequence>
    </Series>
  );
};
