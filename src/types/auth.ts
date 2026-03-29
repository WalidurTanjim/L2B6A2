export type SignInUser = {
     email: string;
     password: string;
};

export type TokenPayloadUser = {
     name: string;
     email: string;
     role: string;
}