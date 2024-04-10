import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { AppController } from './app.controller';
import { AppRouterModule } from './app.router';
// import { UserController } from 'src/module/user/controller/user.controller';
@Module({
    imports: [CoreModule, AppRouterModule.register()],
    controllers: [AppController],
})
export class AppModule {}
// configure(consumer: MiddlewareConsumer) {
//     // this will bind middleware with all the user routes
//     // consumer.apply(UserMiddleware).forRoutes(UserController);
// }
