import { SetMetadata } from '@nestjs/common';

export type RoleType = 'user' | 'admin';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);
