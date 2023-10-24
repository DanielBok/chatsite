export type EventType = "bali" | "singapore" | "pre-wedding"

export const PageSetup: {
  key: EventType
  path: EventType
  className: string
  desc: string
}[] = [
  {key: "bali", path: "bali", className: "btn-primary", desc: "Bali"},
  {key: "singapore", path: "singapore", className: "btn-secondary", desc: "Singapore"},
  {key: "pre-wedding", path: "pre-wedding", className: "btn-accent", desc: "Pre-Wedding"}
];
