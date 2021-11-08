import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from  '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports:[
    ConfigModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async (configservice:ConfigService) => ({
        secret:configservice.get('JWT_SECRET'),
         signOptions:{
        expiresIn:3600 *24
      },
      })
      // secret:'topSecrit51',
      // signOptions:{
      //   expiresIn:3600 *24
      // },
    }),
    TypeOrmModule.forFeature([UsersRepository])
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule {}
