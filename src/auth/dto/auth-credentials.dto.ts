import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsString()
  @MinLength(8)
  @MaxLength(38)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, //1 upper, 1 lower, 1 number or special character.
    {
      message:
        'Password is too weak. Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special char or number',
    },
  )
  password: string;
}
