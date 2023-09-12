import { AuthCredentialsDto } from './../tasks/dto/auth-credential.dto';
import { User } from './user.entity';
import { CustomRepository } from "src/tasks/typeorm-ex.decorator";
import { Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(authCredentialDto: AuthCredentialsDto): Promise<void>{
        const {username, password} = authCredentialDto;

        const user = this.create({
            username,
            password,
        });

        try{
            await this.save(user);
        }catch(error){

            if(error.code === '23505'){
                throw new ConflictException('Username already exists')
            }else{
                throw new InternalServerErrorException();
            }
        }
        
    }




}