import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/tasks/dto/auth-credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
    
    @Post('/signup')
    signUp(
        @Body() authCredentialDto: AuthCredentialsDto
    ): Promise<void>{
        return this.authService.signUp(authCredentialDto);
    }   
}
