import axios from 'axios';

export interface Place {
  id: number;
  display_name: string;
  lat: number;
  lon: number;
}

export const fetchLocation = async (query: string): Promise<Place[]> => {
  const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: {
      q: query,
      format: 'json',
      limit: 10,
    },
  });

  return data.map((place: any) => ({
    id: place.place_id,
    display_name: place.display_name,
    lat: parseFloat(place.lat),
    lon: parseFloat(place.lon),
  }));
};
