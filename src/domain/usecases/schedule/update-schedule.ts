export interface UpdateSchedule {
  execute: (params: Input) => Promise<void>;
}

type Input = {
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
  qtdAtendimento?: number;
};
