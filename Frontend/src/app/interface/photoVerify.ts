export interface PhotoVerify {
  error: boolean;
  data: PhotoVerifys[];
}

export interface PhotoVerifys {
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
  tag: string;
  verify: boolean;
  failreason?: any;
  updatedAt: string;
}