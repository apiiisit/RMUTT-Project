export interface Doc {
  error: boolean;
  data: Docs[];
}

export interface Docs {
  id: number;
  name: string;
}