import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  externalId: number;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  constructor(
    externalId: number,
    username: string,
    firstName: string,
    lastName: string,
  ) {
    this.externalId = externalId;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
