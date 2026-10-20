
import type { QuizOption } from "@/components/QuizSelector/types";

export type EmojiAquariumProps = {
  options: QuizOption[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  disabled?: boolean;
};
