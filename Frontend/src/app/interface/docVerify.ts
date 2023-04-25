export interface DocVerify {
  error: boolean;
  data: DocVerifys[];
}

export interface DocVerifys {
  documents: Documents;
  id: number;
  path: string;
  students: Students;
}

interface Students {
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
  photo?: string;
  tag: string;
  verify: boolean;
  failreason?: any;
  updatedAt: string;
}

interface Documents {
  id: number;
  name: string;
}