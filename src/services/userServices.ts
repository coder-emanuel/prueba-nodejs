import { UserRepository } from "../repositories/userRepository";
import { inject,injectable } from "tsyringe";
import { User } from "../models/userTable";


@injectable()
export class UserService{
    constructor(@inject(UserRepository) private userRepository:UserRepository){}
    async getAllUsers(){
        return await this.userRepository.findAll()
    }

    async findUserById(id:number){
        try {
          return await this.userRepository.findById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async createUser(user:Partial<User>) {
        return await this.userRepository.createNewUser(user);
      }

      async updateUser(user: Partial<User>, id: number): Promise<User | null> {
        try {
          const affectedCount:any = await this.userRepository.updateUserById(user, id);
    
          if (affectedCount === 0) {
            console.log('No se encontró el usuario o no se realizaron cambios.');
            return null;
          }
    
          // Buscar el usuario actualizado para obtener los datos actualizados
          const updatedUser = await this.userRepository.findById(id);
          if (updatedUser) {
            console.log('Datos actualizados:', updatedUser.get({ plain: true }));
          }
          return updatedUser;
        } catch (error) {
          console.log(error);
          return null;
        }
      }

      async deleteByIdService(id:number){
        const wanted= await this.findUserById(id)
        if(wanted){
            await this.userRepository.deleteUserById(id)
            return wanted
        }else{
            return "usuario no encontrado no se puede eliminar"
        }
        
      }
}


