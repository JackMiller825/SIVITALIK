export const CORE_MODES = [
  {
    id: "intelligence",
    label: "Intelligence",
    copy: "A visual exploration of intelligence beyond familiar limits.",
  },
  {
    id: "ethereum",
    label: "Ethereum",
    copy: "Rooted in Ethereum culture and the language of decentralized networks.",
  },
  {
    id: "humanity",
    label: "Humanity",
    copy: "Human imagination meets the possibilities of machine intelligence.",
  },
  {
    id: "community",
    label: "Community",
    copy: "Individual voices shaping a shared identity.",
  },
] as const;

export type CoreMode = (typeof CORE_MODES)[number]["id"];
