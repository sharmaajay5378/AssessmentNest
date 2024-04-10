import { ConfigModule } from '@nestjs/config';
import Configs from 'src/config';

export default (() => {
    const envFilePath =
        process.env.NODE_ENV == 'production'
            ? '.env'
            : `.env.${process.env.NODE_ENV}`;

    return ConfigModule.forRoot({
        load: Configs,
        isGlobal: true,
        cache: true,
        ignoreEnvFile: false,
        envFilePath: [envFilePath],
    });
})();
