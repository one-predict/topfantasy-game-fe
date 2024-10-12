import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@core';
import { UserModule } from '@user';
import { RewardsModule } from '@rewards';
import { AuthController } from '@auth/controllers';
import { AuthServiceImpl, DefaultRegistrationService } from '@auth/services';
import AuthModuleTokens from './auth.module.tokens';

@Module({
  imports: [CoreModule, UserModule, RewardsModule, ConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthModuleTokens.Services.AuthService,
      useClass: AuthServiceImpl,
    },
    {
      provide: AuthModuleTokens.Services.RegistrationService,
      useClass: DefaultRegistrationService,
    },
  ],
})
export class AuthModule {}
