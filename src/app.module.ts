import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { VideosModule } from "./modules/videos/videos.module";
import { ConfigModule } from "@nestjs/config";
import { CommentsModule } from './modules/comments/comments.module';
import { LikesModule } from './modules/likes/likes.module';
import { RedisModule } from "./core/redis/redis.module";
import { PrismaModule } from "./core/database/prisma.module";
import { EmailModule } from "./common/email/email.module";

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        PrismaModule,
        RedisModule,
        UsersModule,
        VideosModule,
        CommentsModule,
        LikesModule,
        EmailModule
    ]
})

export class AppModule{}