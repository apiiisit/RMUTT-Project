import { Events } from './event';

export interface DetailEvent {
  error: boolean;
  data: DetailEvents;
}

export interface DetailEvents {
  events: Events[];
  scans: Scan[];
}

export interface Scan {
  id: number;
  eventid: number;
  scanedAt: string;
  studentId: string;
}
