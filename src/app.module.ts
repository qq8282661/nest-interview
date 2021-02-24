import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';
import devConfig from './config/dev.config';
import prodConfig from './config/production.config';
import defaultConfig from './config/default.config';
import { CompilesController } from './compile/compiles.controller';

const configPrams = { isGlobal: true, ignoreEnvFile: true, load: [] };
configPrams.load = [() => ({ ...defaultConfig() })];

if (env.NODE_ENV === 'development') {
  console.log(env.NODE_ENV);
  configPrams.load = [() => ({ ...defaultConfig(), ...devConfig() })];
}

if (env.NODE_ENV === 'production') {
  console.log(env.NODE_ENV);
  configPrams.load = [() => ({ ...defaultConfig(), ...prodConfig() })];
}

@Module({
  imports: [ConfigModule.forRoot(configPrams)],
  controllers: [CompilesController],
  providers: [Logger],
})
export class AppModule {}
