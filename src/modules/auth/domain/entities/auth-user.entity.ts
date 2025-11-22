import { UserRole } from '../enums/user-role.enum'

export class AuthUser {
    constructor(
        public readonly id:number,
        public readonly email: string,
        public readonly name: string,
        public readonly role: UserRole
    ) {}

    isAdmin(): boolean {
        return this.role === UserRole.ADMIN;
    }
    isUser(): boolean {
        return this.role === UserRole.USER
    }
}