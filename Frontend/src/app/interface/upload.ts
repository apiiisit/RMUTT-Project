export interface Upload {
  error: boolean;
  data: Uploads;
}

export interface Uploads {
  task: Task[];
}

export interface Task {
  id: number;
  name: string;
  files: any[];
}