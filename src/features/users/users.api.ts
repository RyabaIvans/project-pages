import { instance } from "../../common/api";

export const usersApi = {


  // получение всех юзеров
  users: (param: number) => {
    return instance.get<Responce>(`/users?page=1&count=${param}`);
  },

  //получение позиций
  positions: () => {
    return instance.get<PositionType>(`/positions`);
  },

  //токен для последующего создания
  token: () => {
    return instance.get<TokenResponce>(`/token`);
  },

  // запрос на добавление юзера
  postUsers: (arg: UsersPayload[], token: string) => {
    return instance.post<GetUsersResponce>(`/users`, arg, {
      headers: {
        Token: token
      }
    });
  }

};

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
