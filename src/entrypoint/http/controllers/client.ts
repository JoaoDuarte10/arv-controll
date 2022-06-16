// import 'module-alias/register';
import { ClientUseCase } from '@domain/usecases/client';
import { Request, Response } from 'express';

class ClientController {
  constructor(private clientUseCase: ClientUseCase) {}

  async newClient(req: Request, res: Response): Promise<Response> {
    const { id_user, name, email, phone, segment } = req.body;

    if (!name || !phone) {
      return res.status(200).json({
        type: 'inputs_invalids',
        message: 'Invalids parameters',
      });
    }

    if (
      phone.replace('_', '').toString().length < 16 &&
      phone.replace('_', '').toString().length > 1
    ) {
      return res.status(200).json({
        type: 'inputs_invalids',
        message: 'invalids_inputs',
      });
    }

    try {
      await this.clientUseCase.newClient({
        id_user,
        name,
        email,
        phone,
        segment,
      });

      return res.status(200).json({
        type: 'success',
        message: 'Cliente registrado com sucesso!',
      });
    } catch (error) {
      return res.status(200).json({
        type: 'error',
        message: error.message,
      });
    }
  }

  async updateClient(req: Request, res: Response): Promise<Response> {
    const { id_user, id, name, email, phone, segment } = req.body;

    if (!name || !phone) {
      return res.status(200).json({
        type: 'inputs_invalids',
        message: 'Invalids parameters',
      });
    }
    try {
      await this.clientUseCase.updateClient({
        id_user,
        id,
        name,
        email,
        phone,
        segment,
      });
      return res.status(200).json({
        type: 'success',
        message: 'Cliente atualizado com sucesso!',
      });
    } catch (error) {
      return res.status(200).json({
        type: 'error',
        message: error.message,
      });
    }
  }

  async findAllClients(req: Request, res: Response): Promise<Response> {
    const { id_user } = req.body;
    try {
      const findAll = await this.clientUseCase.findAllClients(id_user);
      return res.status(200).json(findAll);
    } catch (error) {
      return res.status(200).json({
        type: 'error',
        message: error.message,
      });
    }
  }

  async findClient(req: Request, res: Response): Promise<Response> {
    const { id_user, id } = req.body;
    try {
      const findClient = await this.clientUseCase.findClient(id_user, id);
      return res.status(200).json(findClient);
    } catch (error) {
      return res.status(200).json({
        type: 'error',
        message: error.message,
      });
    }
  }

  async findClientBySegment(req: Request, res: Response): Promise<Response> {
    const { id_user, segment } = req.body;
    try {
      const findClient = await this.clientUseCase.findBySegment(
        id_user,
        segment,
      );
      return res.status(200).json(findClient);
    } catch (error) {
      return res.status(200).json({
        type: 'error',
        message: error.message,
      });
    }
  }

  async deleteClient(req: Request, res: Response): Promise<Response> {
    const { id_user, id } = req.body;
    try {
      await this.clientUseCase.deleteClient(id_user, id);
      return res.status(200).json({
        type: 'success',
        message: 'Cliente deletado com sucesso',
      });
    } catch (error) {
      return res.status(200).json({
        type: 'error',
        message: error.message,
      });
    }
  }
}

export { ClientController };
