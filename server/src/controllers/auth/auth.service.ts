import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/mongo-modules/users.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(fields: { email: string; password: string }) {
    return this.userModel.create(fields);
  }

  find(where: { email: string }) {
    return this.userModel.findOne(where);
  }

  findById(where: { id: number }) {
    return this.userModel.findById({ _id: where.id });
  }
}
