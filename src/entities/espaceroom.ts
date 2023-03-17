export type EscapeRoom = {
  id: string;
  name: string;
  players: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  theme: string;
  description?: string;
  images?: string[];
};
