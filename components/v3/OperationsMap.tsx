import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Stylised operations map — Singapore HQ → Papua New Guinea field ops.
 *
 * Hand-drawn SVG with simplified Southeast Asia and PNG/Australia
 * coastlines so the markers sit in real geographic context. The drawing
 * intentionally reads as a map illustration rather than satellite data:
 * thick navy background, amber and white accents only, no cartographic
 * details. A dashed great-circle line joins HQ to operations.
 *
 * Coordinates (decimal):
 *   Singapore     1.35° N, 103.82° E
 *   Port Moresby -9.44° S, 147.18° E
 *
 * The viewBox spans roughly 95°E–160°E and 10°N–18°S, normalised to a
 * 800×500 canvas (Mercator-flat approximation, fine at this scale).
 */
export function OperationsMap({ className }: Props) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-deep-navy",
        className,
      )}
    >
      <svg
        viewBox="0 0 800 500"
        className="block h-auto w-full"
        role="img"
        aria-label="Map of Southeast Asia and the Pacific showing Forex Drilling Singapore headquarters and Papua New Guinea operations"
      >
        {/* Dotted ocean grid — subtle navy-on-navy texture */}
        <defs>
          <pattern id="oceanGrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.08)" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#oceanGrid)" />

        {/* Equator + meridian guides — mono technical feel */}
        <line x1="0" y1="250" x2="800" y2="250" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 6" />
        <text x="20" y="244" fontFamily="monospace" fontSize="9" letterSpacing="2" fill="rgba(255,255,255,0.35)">
          0°
        </text>

        {/* Stylised coastlines — hand-traced approximation, fill = surface (lighter navy) */}
        <g fill="var(--color-surface)" stroke="rgba(255,255,255,0.18)" strokeWidth="1">
          {/* Malay peninsula + Singapore tip */}
          <path d="M 90 180 Q 105 200 100 230 L 110 250 Q 115 252 118 248 L 122 246 L 116 242 L 112 230 Q 118 215 116 195 L 110 170 Q 100 165 90 180 Z" />
          {/* Sumatra */}
          <path d="M 95 250 Q 130 275 175 300 Q 200 305 215 295 Q 200 270 165 255 Q 130 245 95 250 Z" />
          {/* Java */}
          <path d="M 200 310 Q 260 320 320 322 Q 340 325 355 318 Q 340 308 290 305 Q 240 304 200 310 Z" />
          {/* Borneo */}
          <path d="M 230 220 Q 290 215 320 240 Q 330 280 305 300 Q 270 305 245 290 Q 225 260 230 220 Z" />
          {/* Sulawesi */}
          <path d="M 360 230 Q 380 245 375 275 Q 365 290 372 305 Q 385 290 388 275 Q 395 250 380 232 Z" />
          {/* Philippines */}
          <path d="M 360 130 Q 380 145 378 175 Q 372 200 380 215 Q 395 200 392 170 Q 385 140 370 125 Q 362 122 360 130 Z" />
          {/* Papua New Guinea (mainland + tail) */}
          <path d="M 460 290 Q 520 280 580 295 Q 620 305 660 320 Q 690 330 700 345 Q 695 355 670 350 Q 620 345 575 335 Q 520 325 480 318 Q 462 308 460 290 Z" />
          {/* New Britain (PNG island east) */}
          <path d="M 660 295 Q 690 290 705 300 Q 700 308 680 308 Q 665 305 660 295 Z" />
          {/* Northern Australia coast (top edge) */}
          <path d="M 350 380 Q 420 388 500 392 Q 560 395 620 393 Q 680 390 740 395 L 800 400 L 800 500 L 0 500 L 0 410 L 80 405 Q 180 388 280 382 Q 320 380 350 380 Z" />
        </g>

        {/* Great-circle path — Singapore → Port Moresby */}
        <path
          d="M 138 240 Q 360 195 660 332"
          fill="none"
          stroke="var(--color-amber)"
          strokeWidth="1.5"
          strokeDasharray="2 5"
          opacity="0.85"
        />

        {/* Singapore marker — HQ (filled diamond) */}
        <g transform="translate(138, 240)">
          <circle r="14" fill="var(--color-amber)" opacity="0.18" />
          <circle r="8" fill="var(--color-amber)" opacity="0.32" />
          <circle r="4" fill="var(--color-amber)" stroke="#FFFFFF" strokeWidth="1.5" />
          <text
            x="14"
            y="-8"
            fontFamily="monospace"
            fontSize="10"
            letterSpacing="2"
            fill="var(--color-amber)"
            fontWeight="700"
          >
            SINGAPORE
          </text>
          <text
            x="14"
            y="6"
            fontFamily="monospace"
            fontSize="9"
            letterSpacing="2"
            fill="rgba(255,255,255,0.6)"
          >
            HQ · 1.35° N
          </text>
        </g>

        {/* Port Moresby marker — Operations */}
        <g transform="translate(660, 332)">
          <circle r="18" fill="var(--color-amber)" opacity="0.16" />
          <circle r="11" fill="var(--color-amber)" opacity="0.3" />
          <circle r="6" fill="var(--color-amber)" stroke="#FFFFFF" strokeWidth="1.5" />
          <text
            x="-14"
            y="-12"
            textAnchor="end"
            fontFamily="monospace"
            fontSize="10"
            letterSpacing="2"
            fill="var(--color-amber)"
            fontWeight="700"
          >
            PORT MORESBY
          </text>
          <text
            x="-14"
            y="2"
            textAnchor="end"
            fontFamily="monospace"
            fontSize="9"
            letterSpacing="2"
            fill="rgba(255,255,255,0.6)"
          >
            OPERATIONS · 9.44° S
          </text>
        </g>

        {/* Bottom-right scale / N indicator */}
        <g transform="translate(740, 440)" fill="rgba(255,255,255,0.45)">
          <path d="M 0 -14 L 6 8 L 0 4 L -6 8 Z" fill="var(--color-amber)" />
          <text x="0" y="22" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="2">
            N
          </text>
        </g>
      </svg>
    </div>
  );
}
