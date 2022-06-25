export interface CreateSchedule {
  execute: (params: Input) => Promise<void>;
}

type Input = {
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
