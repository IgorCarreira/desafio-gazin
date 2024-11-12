import { Level } from "./level";

export interface Developer {
  id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
  hobby: string;
  nivel: Level;
}

export interface DeveloperBodyRequest {
  nome?: string;
  sexo?: string;
  data_nascimento?: string;
  idade?: number;
  hobby?: string;
  nivel_id?: number;
}

export interface DeveloperFilterRequest {
  id?: number | null;
  nome?: string | null;
  nivel_id?: number | null;
}
