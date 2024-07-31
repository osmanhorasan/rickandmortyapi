

export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[]; 
    url: string;
    created: string; 
  }
  
  export async function fetchEpisode(id: number): Promise<Episode> {
    const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Episode = await res.json();
    return data;
  }
  