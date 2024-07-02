import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { NextFunction, Request, Response } from "express"
import { container } from "tsyringe";
export const authRoles = (allowedRoles: string[]) => {
    
    return async function(req: Request, res: Response, next: NextFunction ) {     
        const usersRepository: IUsersRepository = await container.resolve("UsersRepository");
        const userId = req.user.id;
        try {
            const user = await usersRepository.findUserById(userId);
            if(!user) throw new AppError("User invalid or don't exists");
            //check if user have permission.
            if(!allowedRoles.includes(user.role)) {
                throw new AppError(`Permissão negada, sua função registrada: ${user.role} não tem acessa a essa funcionalidade :/ Apenas: ${allowedRoles}. É possível trocar no seu perfil.`);
            }
            
            next()
        } catch (error) {
           next(error) 
        }
       

        
    }
}