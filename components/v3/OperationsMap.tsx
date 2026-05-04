import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

/**
 * Operations map — Singapore HQ → Papua New Guinea field operations.
 *
 * Stylised but geographically grounded SVG. Coastlines are simplified
 * silhouettes of the real region (Indochina + Malay peninsula, Sumatra,
 * Java, Borneo, Sulawesi, Philippines, PNG/New Britain, northern
 * Australia) so the markers sit in recognisable context. We deliberately
 * keep the line work flat and brand-aligned — navy ocean, surface-navy
 * land, white hairlines, amber accents — rather than embedding a third-
 * party tiled map.
 *
 * Coordinate frame:
 *   ViewBox 800 × 500
 *   Equator at y = 250 (dashed guide)
 *   Scale ≈ 8.8 px per degree latitude, ≈ 12.5 px per degree longitude
 *   Covers ~94°E – 158°E and ~28°N – 28°S
 *
 * Anchored coordinates:
 *   Singapore     1.35° N, 103.82° E  →  x = 118, y = 238
 *   Port Moresby -9.44° S, 147.18° E  →  x = 660, y = 332
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
        {/* Ocean grid — subtle navy-on-navy texture */}
        <defs>
          <pattern id="oceanGrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.08)" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#oceanGrid)" />

        {/* Latitude guides — equator (solid dash) and Tropic of Capricorn (lighter) */}
        <line x1="0" y1="250" x2="800" y2="250" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="0" y1="455" x2="800" y2="455" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3 6" />
        <text x="14" y="244" fontFamily="monospace" fontSize="9" letterSpacing="2" fill="rgba(255,255,255,0.4)">0°</text>
        <text x="14" y="449" fontFamily="monospace" fontSize="9" letterSpacing="2" fill="rgba(255,255,255,0.25)">23°S</text>

        {/* Longitude marker — 120°E meridian */}
        <line x1="320" y1="0" x2="320" y2="500" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2 8" />
        <text x="324" y="14" fontFamily="monospace" fontSize="9" letterSpacing="2" fill="rgba(255,255,255,0.25)">120°E</text>

        {/* ─── Land masses ──────────────────────────────────────────── */}
        <g fill="var(--color-surface)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeLinejoin="round">

          {/* Indochina + Malay Peninsula
              One continuous landmass: Vietnam east coast on the right,
              Thailand/Cambodia/Myanmar on the west, narrowing south
              through the Kra isthmus to the Malay peninsula and Singapore. */}
          <path d="
            M 0 0
            L 215 0
            L 210 22 L 198 48 L 188 78 L 184 110 L 178 138
            L 168 160 L 152 170 L 138 168 L 122 158 L 108 146
            L 94 140 L 80 132
            L 65 140 L 56 156 L 50 178 L 48 196
            L 56 218 L 70 232 L 86 240 L 102 244 L 112 243
            L 118 240
            L 120 237
            L 117 230
            L 110 215
            L 100 196
            L 92 170
            L 88 142
            L 90 110
            L 100 78
            L 116 50
            L 138 24
            L 168 6
            L 215 0 Z
          " />

          {/* Sumatra — diagonal NW-SE island, parallel to peninsula but
              clearly south of it */}
          <path d="
            M 50 218
            Q 90 248 145 280
            Q 195 312 232 322
            Q 240 326 244 320
            L 232 308
            Q 190 290 145 262
            Q 100 232 65 215
            L 50 218 Z
          " />

          {/* Java — long horizontal thin island */}
          <path d="
            M 232 326
            Q 280 332 330 333
            L 380 332
            Q 392 333 396 329
            L 384 322
            Q 340 316 290 316
            L 245 318
            L 232 326 Z
          " />

          {/* Bali + Lombok + Sumbawa — thin chain east of Java */}
          <path d="M 400 328 L 415 327 L 425 329 L 432 327 L 442 329 L 458 327 L 470 329 L 478 332 L 470 334 L 458 333 L 442 334 L 425 334 L 412 333 L 400 332 L 400 328 Z" />

          {/* Borneo — large rounded landmass at the centre */}
          <path d="
            M 220 195
            Q 260 188 300 198
            Q 332 215 342 248
            Q 340 280 318 300
            Q 282 312 248 302
            Q 218 286 210 250
            Q 208 218 220 195 Z
          " />

          {/* Sulawesi — characteristic K-shape with northern, southwestern
              and southeastern arms branching from a central neck */}
          <path d="
            M 372 210
            Q 380 218 380 232
            L 376 248
            L 384 245
            L 392 235
            Q 398 222 395 208
            L 388 200
            Q 378 200 372 210 Z

            M 376 252
            L 372 268
            Q 368 280 374 282
            L 380 280
            L 386 290
            L 390 305
            L 384 315
            L 392 318
            Q 400 312 402 295
            L 400 278
            L 394 268
            L 388 260
            L 380 256
            L 376 252 Z
          " />

          {/* Philippines — three island clusters: Luzon (north), Visayas
              (centre), Mindanao (south) */}
          {/* Luzon */}
          <path d="M 348 88 Q 365 90 372 110 Q 376 138 370 158 Q 358 152 352 130 Q 348 108 348 88 Z" />
          {/* Mindoro + Visayas archipelago — rendered as a small cluster */}
          <path d="M 360 172 Q 372 174 378 184 Q 382 198 374 202 Q 365 200 360 188 L 360 172 Z" />
          <path d="M 384 188 L 392 190 L 396 200 L 390 204 L 382 200 L 384 188 Z" />
          {/* Mindanao (large southern island) */}
          <path d="
            M 372 220
            Q 392 222 408 232
            Q 418 245 412 258
            Q 396 264 380 258
            Q 368 250 366 235
            L 372 220 Z
          " />

          {/* Halmahera + Spice Islands — small cluster east of Sulawesi */}
          <path d="M 425 215 L 432 218 L 432 235 L 425 240 L 420 230 L 425 215 Z" />
          <path d="M 440 248 L 448 250 L 448 258 L 440 258 L 440 248 Z" />

          {/* Papua New Guinea — bird-shape with Vogelkop head on the west,
              long body extending east, narrow tail toward Port Moresby */}
          <path d="
            M 442 250
            L 455 244
            L 470 248
            L 478 256
            L 472 268
            Q 462 272 454 268
            L 458 276
            L 478 282
            L 510 290
            L 545 297
            L 580 304
            L 620 314
            L 655 326
            L 685 338
            Q 700 346 695 354
            Q 678 356 660 348
            Q 622 340 580 330
            Q 540 322 502 312
            L 470 302
            Q 452 292 446 278
            Q 440 264 442 250 Z
          " />

          {/* New Britain — PNG island east */}
          <path d="
            M 670 308
            Q 696 304 710 312
            Q 712 318 706 322
            Q 690 322 678 318
            L 670 308 Z
          " />

          {/* Solomon Islands chain — small dots east of New Britain */}
          <path d="M 720 320 L 725 318 L 730 321 L 727 325 L 722 324 L 720 320 Z" />
          <path d="M 738 326 L 745 326 L 746 332 L 740 333 L 738 326 Z" />

          {/* Northern Australia — Cape York peninsula visible, Gulf of
              Carpentaria as a notch */}
          <path d="
            M 0 408
            L 80 402
            Q 175 388 270 380
            Q 320 376 360 380
            Q 395 388 425 400
            L 442 416
            L 450 432
            L 458 422
            Q 465 410 470 396
            L 478 380
            L 488 370
            L 500 366
            L 510 372
            L 518 388
            L 528 400
            Q 555 404 590 402
            Q 640 398 695 398
            Q 745 400 800 404
            L 800 500
            L 0 500
            L 0 408 Z
          " />
        </g>

        {/* Region labels — discreet monospace, low opacity */}
        <g fontFamily="monospace" fontSize="8" letterSpacing="2" fill="rgba(255,255,255,0.32)">
          <text x="262" y="64">SOUTH CHINA SEA</text>
          <text x="278" y="252">JAVA SEA</text>
          <text x="525" y="262">BANDA SEA</text>
          <text x="608" y="190">PHILIPPINE SEA</text>
          <text x="538" y="450">CORAL SEA</text>
          <text x="220" y="478">AUSTRALIA</text>
        </g>

        {/* Great-circle path — Singapore → Port Moresby */}
        <path
          d="M 118 238 Q 360 200 660 332"
          fill="none"
          stroke="var(--color-amber)"
          strokeWidth="1.5"
          strokeDasharray="2 5"
          opacity="0.85"
        />

        {/* ─── Markers ──────────────────────────────────────────────── */}

        {/* Singapore HQ — at southern tip of Malay peninsula, 1.35°N */}
        <g transform="translate(118, 238)">
          <circle r="14" fill="var(--color-amber)" opacity="0.18" />
          <circle r="8" fill="var(--color-amber)" opacity="0.32" />
          <circle r="4" fill="var(--color-amber)" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="0" y="28" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1.5" fill="var(--color-amber)" fontWeight="700">
            SINGAPORE
          </text>
          <text x="0" y="42" textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="1.5" fill="rgba(255,255,255,0.55)">
            HQ · 1.35° N
          </text>
        </g>

        {/* Port Moresby — Operations, 9.44°S */}
        <g transform="translate(660, 332)">
          <circle r="18" fill="var(--color-amber)" opacity="0.16" />
          <circle r="11" fill="var(--color-amber)" opacity="0.3" />
          <circle r="6" fill="var(--color-amber)" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="-14" y="-12" textAnchor="end" fontFamily="monospace" fontSize="10" letterSpacing="2" fill="var(--color-amber)" fontWeight="700">
            PORT MORESBY
          </text>
          <text x="-14" y="2" textAnchor="end" fontFamily="monospace" fontSize="9" letterSpacing="2" fill="rgba(255,255,255,0.6)">
            OPERATIONS · 9.44° S
          </text>
        </g>

        {/* North indicator (compass) */}
        <g transform="translate(740, 440)" fill="rgba(255,255,255,0.45)">
          <path d="M 0 -14 L 6 8 L 0 4 L -6 8 Z" fill="var(--color-amber)" />
          <text x="0" y="22" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="2">N</text>
        </g>
      </svg>
    </div>
  );
}
