import { IEmailService } from "../../domain/services/doctor/email.service.js";
import nodemailer from "nodemailer"

export class EmailService implements IEmailService{
    private transporter = nodemailer.createTransport({
        service:"gmail",
        auth : {
            user:process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }
    })
    async sendDoctorActivationEmail(email: string, fullName: string, activationLink: string): Promise<void> {
        await this.transporter.sendMail({
            from :`"MediConnect" <$
            {process.env.EMAIL_USER}>`,
            to : email,
            subject : "Your mediconnect account has been approved",
            html:`
            <h2>Congratulations Dr.${fullName}!</h2>
            <p>Your application has been approved.</p>
            <p>Click the button below to activate your account and create your password.</p>
            <a href="${activationLink}"
            style = "background:#2563eb;
            color:white;
            padding : 12px 20px;
            text-decoration:none;
            border-radius:6px;
            display:inline-block;
            "
            >'
            Activate Account
            </a>
            <p>This link will expire in <strong>24 hours</strong>.</p>
            <p>Regards,<br>MediConnect Team</p>
            `
        })
    }
}