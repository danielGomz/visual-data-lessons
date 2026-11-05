import {
  AbsoluteFill,
  Audio,
  getStaticFiles,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type IntroProps = {
  videoTitle?: string;
  authorName?: string;
};

export const INTRO_DURATION = 150;

const INTRO_AUDIO = "assets/audio/intro.wav";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const Intro = ({
  videoTitle,
  authorName = "Daniel Gómez",
}: IntroProps) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const portrait = height > width;
  const scale = portrait ? 0.65 : 1;

  const hasIntroAudio = getStaticFiles().some(
    (file) => file.name === INTRO_AUDIO,
  );

  const reveal = interpolate(frame, [0, 15], [0, 100], clamp);

  const authorOpacity = interpolate(
    frame,
    [15, 22, 38, 45],
    [0, 1, 1, 0],
    clamp,
  );

  const authorY = interpolate(frame, [15, 22], [12, 0], clamp);

  const brandOpacity = videoTitle
    ? interpolate(frame, [43, 49], [1, 0], clamp)
    : 1;

  const titleOpacity = videoTitle
    ? interpolate(frame, [49, 56], [0, 1], clamp)
    : 0;

  const titleY = interpolate(frame, [49, 56], [12, 0], clamp);

  const exitOpacity = interpolate(frame, [145, 165], [1, 0], clamp);

  const brandVisibility = brandOpacity * exitOpacity;

  const textStyle: React.CSSProperties = {
    fontFamily: "var(--font-primary, FiraCode, monospace)",
    fontSize: 80 * scale,
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: -1 * scale,
    textAlign: "center",
    margin: 0,
    color: "var(--color-text, #f3f6fc)",
    overflowWrap: "anywhere",
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "var(--color-background, #101e36)",
        color: "var(--color-text, #f3f6fc)",
        fontFamily: "var(--font-primary, FiraCode, monospace)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "88%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12 * scale,
          opacity: brandVisibility,
          transform: `translateY(${-15 * scale}px)`,
        }}
      >
        <h1
          style={{
            ...textStyle,
            clipPath: `inset(0 ${100 - reveal}% 0 0)`,
          }}
        >
          Visual Data Lessons
        </h1>

        <div
          style={{
            fontSize: 30 * scale,
            fontWeight: 300,
            color: "var(--color-muted, #a7b9d1)",
            opacity: authorOpacity,
            transform: `translateY(${authorY}px)`,
          }}
        >
          Presented by{" "}
          <span
            style={{
              color: "var(--color-primary, #77bdf2)",
              fontWeight: 700,
            }}
          >
            {authorName}
          </span>
        </div>
      </div>

      {videoTitle && (
        <div
          style={{
            position: "absolute",
            width: "88%",
            textAlign: "center",
            opacity: titleOpacity * exitOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <h2 style={textStyle}>{videoTitle}</h2>
        </div>
      )}

      {hasIntroAudio && <Audio src={staticFile(INTRO_AUDIO)} />}
    </AbsoluteFill>
  );
};
