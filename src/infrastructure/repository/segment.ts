import { ISegment, SegmentRepository } from '../../domain/repository';
import { database } from '../database/index';

export class SegmentRepositoryMongo implements SegmentRepository {
  async findByName(input: {
    idusers: number;
    segment: string;
  }): Promise<ISegment | ISegment[]> {
    const sql = {
      text: 'SELECT * FROM segments WHERE idusers = $1 AND name = LIKE "%$2%"',
      values: [input.idusers, `%${input.segment}%`],
    };
    const { rows } = await database.query(sql.text, sql.values);
    return rows[0];
  }

  async find(idusers: number): Promise<ISegment[]> {
    const { rows } = await database.query(
      'SELECT * FROM segments WHERE idusers = $1 ORDER BY name',
      [idusers],
    );
    return rows;
  }

  async create(input: { idusers: number; segment: string }): Promise<void> {
    const sql = {
      text: 'INSERT INTO segments(idusers, name) VALUES($1, $2)',
      values: [input.idusers, input.segment],
    };
    await database.query(sql.text, sql.values);
  }

  async update(input: {
    idsegments: number;
    idusers: number;
    segment: string;
  }): Promise<void> {
    const sql = {
      text: 'UPDATE segments SET name = $1 WHERE idusers = $2 AND idsegments = $3',
      values: [input.segment, input.idusers, input.idsegments],
    };
    await database.query(sql.text, sql.values);
  }

  async delete(input: { idusers: number; idsegments: number }): Promise<void> {
    const sql = {
      text: 'DELETE FROM segments WHERE idusers = $1 AND idsegments = $2',
      values: [input.idusers, input.idsegments],
    };
    await database.query(sql.text, sql.values);
  }
}
