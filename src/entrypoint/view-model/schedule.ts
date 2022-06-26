export type CreateScheduleViewModel = {
  id_user: string;
  client: string;
  procedure: string;
  date: string;
  time: string;
  price: string;
  phone?: string;
  pacote?: boolean;
  qtdTotalAtendimento?: number;
};

export type UpdateScheduleViewModel = {
  idSchedule: string;
  id_user: string;
  client: string;
  procedure: string;
  date: string;
  time: string;
  price: string;
  phone?: string;
  pacote?: boolean;
  qtdTotalAtendimento?: number;
  qtdAtendimento: number;
};

export type Schedule = {
  id?: string;
  id_user: string;
  client: string;
  procedure: string;
  date: string;
  time: string;
  price: string;
  phone?: string;
  isDefeated?: boolean;
  pacote?: boolean;
  qtdAtendimento?: number;
  qtdTotalAtendimento?: number;
};
