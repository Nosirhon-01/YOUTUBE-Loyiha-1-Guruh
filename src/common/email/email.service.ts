import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService{
    constructor(private readonly mailerservice: MailerService){}

    async sendEmail(email: string, username: string, password: string, code: number){
        await this.mailerservice.sendMail({
            to: email,
            from: process.env.EMAIL,
            subject: `Hello ${username}`,
            template: 'index',
            context:{
                text: `Welcome to youtube, to continue enter this code ${code}`
            }
        })
    }
}