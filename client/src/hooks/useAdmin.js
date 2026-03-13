import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as adminService from "../services/adminService";

export const useAdminBuses = () => {
  return useQuery({
    queryKey: ["admin-buses"],
    queryFn: adminService.getAdminBuses,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useAdminBus = (id) => {
  return useQuery({
    queryKey: ["admin-bus", id],
    queryFn: () => adminService.getAdminBusById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useCreateBus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.createBus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-buses"] });
      queryClient.invalidateQueries({ queryKey: ["buses"] });
    },
  });
};
