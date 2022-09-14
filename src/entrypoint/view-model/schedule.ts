export type CreateScheduleViewModel = {
  id_user: string;
  client: string;
  procedure: string;
  date: string;
  time: string;
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
  phone?: string;
  pacote?: boolean;
  qtdTotalAtendimento?: number;
  qtdAtendimento: number;
};

export type ScheduleViewModel = {
  id?: string;
  id_user: string;
  client: string;
  procedure: string;
  date: string;
  time: string;
  phone?: string;
  isDefeated?: boolean;
  pacote?: boolean;
  qtdAtendimento?: number;
  qtdTotalAtendimento?: number;
};
