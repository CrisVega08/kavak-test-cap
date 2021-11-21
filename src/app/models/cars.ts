export interface Car {
  id: number;
  category: string;
  info: {
    name: string;
    description?: string;
    location?: string;
    basic?: string;
  };
  iconUrl?: string;
}
