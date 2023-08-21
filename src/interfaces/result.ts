export interface result {
  reading: string;
  listening: string;
  writing: string;
  speaking: string;
  overall_score?: string;
}

export interface resultSender {
  bookingId: number;
  name: string;
  surname: string;
  phone_number: string;
  reading: string;
  listening: string;
  writing: string;
  speaking: string;
  overall_score: string;
}
