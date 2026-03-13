import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { VideosModule } from "./modules/videos/videos.module";
import { ConfigModule } from "@nestjs/config";
import { CommentsModule } from './modules/comments/comments.module';
import { LikesService } from './modules/likes/likes.service';
import { LikesController } from './modules/likes/likes.controller';
import { LikesModule } from './modules/likes/likes.module';

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        UsersModule,
        VideosModule,
        CommentsModule,
        LikesModule
    ],
    providers: [LikesService],
    controllers: [LikesController]
})

export class AppModule{}