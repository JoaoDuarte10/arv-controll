export type CreateScheduleModel = {
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

export type UpdateScheduleModel = {
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

export type ScheduleOutput = {
  id?: string;
  id_user: string;
  idSchedule?: string;
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
