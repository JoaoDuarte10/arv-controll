/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientRepository, IClient } from '../../domain/repository';
import { database } from '../database/index';

export class ClientRepositoryMongo implements ClientRepository {
  async create({
    idusers,
    name,
    email,
    phone,
    idsegments,
  }: any): Promise<void> {
    const sql = {
      text: `INSERT INTO clients(
        idusers,
        name,
        email,
        phone,
        idsegments
      ) VALUES(
        $1, $2, $3, $4, $5
      )`,
      values: [idusers, name, email, phone, idsegments],
    };

    await database.query(sql.text, sql.values);
  }

  async update({
    idusers,
    idclients,
    name,
    email,
    phone,
    idsegments,
  }: any): Promise<void> {
    const sql = {
      text: 'UPDATE clients SET name = $1, email = $2, phone = $3, idsegments = $4 WHERE idclients = $5 AND idusers = $6',
      values: [name, email, phone, idsegments, idclients, idusers],
    };

    await database.query(sql.text, sql.values);
  }

  async findAll(idusers: number): Promise<IClient[]> {
    const sql = {
      text: `SELECT
          c.idclients,
          s.name AS segment,
          c.name,
          c.email,
          c.phone,
          c.created_at,
          c.updated_at
        FROM clients c 
          LEFT JOIN segments s ON c.idsegments = s.idsegments
        WHERE c.idusers = $1
        ORDER BY name`,
      values: [idusers],
    };
    const { rows } = await database.query(sql.text, sql.values);

    return rows;
  }

  async find(idusers: number, idclients: number): Promise<IClient | any> {
    const sql = {
      text: `SELECT
          c.idclients,
          s.name AS segment,
          c.name,
          c.email,
          c.phone,
          c.created_at,
          c.updated_at
        FROM clients c 
          LEFT JOIN segments s ON c.idsegments = s.idsegments
        WHERE c.idusers = $1 AND c.idclients = $2`,
      values: [idusers, idclients],
    };

    const { rows } = await database.query(sql.text, sql.values);

    return rows[0];
  }

  async findByEmail(idusers: number, email: string): Promise<IClient | any> {
    const sql = {
      text: `SELECT
          c.idclients,
          s.name AS segment,
          c.name,
          c.email,
          c.phone,
          c.created_at,
          c.updated_at
        FROM clients c 
          LEFT JOIN segments s ON c.idsegments = s.idsegments
        WHERE c.idusers = $1 AND c.email = $2`,
      values: [idusers, email],
    };

    const { rows } = await database.query(sql.text, sql.values);

    return rows[0];
  }

  async findByName(idusers: number, name: string): Promise<IClient | any> {
    const sql = {
      text: `SELECT
          c.idclients,
          s.name AS segment,
          c.name,
          c.email,
          c.phone,
          c.created_at,
          c.updated_at
        FROM clients c 
          LEFT JOIN segments s ON c.idsegments = s.idsegments
        WHERE c.idusers = $1 AND c.name = $2`,
      values: [idusers, name],
    };

    const { rows } = await database.query(sql.text, sql.values);

    return rows[0];
  }

  async findBySegment(
    idusers: number,
    idsegments: number,
  ): Promise<IClient[] | any> {
    const sql = {
      text: `SELECT
          c.idclients,
          s.name AS segment,
          c.name,
          c.email,
          c.phone,
          c.created_at,
          c.updated_at
        FROM clients c 
          LEFT JOIN segments s ON s.idsegments = c.idsegments
        WHERE c.idusers = $1 AND c.idsegments = $2
        ORDER BY name`,
      values: [idusers, idsegments],
    };

    const { rows } = await database.query(sql.text, sql.values);

    return rows;
  }

  async delete(idusers: number, idclients: number): Promise<void> {
    await database.query(
      'DELETE FROM clients WHERE idusers = $1 AND idclients = $2',
      [idusers, idclients],
    );
  }
}
