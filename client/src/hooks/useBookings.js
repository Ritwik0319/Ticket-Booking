import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as bookingService from "../services/bookingService";

// GET ALL BUSES
export const useBuses = () => {
  return useQuery({
    queryKey: ["buses"],
    queryFn: bookingService.getBuses,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,

    refetchOnMount: false,
    refetchOnWindowFocus: false,

    retry: 1,
  });
};

// GET SINGLE BUS
export const useBus = (id) => {
  return useQuery({
    queryKey: ["bus", id],
    queryFn: () => bookingService.getBusById(id),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,

    refetchOnMount: false,
    refetchOnWindowFocus: false,

    retry: 1,
  });
};

// BOOK TICKET
export const useBookTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingService.bookTicket,

    onSuccess: (data) => {
      const busId = data?.busId;

      // Refresh all related queries
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["buses"] });

      if (busId) {
        queryClient.invalidateQueries({ queryKey: ["bus", busId] });
      }

      // Force refetch immediately
      queryClient.refetchQueries({ queryKey: ["buses"] });
      queryClient.refetchQueries({ queryKey: ["my-bookings"] });
    },
  });
};

// HOLD SEATS
export const useHoldSeats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingService.holdSeats,

    onSuccess: (data) => {
      const busId = data?.busId;

      if (busId) {
        queryClient.invalidateQueries({ queryKey: ["bus", busId] });
      }
    },
  });
};

// GET USER BOOKINGS
export const useMyBookings = () => {
  return useQuery({
    queryKey: ["my-bookings"],
    queryFn: bookingService.getMyBookings,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,

    refetchOnMount: true,
    refetchOnWindowFocus: false,

    retry: 1,
  });
};
