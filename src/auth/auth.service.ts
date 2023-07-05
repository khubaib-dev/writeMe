import { Injectable, Inject } from '@nestjs/common'
import axios, {AxiosRequestConfig} from 'axios'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from './constants'

@Injectable()
export class AuthService {

  // constructor(@Inject(JwtService) private readonly jwtService: JwtService) {
    
  // }
  

  async login(user)
  {
    const apiKey = process.env.A_MEMBER_KEY;
    const login = user.username;
    const password = user.password;

    const payload = {
      params: {
      _key: apiKey,
      login: login,
      pass: password
    }}

    try {
      const response = await axios.get(`https://backend.writeme.ai/amember/api/check-access/by-login-pass`,payload)
      response.data.access_token='token will here'
      return response.data
      // const token = { sub: response.data.user_id,
      //    username: response.data.login };
      // return {
      //   access_token: await this.jwtService.signAsync(token),
      // };
    } catch (error) {
      console.log(`Error is: ${error}`)
    }
  }


}
