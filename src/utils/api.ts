interface IReq {
    email: string;
    username: string;
    mobile: string;
    password: string;
}

interface IRes {
    email: string;
    username: string;
    mobile: string;
}

export const post = ({ email, username, mobile, password }: IReq): Promise<IRes> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ email, username, mobile });
        }, 1000);
    });
};
