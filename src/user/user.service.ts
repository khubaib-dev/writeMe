import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'
import axios, {AxiosRequestConfig} from 'axios'

@Injectable()
export class UserService {
  private readonly aMemberAPI: string;  

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.aMemberAPI = process.env.A_MEMBER_KEY;
  }

  async create(user: User) {
    return this.userRepository.save(user);
  }

  async createAMemberUser(user)
      {
        const url = 'https://backend.writeme.ai/amember/api/users';
        const postData = {
          _key: this.aMemberAPI,
          email: user.email,
          name_f: user.first_name,
          name_l: user.last_name,
          pass: user.password
        };
        
        const headers: AxiosRequestConfig['headers'] = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };

        try {
          const response = await axios.post(url, postData, { headers });
          return response;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id) {
    try
    {
      return this.userRepository.find({
        where: {
          id
        }
    })
    }
    catch(err)
    {
      console.log(err)
    }
    
  }


  async update(id,user) {
    await this.userRepository.update(id,user)
    return  await this.userRepository.find({
      where: {
        id
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
