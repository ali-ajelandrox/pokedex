import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../pokemon.service';

interface Pokemon {
  name: string;
  id: number;
  sprite: string;
  types: string[];
  height: number;
  weight: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  filteredPokemonList: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  pokemonTypes: string[] = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 
    'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
  ];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getAllPokemon();
  }

  getAllPokemon() {
    this.pokemonService.getAllPokemon().subscribe(
      (data: any[]) => {
        this.pokemonList = data.map((pokemon, index) => ({
          name: pokemon.name,
          id: index + 1,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          types: [],
          height: 0,
          weight: 0
        }));
        this.filteredPokemonList = this.pokemonList;

        // Seleccionar automáticamente el Pokémon número 1
        if (this.pokemonList.length > 0) {
          this.selectPokemon(this.pokemonList[0].name);
        }
      },
      error => {
        console.error('Error fetching Pokemon list:', error);
      }
    );
  }

  searchPokemon(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.trim().toLowerCase();
  
    if (query) {
      const foundPokemon = this.pokemonList.find(pokemon =>
        pokemon.name.toLowerCase().includes(query) || pokemon.id.toString().includes(query)
      );
  
      if (foundPokemon) {
        this.selectPokemon(foundPokemon.name);
      } else {
        this.selectedPokemon = null;
      }
    } else {
      if (this.pokemonList.length > 0) {
        this.selectPokemon(this.pokemonList[0].name);
      } else {
        this.selectedPokemon = null;
      }
    }
  }
  

  filterByType(type: string) {
    this.filteredPokemonList = this.pokemonList.filter(pokemon =>
      pokemon.types.includes(type.toLowerCase())
    );
    if (this.filteredPokemonList.length > 0) {
      this.selectPokemon(this.filteredPokemonList[0].name);
    } else {
      this.selectedPokemon = null;
    }
  }

  selectPokemon(name: string) {
    this.pokemonService.getPokemon(name).subscribe(
      (data: any) => {
        this.selectedPokemon = this.mapPokemonData(data);
      },
      error => {
        console.error('Error fetching Pokemon:', error);
        this.selectedPokemon = null;
      }
    );
  }

  getPokemonTypes(types: any[]): string[] {
    return types.map(type => type.type.name);
  }

  private mapPokemonData(data: any): Pokemon {
    const heightM = data.height / 10;
    
    const weightKg = data.weight / 10;

    return {
      name: data.name,
      id: data.id,
      sprite: data.sprites.front_default,
      types: this.getPokemonTypes(data.types),
      height: heightM,
      weight: weightKg  
    };
  }
}
