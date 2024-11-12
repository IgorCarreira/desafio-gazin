export interface Level {
  id: number;
  nivel: string;
}

export interface LevelFilterRequest {
  id?: number | null;
  nivel?: string | null;
}

export interface LevelBodyRequest {
  nivel?: string;
}
