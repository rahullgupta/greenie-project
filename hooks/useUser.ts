import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useUser = (id?: string) => {
  const { data, error, isLoading } = useSWR(
    id ? `/api/users/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading };
};

export default useUser;
