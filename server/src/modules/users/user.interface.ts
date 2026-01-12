export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password?: string;
    fullName?: string;
    avatar?: string;
    role: 'user' | 'admin';
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
