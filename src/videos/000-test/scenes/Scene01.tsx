import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";

import {
  SubscribeReminder,
  SUBSCRIBE_DURATION,
} from "../../../common/components/SubscribeReminder";

// 10 segundos a 30 FPS.
export const SCENE_01_DURATION = 300;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const Scene01 = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], clamp);

  const progress = interpolate(frame, [30, 110], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "var(--color-background, #101e36)",
        color: "var(--color-text, #f3f6fc)",
        fontFamily: "var(--font-primary, monospace)",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
      }}
    >
      {/* Contenido principal de la escena */}
      <h1
        style={{
          fontSize: 70,
          margin: 0,
          opacity,
        }}
      >
        Our first animation
      </h1>

      <svg
        width="720"
        height="310"
        viewBox="0 0 720 310"
        style={{ overflow: "visible" }}
      >
        <path
          d="M60 20 V260 H680"
          fill="none"
          stroke="#a7b9d1"
          strokeWidth="4"
        />

        <path
          d="M60 230 C160 230 190 90 300 140 S510 20 660 55"
          fill="none"
          stroke="#77bdf2"
          strokeWidth="7"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1 - progress}
        />
      </svg>

      <div
        style={{
          fontSize: 27,
          color: "var(--color-muted, #a7b9d1)",
          opacity,
        }}
      >
        Python · Mathematics · Data Science
      </div>

      {/* Recordatorio superpuesto sobre la escena */}
      <Sequence from={90} durationInFrames={SUBSCRIBE_DURATION} layout="none">
        <SubscribeReminder position="bottom-left" />
      </Sequence>
    </AbsoluteFill>
  );
};
