import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private users: any[] = [];

  login(email: string) {
    // check if user already exists
    let user = this.users.find(u => u.email === email);

    if (!user) {
      user = {
        id: Date.now(),
        email: email,
      };
      this.users.push(user);
    }

    return {
      message: 'Login successful',
      user,
      token: 'mock-jwt-token',
    };
  }

  getUsers() {
    return this.users;
  }
}