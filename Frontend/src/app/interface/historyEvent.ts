export interface HistoryEvent {
  error: boolean;
  data: HistoryEvents[];
}

export interface HistoryEvents {
  id: string;
  name: string;
  faculty: string;
  scanedAt?: any;
}