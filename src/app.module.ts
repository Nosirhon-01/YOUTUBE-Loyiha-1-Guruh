import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { VideosModule } from "./modules/videos/videos.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        UsersModule,
        VideosModule
    ]
})

export class AppModule{}