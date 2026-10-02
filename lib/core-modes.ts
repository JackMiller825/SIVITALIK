import { assets } from "@/lib/assets";

export const CORE_MODES = [
  {
    id: "intelligence",
    label: "Intelligence",
    copy: "A visual exploration of intelligence beyond familiar limits.",
    image: assets.intelligence,
    alt: "A luminous neural brain with a crystalline computing core, ringed by orbiting nodes.",
  },
  {
    id: "ethereum",
    label: "Ethereum",
    copy: "Rooted in Ethereum culture and the language of decentralized networks.",
    image: assets.ethereum,
    alt: "A faceted Ethereum crystal surrounded by smaller connected blocks in orbit.",
  },
  {
    id: "humanity",
    label: "Humanity",
    copy: "Human imagination meets the possibilities of machine intelligence.",
    image: assets.humanity,
    alt: "A human hand and a robotic hand meeting at a bright spark.",
  },
  {
    id: "community",
    label: "Community",
    copy: "Individual voices shaping a shared identity.",
    image: assets.community,
    alt: "A connected globe circled by abstract human figures.",
  },
] as const;

export type CoreMode = (typeof CORE_MODES)[number]["id"];
