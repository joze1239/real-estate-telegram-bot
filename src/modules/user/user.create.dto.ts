import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  externalId: number;

  @IsOptional()
  @IsString()
  username: string | undefined;

  @IsOptional()
  @IsString()
  firstName: string | undefined;

  @IsOptional()
  @IsString()
  lastName: string | undefined;

  constructor(
    externalId: number,
    username: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
  ) {
    this.externalId = externalId;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
