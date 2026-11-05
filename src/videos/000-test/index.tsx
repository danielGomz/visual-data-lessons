
import { Composition, registerRoot } from "remotion";

import { TestVideo, VIDEO_DURATION } from "./Video";
import { Scene01, SCENE_01_DURATION } from "./scenes/Scene01";

import { Intro, INTRO_DURATION } from "../../common/scenes/Intro";
import { Outro, OUTRO_DURATION } from "../../common/scenes/Outro";
import {
  SubscribeReminder,
  SUBSCRIBE_DURATION,
} from "../../common/components/SubscribeReminder";

import "../../common/theme.css";

const Root = () => (
  <>
    {/* Video completo horizontal */}
    <Composition
      id="Test000"
      component={TestVideo}
      durationInFrames={VIDEO_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />

    {/* Short vertical de Scene01 */}
    <Composition
      id="Test000Short"
      component={Scene01}
      durationInFrames={SCENE_01_DURATION}
      fps={30}
      width={1080}
      height={1920}
    />

    {/* Prueba vertical de la intro */}
    <Composition
      id="TestIntroVertical"
      component={Intro}
      durationInFrames={INTRO_DURATION}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        videoTitle: "Visual Data Lessons — Test 000",
      }}
    />

    {/* Prueba vertical de la outro */}
    <Composition
      id="TestOutroVertical"
      component={Outro}
      durationInFrames={OUTRO_DURATION}
      fps={30}
      width={1080}
      height={1920}
    />

    {/* Prueba vertical del recordatorio */}
    <Composition
      id="TestSubscribeVertical"
      component={SubscribeReminder}
      durationInFrames={SUBSCRIBE_DURATION}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);

registerRoot(Root);