import { useState } from "react";
import Animals from "@/data/animais.json";
import Cars from "@/data/carros.json";
import Disney from "@/data/disney.json";
import FamousWorldwide from "@/data/famosos_mundiais.json";
import Movies from "@/data/filmes.json";
import Fruits from "@/data/frutas.json";
import HarryPotter from "@/data/harry_potter.json";
import IA from "@/data/ia.json";
import Books from "@/data/livros.json";
import Brands from "@/data/marcas.json";
import Objects from "@/data/objetos.json";
import Pokemons from "@/data/pokemons.json";
import Pokemons2 from "@/data/pokemons2.json";
import Pokemons3 from "@/data/pokemons3.json";
import Pokemons4 from "@/data/pokemons4.json";
import Pokemons5 from "@/data/pokemons5.json";
import Pokemons6 from "@/data/pokemons6.json";
import Pokemons7 from "@/data/pokemons7.json";
import Pokemons8 from "@/data/pokemons8.json";
import Pokemons9 from "@/data/pokemons9.json";
import Professions from "@/data/profissoes.json";

export interface Item {
  name: string;
  difficulty: "easy" | "medium" | "hard";
  minAge: number;
  maxAge: number;
}

export interface CategoryOptions {
  key: string;
  emoji: string;
  name: string;
  items: Item[];
  image?: string;
  background?: string;
}

export const categories: CategoryOptions[] = [
  IA as CategoryOptions,
  Fruits as CategoryOptions,
  Animals as CategoryOptions,
  Objects as CategoryOptions,
  Disney as CategoryOptions,
  Brands as CategoryOptions,
  FamousWorldwide as CategoryOptions,
  Professions as CategoryOptions,
  Movies as CategoryOptions,
  Cars as CategoryOptions,
  HarryPotter as CategoryOptions,
  Books as CategoryOptions,
  Pokemons as CategoryOptions,
  Pokemons2 as CategoryOptions,
  Pokemons3 as CategoryOptions,
  Pokemons4 as CategoryOptions,
  Pokemons5 as CategoryOptions,
  Pokemons6 as CategoryOptions,
  Pokemons7 as CategoryOptions,
  Pokemons8 as CategoryOptions,
  Pokemons9 as CategoryOptions,
];

export function useCategoryOptions(category: string, difficulty: string) {
  const [options, setOptions] = useState([]);

  const getNextOption = (): string | null => {
    if (options.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * options.length);
    const nextOption = options[randomIndex];

    setOptions((prev) => prev.filter((_, index) => index !== randomIndex));

    return nextOption.name;
  };

  const resetRound = () => {
    const checkDifficulty = (i: Item) => {
      switch (difficulty) {
        case "easy":
          return i.difficulty === "easy";
        case "medium":
          return i.difficulty === "easy" || i.difficulty === "medium";
        default:
          return true;
      }
    };

    setOptions([
      ...categories
        .find((c) => c.key === category)
        .items.filter((i) => checkDifficulty(i)),
    ]);
  };

  return {
    options,
    getNextOption,
    resetRound,
  };
}
