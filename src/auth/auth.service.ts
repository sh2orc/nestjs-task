import { AuthCredentialsDto } from './../tasks/dto/auth-credential.dto';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
    ){}

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void>{
        this.usersRepository.createUser(authCredentialDto);
    }

}
