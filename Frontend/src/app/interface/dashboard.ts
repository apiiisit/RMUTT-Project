export interface Dashboard {
  error: boolean;
  data: Dashboards;
}

export interface Dashboards {
  students: number;
  photonoload: number;
  photoupload: number;
  photoverify: number;
  filesuploaded: number;
  filesverify: number;
  filesunverify: number;
}