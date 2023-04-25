export interface Pointi {
  error: boolean;
  data: Points;
}

export interface Points {
  events: Events;
  list: List[];
}

interface List {
  id: string;
  prefixname: string;
  name: string;
  faculty: string;
  scans: any[];
  passed: boolean;
}

interface Events {
  name: string;
  points: Point[];
}

interface Point {
  pointid: number;
  name: string;
}