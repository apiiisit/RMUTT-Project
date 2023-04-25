export interface Event {
  error: boolean;
  data: Events[];
}

export interface Events {
  eventid: number;
  name: string;
}