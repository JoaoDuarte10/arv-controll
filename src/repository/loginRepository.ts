interface ILogin {
    _id?: string,
    user: string, 
    password: string
}

interface LoginRepository {
    findLogin({user, password}: ILogin): Promise<ILogin>
}

export { ILogin, LoginRepository }