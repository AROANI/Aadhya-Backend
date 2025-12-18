import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonService } from '../person/person.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private personService: PersonService) {}

  async login(loginDto: LoginDto) {
    // 1. Find the person by phone number (Using the PersonService you just built!)
    // We need to add a "findByPhone" method to PersonService first (see step below)
    const allPeople = await this.personService.findAll();
    const person = allPeople.find((p) => p.phone === loginDto.phone);

    if (!person) {
      throw new NotFoundException('User not found. Please register first.');
    }

    // 2. Return a success message (In a real app, we would send an OTP here)
    return {
      message: 'OTP sent successfully',
      otp: '1234', // We return this strictly for testing
      userId: person.id,
      role: person.role,
    };
  }
}
