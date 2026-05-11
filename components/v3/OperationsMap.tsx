"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

/**
 * Operations map — interactive vector map (MapLibre GL + OpenFreeMap free
 * tiles), recoloured at runtime to the brand palette so the map reads
 * Google-Maps-detailed but stays consistent with the rest of the site.
 *
 * No third-party API key is required: OpenFreeMap (https://openfreemap.org)
 * provides the OSM-derived vector tiles publicly, free of charge.
 *
 * Anchored coordinates:
 *   Singapore     1.35° N, 103.82° E   — HQ marker
 *   Port Moresby  9.44° S, 147.18° E   — Operations marker
 *   Dashed amber line traces the great-circle Singapore → Port Moresby.
 *
 * Performance: lazy-init in a useEffect, single instance, cleaned up on
 * unmount. cooperativeGestures keeps Cmd/two-finger scroll required so
 * the map never traps page scroll.
 */
const SINGAPORE: [number, number] = [103.82, 1.35];
const PORT_MORESBY: [number, number] = [147.18, -9.44];

// Brand palette mirrors app/globals.css tokens
const C_OCEAN     = "#11284E";       // --color-deep-navy
const C_OCEAN_2   = "#0A1A36";       // slightly deeper for water bodies
const C_LAND      = "#163767";       // --color-surface
const C_LAND_DIM  = "#1A3F75";       // brighter sub-area highlight
const C_AMBER     = "#E3AA00";       // markers, great-circle
const C_BORDER    = "rgba(255,255,255,0.18)";
const C_ROAD      = "rgba(255,255,255,0.10)";
const C_LABEL     = "rgba(255,255,255,0.78)";
const C_HALO      = "#0A1A36";

export function OperationsMap({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return; // singleton — useEffect can fire twice in dev

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [125, -3],
      zoom: 3.2,
      // Attribution surfaced via MapLibre's built-in control (collapsed
      // by default; click the ⓘ to expand). OpenFreeMap + OpenStreetMap
      // data is licensed under ODbL which requires attribution — this
      // is the lightest legal-compliant surface.
      attributionControl: { compact: true },
      cooperativeGestures: true,
      pitchWithRotate: false,
      dragRotate: false,
    });
    mapRef.current = map;

    map.on("load", () => {
      const style = map.getStyle();
      const layers = style?.layers ?? [];

      for (const layer of layers) {
        const id = layer.id;
        const type = layer.type;
        try {
          if (type === "background") {
            map.setPaintProperty(id, "background-color", C_OCEAN);
            continue;
          }
          if (type === "fill") {
            const isWater = /water|ocean|sea|lake|river/i.test(id);
            if (isWater) {
              map.setPaintProperty(id, "fill-color", C_OCEAN_2);
              map.setPaintProperty(id, "fill-opacity", 1);
            } else if (/park|forest|wood|grass|landcover/i.test(id)) {
              map.setPaintProperty(id, "fill-color", C_LAND_DIM);
              map.setPaintProperty(id, "fill-opacity", 0.4);
            } else {
              map.setPaintProperty(id, "fill-color", C_LAND);
              map.setPaintProperty(id, "fill-opacity", 0.92);
            }
            continue;
          }
          if (type === "line") {
            const isBoundary = /admin|boundary|country|state/i.test(id);
            const isWaterLine = /water|river|stream|coast/i.test(id);
            if (isBoundary) {
              map.setPaintProperty(id, "line-color", C_BORDER);
              map.setPaintProperty(id, "line-width", 0.7);
              map.setPaintProperty(id, "line-opacity", 1);
            } else if (isWaterLine) {
              map.setPaintProperty(id, "line-color", "rgba(255,255,255,0.10)");
            } else {
              map.setPaintProperty(id, "line-color", C_ROAD);
              map.setPaintProperty(id, "line-opacity", 0.6);
            }
            continue;
          }
          if (type === "symbol") {
            map.setPaintProperty(id, "text-color", C_LABEL);
            map.setPaintProperty(id, "text-halo-color", C_HALO);
            map.setPaintProperty(id, "text-halo-width", 1.2);

            // Hide the duplicate OSM labels for the two locations we
            // render ourselves. Singapore is a city-state, so it appears
            // both as a city label AND a country label — we filter
            // ALL place / poi / country layers to catch every variant.
            // Continent / ocean / sea labels are still left alone so the
            // surrounding cartography (Indonesia, Papua New Guinea,
            // Malaysia, etc.) keeps showing.
            if (/place|poi|city|town|country/i.test(id) && !/continent|ocean|sea/i.test(id)) {
              try {
                const existing = map.getFilter(id);
                const notDuplicate = [
                  "!",
                  [
                    "in",
                    ["coalesce", ["get", "name:latin"], ["get", "name"], ""],
                    ["literal", ["Singapore", "Port Moresby"]],
                  ],
                ] as unknown as maplibregl.FilterSpecification;

                const merged = existing
                  ? (["all", existing, notDuplicate] as unknown as maplibregl.FilterSpecification)
                  : notDuplicate;
                map.setFilter(id, merged);
              } catch {
                // some layers reject filter changes — ignore
              }
            }
          }
        } catch {
          // some layers don't accept certain paint keys — ignore quietly
        }
      }

      // Great-circle route Singapore → Port Moresby
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: greatCircle(SINGAPORE, PORT_MORESBY, 64),
          },
        },
      });
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: { "line-cap": "round" },
        paint: {
          "line-color": C_AMBER,
          "line-width": 1.6,
          "line-dasharray": [0.7, 1.7],
          "line-opacity": 0.9,
        },
      });

      // Markers
      new maplibregl.Marker({ element: makeMarker("SINGAPORE", "HQ · 1.35° N", "below") })
        .setLngLat(SINGAPORE)
        .addTo(map);

      new maplibregl.Marker({ element: makeMarker("PORT MORESBY", "OPERATIONS · 9.44° S", "left") })
        .setLngLat(PORT_MORESBY)
        .addTo(map);

      // Frame both markers
      const bounds = new maplibregl.LngLatBounds()
        .extend(SINGAPORE)
        .extend(PORT_MORESBY);
      map.fitBounds(bounds, { padding: 90, maxZoom: 5, duration: 0 });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-deep-navy",
        "aspect-[16/10] min-h-[340px]",
        className,
      )}
      role="img"
      aria-label="Map of Southeast Asia and the Pacific showing Forex Drilling Singapore headquarters and Papua New Guinea operations"
    />
  );
}

/**
 * Build a brand-styled marker as a real DOM tree (no innerHTML, no
 * template strings injected into the document) so the security hook
 * stays happy and we get type-safe element creation.
 */
function makeMarker(
  title: string,
  sub: string,
  labelAt: "below" | "left",
): HTMLElement {
  const root = document.createElement("div");
  root.style.position = "relative";
  root.style.width = "0";
  root.style.height = "0";
  root.style.pointerEvents = "none";

  const pulses = document.createElement("div");
  pulses.style.position = "absolute";
  pulses.style.left = "0";
  pulses.style.top = "0";
  pulses.style.transform = "translate(-50%, -50%)";
  pulses.style.width = "36px";
  pulses.style.height = "36px";
  pulses.style.borderRadius = "9999px";
  pulses.style.background = "rgba(227,170,0,0.18)";

  const ring = document.createElement("div");
  ring.style.position = "absolute";
  ring.style.left = "0";
  ring.style.top = "0";
  ring.style.transform = "translate(-50%, -50%)";
  ring.style.width = "18px";
  ring.style.height = "18px";
  ring.style.borderRadius = "9999px";
  ring.style.background = "rgba(227,170,0,0.34)";

  const dot = document.createElement("div");
  dot.style.position = "absolute";
  dot.style.left = "0";
  dot.style.top = "0";
  dot.style.transform = "translate(-50%, -50%)";
  dot.style.width = "10px";
  dot.style.height = "10px";
  dot.style.borderRadius = "9999px";
  dot.style.background = C_AMBER;
  dot.style.border = "1.5px solid #FFFFFF";
  dot.style.boxShadow = "0 1px 4px rgba(0,0,0,0.35)";

  const label = document.createElement("div");
  label.style.position = "absolute";
  label.style.left = "0";
  label.style.top = "0";
  if (labelAt === "below") {
    // Offset further down so it clears any OSM city label that may still
    // render at the marker position despite our filter.
    label.style.transform = "translate(-50%, 26px)";
    label.style.textAlign = "center";
  } else {
    label.style.transform = "translate(calc(-100% - 22px), -50%)";
    label.style.textAlign = "right";
  }
  label.style.fontFamily = "ui-monospace, SFMono-Regular, Menlo, monospace";
  label.style.lineHeight = "1.3";
  label.style.whiteSpace = "nowrap";
  label.style.pointerEvents = "none";

  const titleEl = document.createElement("div");
  titleEl.style.fontSize = "10px";
  titleEl.style.letterSpacing = "0.14em";
  titleEl.style.fontWeight = "700";
  titleEl.style.color = C_AMBER;
  titleEl.textContent = title;

  const subEl = document.createElement("div");
  subEl.style.fontSize = "9px";
  subEl.style.letterSpacing = "0.12em";
  subEl.style.color = "rgba(255,255,255,0.78)";
  subEl.style.textShadow = `0 0 6px ${C_HALO}, 0 0 6px ${C_HALO}`;
  subEl.textContent = sub;

  label.appendChild(titleEl);
  label.appendChild(subEl);

  root.appendChild(pulses);
  root.appendChild(ring);
  root.appendChild(dot);
  root.appendChild(label);
  return root;
}

/**
 * Sample N points along the great-circle path between two lon/lat pairs.
 * Spherical interpolation (slerp on the unit sphere) so the line curves
 * correctly across the projection.
 */
function greatCircle(
  a: [number, number],
  b: [number, number],
  steps: number,
): [number, number][] {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;

  const lon1 = toRad(a[0]);
  const lat1 = toRad(a[1]);
  const lon2 = toRad(b[0]);
  const lat2 = toRad(b[1]);

  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((lat2 - lat1) / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2,
      ),
    );

  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    if (d === 0) {
      points.push([a[0], a[1]]);
      continue;
    }
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
    const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
    const lon = Math.atan2(y, x);
    points.push([toDeg(lon), toDeg(lat)]);
  }
  return points;
}
