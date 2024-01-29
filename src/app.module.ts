// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Update this line
import { UserSchema } from './users/user.schema';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { JwtStrategy } from './jwt.strategy';

@Module({

  imports: [
    MongooseModule.forRoot("mongodb+srv://erikbabajanyan10:AqXnE0HzS3OHhybZ@cluster0.be3ufjd.mongodb.net/?retryWrites=true&w=majority"),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class AppModule {}
