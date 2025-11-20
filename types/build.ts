export interface BuildInput {
  level: number;
  stats: {
    melee: number;
    defense: number;
    fruit: number;
    sword: number;
    gun: number;
  };
  equipped: {
    fruit: string;
    sword: string;
    accessories: string[];
  };
}