import { Injectable } from '@nestjs/common';

export type User = {
    id: number,
    email: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
};

const theUser: User = {
    id: 1,
    email: 'user@test.com',
    name: 'Tuser',
    createdAt: new Date(),
    updatedAt: new Date(),
}

@Injectable()
export class UsersService {
    async findOne(email: string): Promise<User | undefined> {
        return theUser;
      }
}
