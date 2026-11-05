import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type SubscribeReminderProps = {
  position?: "bottom-left" | "bottom-right";
};

export const SUBSCRIBE_DURATION = 180;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

// Podés jugar aquí con el borde rojo del logo.
const LOGO_RING_COLOR = "#D84A43";
const LOGO_RING_WIDTH = 5;

const BellIcon = ({ active }: { active: boolean }) => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"
      stroke="#1F1F1F"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M10 21h4" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" />
    {active && (
      <path
        d="M3 6 1 4 M21 6l2-2"
        stroke="#1F1F1F"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    )}
  </svg>
);

const LikeIcon = ({ active }: { active: boolean }) => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
    <path
      d="M7 10v11H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3Zm0 0 5-8c2-1 3 1 2 3l-1 5h6a3 3 0 0 1 3 3l-2 6a3 3 0 0 1-3 2H7"
      fill={active ? "#0D0C0B" : "#F2F0F0"}
      stroke="#1F1F1F"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

const Cursor = () => (
  <svg width="38" height="48" viewBox="0 0 32 40">
    <path
      d="M3 2 3 33 11 26 17 38 23 35 17 23 29 22Z"
      fill="#FFFFFF"
      stroke="#000000"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
  </svg>
);

export const SubscribeReminder = ({
  position = "bottom-left",
}: SubscribeReminderProps) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const portrait = height > width;
  const scale = portrait ? 0.72 : 1;

  // Geometría general
  const LOGO_SIZE = 120;
  const BAR_X = 72;
  const BAR_Y = 42;
  const BAR_WIDTH = 470;
  const BAR_HEIGHT = 74;
  const BAR_RADIUS = 34; // final de la barra más redondeado

  // Coordenadas absolutas dentro del contenedor local (580x160)
  const BELL_X = 200;
  const SUBSCRIBE_X = 282;
  const LIKE_X = 462;
  const CONTROL_Y = 73;

  // Entrada del logo
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], clamp);
  const logoScale = interpolate(frame, [0, 14], [0.88, 1], clamp);

  // Barra sale desde detrás del logo
  const barProgress = interpolate(frame, [12, 30], [0, 1], clamp);

  // Cursor: subscribe -> bell -> like
  const cursorX = interpolate(
    frame,
    [34, 48, 62, 80, 94, 110, 124, 144],
    [565, SUBSCRIBE_X, SUBSCRIBE_X, BELL_X, BELL_X, LIKE_X, LIKE_X, 565],
    clamp,
  );

  const cursorY = interpolate(
    frame,
    [34, 48, 62, 80, 94, 110, 124, 144],
    [
      145,
      CONTROL_Y,
      CONTROL_Y,
      CONTROL_Y,
      CONTROL_Y,
      CONTROL_Y,
      CONTROL_Y,
      145,
    ],
    clamp,
  );

  const cursorOpacity = interpolate(
    frame,
    [32, 40, 142, 152],
    [0, 1, 1, 0],
    clamp,
  );

  const clickFrames = [55, 87, 117];
  const clickScale = clickFrames.some(
    (click) => frame >= click && frame < click + 5,
  )
    ? 0.82
    : 1;

  const subscribed = frame >= 59;
  const bellActive = frame >= 91;
  const liked = frame >= 121;

  const exitOpacity = interpolate(frame, [160, 179], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          bottom: portrait ? 90 : 65,
          ...(position === "bottom-left"
            ? { left: portrait ? 35 : 65 }
            : { right: portrait ? 35 : 65 }),
          width: 580 * scale,
          height: 160 * scale,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 580,
            height: 160,
            transform: `scale(${scale})`,
            transformOrigin:
              position === "bottom-left" ? "bottom left" : "bottom right",
            opacity: exitOpacity,
          }}
        >
          {/* Barra */}
          <div
            style={{
              position: "absolute",
              left: BAR_X,
              top: BAR_Y,
              width: BAR_WIDTH,
              height: BAR_HEIGHT,
              borderRadius: BAR_RADIUS,
              backgroundColor: "#F9F9F9",
              boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
              overflow: "hidden",
              clipPath: `inset(0 ${100 - barProgress * 100}% 0 0 round ${BAR_RADIUS}px)`,
            }}
          >
            {/* Campana */}
            <div
              style={{
                position: "absolute",
                left: BELL_X - BAR_X - 21,
                top: (BAR_HEIGHT - 42) / 2,
              }}
            >
              <BellIcon active={bellActive} />
            </div>

            {/* Subscribe */}
            <div
              style={{
                position: "absolute",
                left: SUBSCRIBE_X - BAR_X - 20,
                top: 16,
                width: 160,
                height: 42,
                borderRadius: 12,
                backgroundColor: subscribed ? LOGO_RING_COLOR : "#161617",
                border: "1px solid transparent",
                color: "#FFFFFF",
                fontFamily: "var(--font-primary, monospace)",
                fontSize: 15,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </div>

            {/* Like */}
            <div
              style={{
                position: "absolute",
                left: LIKE_X - BAR_X - 21,
                top: (BAR_HEIGHT - 42) / 2,
              }}
            >
              <LikeIcon active={liked} />
            </div>
          </div>

          {/* Logo circular superpuesto */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: (160 - LOGO_SIZE) / 2,
              width: LOGO_SIZE,
              height: LOGO_SIZE,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              border: `${LOGO_RING_WIDTH}px solid ${LOGO_RING_COLOR}`,
              boxShadow: "0 12px 30px rgba(0,0,0,0.38)",
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img
              src={staticFile("assets/images/logo.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>

          {/* Cursor */}
          <div
            style={{
              position: "absolute",
              left: cursorX,
              top: cursorY,
              opacity: cursorOpacity,
              transform: `scale(${clickScale})`,
              transformOrigin: "top left",
              filter: "drop-shadow(2px 3px 2px rgba(0,0,0,0.4))",
            }}
          >
            <Cursor />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
