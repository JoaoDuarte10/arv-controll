export interface FinishSchedule {
  execute: (params: Input) => Promise<void>;
}

type Input = {
  id_user: string;
  id: string;
};
