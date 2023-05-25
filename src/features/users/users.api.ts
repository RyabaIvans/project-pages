import {instance} from "../../common/api";

export const usersApi = {

    users: (param: number) => {
        return instance.get<Responce>(`/users?page=1&count=${param}`)
    },
    positions: () => {
        return instance.get<PositionType>(`/positions`)
    },
    token: () => {
        return instance.get<TokenResponce>(`/token`)
    },
    postUsers: (arg: UsersPayload[], token: string) => {
        return instance.post<GetUsersResponce>(`/users`, arg, {
            headers: {
                Token: token
            }
        })
    },
    postUsers2: (body: FormData, token: string) => {
        return instance.post<GetUsersResponce>(`/users`, body, {
            headers: {
                Token: token
            }
        })
    },

}

export type UsersPayload = {
    name: string,
    email: string,
    phone: string,
    position_id: number,
    photo: File,
}

export type GetUsersResponce = {
    success: boolean;
    user_id: number;
    message: string;
}


export type TokenResponce = {
    success: boolean;
    token: string;
}

export type PositionType = {
    success: boolean;
    positions: PositionTypePositions[];
}
export type PositionTypePositions = {
    id: number;
    name: string;
}

export type Responce = {
    success: boolean;
    page: number;
    total_pages: number;
    total_users: number;
    count: number;
    links: ResponceLinks;
    users: ResponceUsers[];
}
export type ResponceLinks = {
    next_url: string;
}
export type ResponceUsers = {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    position_id: string;
    registration_timestamp: number;
    photo: string;
}
// export type ArgPasswordType = {
//     email: string;
//     from?: string;
//     message: string;
// }
// export type ArgNewPasswordType = {
//     password: string;
//     resetPasswordToken: string;
// }
//
// export type ArgRegisterType = Omit<ArgLoginType, 'rememberMe'>
//
// export type ArgLoginType = {
//     email:string
//     password:string
//     rememberMe: boolean
// }
//
//
// export type ForgotpasswordrResponseType = {
//     info:string,
//     error:string
// }
//
// export type RegisterResponseType = {
//     addedUser: UserType;
// }
// type UserType = Omit<ProfileType, 'token'|'tokenDeathTime'>
//
// export type ProfileType = {
//     _id: string;
//     email: string;
//     rememberMe: boolean;
//     isAdmin: boolean;
//     name: string;
//     verified: boolean;
//     publicCardPacksCount: number;
//     created: string;
//     updated: string;
//     __v: number;
//     token: string;
//     tokenDeathTime: number;
// }