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
