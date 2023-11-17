import { IsOptional, IsString, IsEmail } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  readonly role?: Role;

  @IsOptional()
  readonly password?: string;
}
