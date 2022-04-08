import { useQuery } from "react-query";

const { api } = window;

function useGetImage(thumbHash: string) {
  const { data, isLoading, error, refetch } = useQuery(
    ["get-preview", thumbHash],
    async () => {
      const data = await api.getFilePreview(thumbHash);

      const preview = new Blob([data?.preview?.buffer]);
      return URL.createObjectURL(preview);
    },
    {
      enabled: !!thumbHash,
      refetchOnMount: true,
    }
  );
  const imgs = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmZ6szLex0srrNvqBorGd8sNoyn6IvkWnLtQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5axPF5_dU6HKf6699EJwWLdkRFxMgNZDMQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpy0SU3IYCzGHCuA0n19-qdr5P3XonYw6FEw&usqp=CAU",
  ];
  const faker = imgs[Math.floor(Math.random() * 4)];

  return { data: faker, isLoading, error, realData: data, refetch };
}

export default useGetImage;
