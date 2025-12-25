import useSWR from "swr";
import useAxios from "@/hooks/use-axios";
import type { BirthdayUser } from "../types";

export function useBirthdays() {
  const axios = useAxios();

  const fetcher = async (url: string): Promise<BirthdayUser[]> => {
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("Failed to fetch birthdays");
    }
    const data = response.data;
    return Array.isArray(data) ? data : data.results || [];
  };

  const { data, error, isLoading, mutate } = useSWR<BirthdayUser[]>(
    `/account/birthdays/`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000 * 5,
    }
  );

  return {
    birthdays: data || [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}
