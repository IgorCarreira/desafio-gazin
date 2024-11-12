export interface Level {
  id: number;
  nivel: string;
  quantidade_desenvolvedores: number;
}

export interface LevelFilterRequest {
  id?: number | null;
  nivel?: string | null;
}

export interface LevelBodyRequest {
  nivel?: string;
}
