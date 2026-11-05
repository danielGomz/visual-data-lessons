import {
  AbsoluteFill,
  Audio,
  Img,
  getStaticFiles,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type OutroProps = {
  message?: string;
  farewell?: string;
  cta?: string;
  authorName?: string;
};

// Duración del piano: 10.553 segundos.
// 317 fotogramas a 30 FPS = 10.567 segundos.
export const OUTRO_DURATION = 317;

const OUTRO_MUSIC = "assets/audio/outro.mp3";
const OUTRO_VOICE = "assets/audio/outro-voice.wav";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const Outro = ({
  message = "Thanks for watching!",
  farewell = "See you next time!",
  cta = "Subscribe for more lessons",
  authorName = "Daniel Gómez",
}: OutroProps) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const portrait = height > width;
  const scale = portrait ? 0.68 : 1;

  // Audios locales opcionales.
  const files = getStaticFiles();

  const hasMusic = files.some((file) => file.name === OUTRO_MUSIC);

  const hasVoice = files.some((file) => file.name === OUTRO_VOICE);

  // Entrada del logo.
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], clamp);

  const logoY = interpolate(frame, [0, 12], [18, 0], clamp);

  // Nombre del proyecto.
  const brandOpacity = interpolate(frame, [8, 20], [0, 1], clamp);

  // Primera frase: permanece visible.
  const messageOpacity = interpolate(frame, [14, 28], [0, 1], clamp);

  // Segunda frase: aparece debajo.
  const farewellOpacity = interpolate(frame, [52, 68], [0, 1], clamp);

  const farewellY = interpolate(frame, [52, 68], [16, 0], clamp);

  // Suscripción y firma.
  const ctaOpacity = interpolate(frame, [72, 90], [0, 1], clamp);

  // Salida visual cerca del final del piano.
  const exitOpacity = interpolate(
    frame,
    [OUTRO_DURATION - 25, OUTRO_DURATION - 1],
    [1, 0],
    clamp,
  );

  // Música completa, sin recortes ni fundido artificial.
  // Bajamos el volumen cuando hay voz.
  const musicLevel = hasVoice ? 0.18 : 0.65;

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
      {/* Fondo sutil */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(119,189,242,0.08), transparent 68%)",
        }}
      />

      <div
        style={{
          width: "86%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 16 * scale,
          opacity: exitOpacity,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoY}px)`,
            borderRadius: 16 * scale,
            overflow: "hidden",
          }}
        >
          <Img
            src={staticFile("assets/images/logo.png")}
            style={{
              width: 145 * scale,
              display: "block",
            }}
          />
        </div>

        {/* Marca */}
        <div
          style={{
            fontSize: 21 * scale,
            letterSpacing: 2 * scale,
            color: "var(--color-muted, #a7b9d1)",
            opacity: brandOpacity,
          }}
        >
          Visual Data Lessons
        </div>

        {/* Agradecimiento */}
        <h2
          style={{
            fontSize: 62 * scale,
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
            opacity: messageOpacity,
          }}
        >
          {message}
        </h2>

        {/* Despedida */}
        <h3
          style={{
            fontSize: 43 * scale,
            fontWeight: 600,
            lineHeight: 1.25,
            margin: 0,
            color: "var(--color-primary, #77bdf2)",
            opacity: farewellOpacity,
            transform: `translateY(${farewellY}px)`,
          }}
        >
          {farewell}
        </h3>

        {/* Invitación secundaria */}
        <div
          style={{
            marginTop: 12 * scale,
            fontSize: 24 * scale,
            color: "var(--color-muted, #a7b9d1)",
            opacity: ctaOpacity,
          }}
        >
          {cta}
        </div>

        {/* Firma */}
        <div
          style={{
            fontSize: 19 * scale,
            color: "var(--color-muted, #a7b9d1)",
            opacity: ctaOpacity,
          }}
        >
          {authorName}
        </div>
      </div>

      {/* Piano completo y opcional */}
      {hasMusic && <Audio src={staticFile(OUTRO_MUSIC)} volume={musicLevel} />}

      {/* Narración opcional */}
      {hasVoice && <Audio src={staticFile(OUTRO_VOICE)} volume={1} />}
    </AbsoluteFill>
  );
};
