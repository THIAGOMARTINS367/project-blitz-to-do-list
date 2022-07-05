const superSecretJwt: string = process.env.JWT_SECRET || 'default_password';
export const tokenValidity: string = process.env.USER_TOKEN_VALIDITY || '24h';

export default superSecretJwt;
