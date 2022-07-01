import { ClientRepository, IClient } from '../../domain/repository';
import { Client } from '../models';

class ClientRepositoryMongo implements ClientRepository {
  async create({
    id_user,
    name,
    email,
    phone,
    segment,
  }: IClient): Promise<void> {
    const client = new Client({
      id_user: id_user,
      name: name,
      email: email,
      phone: phone,
      segment: segment,
    });

    await client.save();
  }

  async update({
    id_user,
    id,
    name,
    email,
    phone,
    segment,
  }: IClient): Promise<void> {
    const findClient = await Client.findOne({ id_user: id_user, _id: id });
    const updateClient = await findClient.updateOne({
      id_user: id_user,
      name: name,
      email: email,
      phone: phone,
      segment: segment,
    });
    return updateClient;
  }

  async findAll(id_user: string): Promise<IClient[]> {
    const findAll = await Client.find({ id_user: id_user }).sort({ name: 1 });

    return findAll.map((item) => {
      const { _id, id_user, name, email, phone, segment } = item;
      return Object.assign(
        {},
        {
          id: _id as any,
          id_user,
          name,
          email,
          phone,
          segment,
        },
      );
    });
  }

  async find(idUser: string, id: string): Promise<IClient> {
    const findClient = await Client.findOne({ id_user: idUser, _id: id });

    const { _id, id_user, name, email, phone, segment } = findClient;
    return Object.assign(
      {},
      {
        id: _id as any,
        id_user,
        name,
        email,
        phone,
        segment,
      },
    );
  }

  async findByEmail(idUser: string, emailUser: string): Promise<IClient> {
    const findByEmail = await Client.findOne({
      id_user: idUser,
      email: emailUser,
    });

    const { _id, id_user, name, email, phone, segment } = findByEmail;
    return Object.assign(
      {},
      {
        id: _id as any,
        id_user,
        name,
        email,
        phone,
        segment,
      },
    );
  }

  async findByName(idUser: string, userName: string): Promise<IClient> {
    const findByName = await Client.findOne({
      id_user: idUser,
      name: userName,
    });

    const { _id, id_user, name, email, phone, segment } = findByName;
    return Object.assign(
      {},
      {
        id: _id as any,
        id_user,
        name,
        email,
        phone,
        segment,
      },
    );
  }

  async findBySegment(id_user: string, segment: string): Promise<IClient[]> {
    const findBySegment = await Client.find({
      id_user: id_user,
      segment: segment,
    });

    return findBySegment.map((item) => {
      const { _id, id_user, name, email, phone, segment } = item;
      return Object.assign(
        {},
        {
          id: _id as any,
          id_user,
          name,
          email,
          phone,
          segment,
        },
      );
    }) as any;
  }

  async delete(id_user: string, id: string): Promise<void> {
    const findClient = await Client.findOne({ id_user: id_user, _id: id });
    await findClient.delete();
  }
}

export { ClientRepositoryMongo };
