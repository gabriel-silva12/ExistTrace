
export interface QuizOption {
  id: string;
  title?: string;
  subtitle?: string;
}

export interface QuizSelectorSingleProps {
  selectionMode: "single";
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export interface QuizSelectorMultipleProps {
  selectionMode: "multiple";
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
}

export type QuizSelectorProps = (
  | QuizSelectorSingleProps
  | QuizSelectorMultipleProps
) & {
  options: QuizOption[];
  fontSize?: number;
  maxSelections?: number;
};
