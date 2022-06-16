import { LoginUseCase } from '@domain/usecases/login';
import { Request, Response } from 'express';

class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}
  async findLogin(req: Request, res: Response): Promise<Response> {
    let { user } = req.body;
    const { password } = req.body;

    user = user.replace(' ', '');

    if (!user || !password) {
      return res.status(200).json({
        type: 'inputs_invalids',
        message: 'Invalid date',
      });
    }

    try {
      const userLogin = await this.loginUseCase.findLogin({ user, password });

      if (!userLogin) {
        return res.status(200).json({
          type: 'unauthorized',
          message: 'Invalid user or password',
        });
      }

      if (user === userLogin.user && password === userLogin.password) {
        return res.status(200).json({
          type: 'success',
          user: userLogin.user,
          user_id: userLogin._id,
        });
      }
    } catch (error) {
      return res.status(200).json({
        type: 'error',
        message: error.message,
      });
    }
  }
}

export { LoginController };
