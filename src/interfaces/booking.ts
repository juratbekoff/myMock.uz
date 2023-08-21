export interface booking {
  organizerId: number;
  examId: number;
  name: string;
  surname?: string;
  phone_number: string;
  listening?: string;
  reading?: string;
  writing?: string;
  speaking?: string;
  overall_score?: string;
}
