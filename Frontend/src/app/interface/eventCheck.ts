export interface EventCheck {
  error: boolean;
  data: EventChecks[];
}

export interface EventChecks {
  id: string;
  scans: any[];
  passed: boolean;
}