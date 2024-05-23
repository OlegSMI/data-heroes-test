export type CharacterIndex = number | Array<number>;
export type Status = "Alive" | "Dead" | "unknown";
export type Gender = "Male" | "Female" | "Genderless" | null;

export interface ICharacter {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: {
    name: "unknown";
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}
