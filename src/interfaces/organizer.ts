export interface organizer {
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  password?: string;
  balance?: string;
}

export interface orgTrial {
  account_type: string;
  trial_period: number;
  started_date?: Date;
  end_date?: Date;
  is_active: boolean;
}
