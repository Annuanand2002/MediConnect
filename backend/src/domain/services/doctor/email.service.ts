

export interface IEmailService{
    sendDoctorActivationEmail(email:string,fullName:string,activationLink:string):Promise<void>
}