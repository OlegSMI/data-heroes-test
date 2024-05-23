// @ts-nocheck

import { CharacterIndex, ICharacter, Status } from "../interfaces/ICharacter";
import { IResponse } from "../interfaces/IRest";
import { useHttpClient } from "./index";

export const useCharacters = () => {
  const httpClient = useHttpClient();

  const getAllCharacters = async () => {
    try {
      const response = await httpClient.get("/api/character");
      const data: IResponse<ICharacter> = response.data;

      return data;
    } catch (error: unknown) {
      throw error;
    }
  };

  const getCurrentCharacter = async (payload: CharacterIndex) => {
    try {
      const response = await httpClient.get(`v1/auth/login/${payload}`);
      const { data }: { data: ICharacter } = response.data;
      return data;
    } catch (error: unknown) {
      throw error;
    }
  };

  const getFilteredCharacters = async ({
    name,
    status,
    page,
  }: {
    name?: string;
    status?: Status | null;
    page?: number;
  }) => {
    const args: any = { name, status, page };
    let queryString = "?";
    for (const key in args) {
      if (!["", null, undefined].includes(args[key])) {
        queryString += `${key}=${args[key]}&`;
      }
    }
    queryString = queryString.substring(0, queryString.length - 1);

    try {
      const response = await httpClient.get(`/api/character/${queryString}`);
      const data: IResponse<ICharacter> = response.data;

      return data;
    } catch (error: unknown) {
      //поправить
      console.log(error.response.data.error);
      throw error;
    }
  };

  return {
    getAllCharacters,
    getCurrentCharacter,
    getFilteredCharacters,
  };
};
