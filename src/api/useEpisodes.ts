import { IEpisode } from "../interfaces/IEpisode";
import { useHttpClient } from "./index";

export const useEpisodes = () => {
  const httpClient = useHttpClient();

  const getFirstEpisode = async (number: number) => {
    try {
      const response = await httpClient.get(`/api/episode/${number}`);
      const episode: IEpisode = response.data;

      return episode.name;
    } catch (error: unknown) {
      throw error;
    }
  };

  return {
    getFirstEpisode,
  };
};
