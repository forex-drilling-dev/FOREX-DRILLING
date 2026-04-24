import { MarqueeBanner } from "./MarqueeBanner";

const items = [
  "DIAMOND DRILLING",
  "SONIC DRILLING",
  "DIRECTIONAL DRILLING",
  "RC DRILLING",
  "INSTRUMENTATION",
  "MWD",
  "KRUX DATA SYSTEMS",
  "GEOPHYSICAL LOGGING",
  "PUMPING & PACKER TESTING",
  "SPT & PUSH TUBE",
];

export function TrustBar() {
  return <MarqueeBanner items={items} />;
}
