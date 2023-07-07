import { Injectable, Inject } from '@nestjs/common'
import axios, {AxiosRequestConfig} from 'axios'
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants'
import { UserService } from '../user/user.service'


@Injectable()
export class AuthService {
  
  constructor(
    private jwtService: JwtService,
    private userService: UserService
    ) {}
    
    
    async login(user)
    {
    const apiKey = process.env.A_MEMBER_KEY;
    const login = user.username;
    const password = user.password;
    const email = user.email;

    const payload = {
      params: {
      _key: apiKey,
      // email: email
      login: login,
      pass: password
    }}

    try {
      // const response = await axios.get(`https://backend.writeme.ai/amember/api/check-access/by-email`,payload)
      const response = await axios.get(`https://backend.writeme.ai/amember/api/check-access/by-login-pass`,payload)
      if(response.data.ok)
      { 
        const dbUser = this.userService.getUserByEmail(response.data.email)
        
        const userId = response.data.user_id

        const payload = { userId };
        try
        {
          const token = this.jwtService.signAsync(payload)
          console.log(`Token is: ${token}`)
        }
        catch(err)
        {
          console.log(`Token error ${err}`) 
        }

        // const tokenPayload = { sub: 8, username: 'khubaib_dev' };

        // try{
        //   const token =  await this.jwtService.signAsync(tokenPayload)
        //   console.log(`token is: ${token}`)
        // } catch (err) {
        //   console.log(`Token error ${err}`)
        // }

        // return {
        //   access_token: await this.jwtService.signAsync(tokenPayload),
        // }
          // response.data.access_token = 'access_token'
      }
      return response.data
      
    } catch (error) {
      console.log(`Error is: ${error}`)
    }
  }


}
