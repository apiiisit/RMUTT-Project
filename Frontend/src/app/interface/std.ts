export interface Std {
  error: boolean;
  data: Stds[];
}

export interface Stds {
  id: string;
  prefixname: string;
  name: string;
  row: number;
  rowfaculty: number;
  faculty: string;
  degree: string;
  honor?: number;
  award?: string;
  year: string;
  photo?: string;
  atk?: string;
  tag?: string;
  verify: boolean;
  failreason?: string;
  updatedAt: string;
  passed?: boolean;
}
