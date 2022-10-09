interface ISegment {
  idsegments: number;
  idusers: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface SegmentRepository {
  find(idusers: number): Promise<ISegment[]>;
  findByName(input: {
    idusers: number;
    segment: string;
  }): Promise<ISegment | ISegment[]>;
  create(input: { idusers: number; segment: string }): Promise<void>;
  update(input: {
    idsegments: number;
    idusers: number;
    segment: string;
  }): Promise<void>;
  delete(input: { idusers: number; idsegments: number }): Promise<void>;
}

export { ISegment, SegmentRepository };
