export interface Pokemon {
    name: string;
    id: number; // O el tipo correcto para el ID del Pokémon
    types: { type: { name: string } }[]; // Estructura de tipos de Pokémon
  }