export interface EventScan {
  error: boolean;
  errlvl: number;
  data: EventScans[];
}

export interface EventScans {
  id: string;
  prefixname: string;
  name: string;
  row: number;
  rowfaculty: number;
  faculty: string;
  degree: string;
  honor: number;
  award: string;
  year: string;
  photo: string;
  atk: string;
  tag: string;
  verify: boolean;
  failreason?: any;
  updatedAt: string;
  scans: any[];
  passed: boolean;
}