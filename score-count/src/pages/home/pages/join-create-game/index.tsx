import { useRootSelector } from "@/store";

export default function JoinCreateGamePage() {
  const name = useRootSelector(s => s.meta.name);
  return (
    <div>
      Hello: {name}. Join Or Create Game
    </div>
  );
}
