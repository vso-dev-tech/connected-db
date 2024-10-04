export interface auth {
    body: {
        email: string,
        password: string,
    }
};

export interface validation {
    userId: string
    headers: any
};