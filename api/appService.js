import api from "./client";

export const appService = {
  getUserDetails: async () => {
    const res = await api.get(`/user/details`);
    return res.data;
  },
  getSomeReferrals: async () => {
    const res = await api.get(`referral/all?per_page=5`);
    return res.data;
  },
  getSomeTransactions: async () => {
    const res = await api.get(`transaction/all?per_page=5`);
    return res.data;
  },
  createTicket: async (payload) => {
    const res = await api.post("/ticket/create", payload);
    return res.data;
  },
  getTicketMessages: async (id, page) => {
    const res = await api.get(`/ticket/${id}/messages?page=${page}`);
    return res.data;
  },
  getTickets: async ({ pageParam }) => {
    const res = await api.get(`/ticket/all?per_page=5&page=${pageParam}`);
    return res.data;
  },
  getTicketCategories: async () => {
    const res = await api.get("/ticket/categories");
    return res.data;
  },
  getTransactions: async ({ pageParam = 1 }) => {
    console.log("p", pageParam);

    const res = await api.get(`transaction/all?page=${pageParam}`);
    return res.data;
  },
  getTransactionStats: async () => {
    const res = await api.get(`transaction/get-stats`);
    return res.data;
  },
  getReferralStats: async () => {
    const res = await api.get(`referral/get-stats`);
    return res.data;
  },
  deleteAccount: async () => {
    const res = await api.delete(`user/account`);
    return res.data;
  },
  getReferrals: async () => {
    const res = await api.get(`referral/all`);
    return res.data;
  },
  getRecentRequests: async (latitude, longitude) => {
    const url = `/order/requests?per_page=5&latitude=${latitude}&longitude=${longitude}`;

    const res = await api.get(url);

    // console.log("url", url, res.data);

    return res.data;
  },
  getRequests: async ({
    pageParam = 1,
    filter = null,
    latitude,
    longitude,
  }) => {
    // console.log("p", pageParam);

    const res = await api.get(
      `/order/requests?page=${pageParam}&per_page=5${filter ? "&type=" + filter : ""}&latitude=${latitude}&longitude=${longitude}`,
    );
    return res.data;
  },
  getCompletedRequests: async ({
    pageParam = 1,
    filter = null,
    latitude,
    longitude,
  }) => {
    console.log("p", pageParam);

    const res = await api.get(
      `/order/completed-requests?status=completed&page=${pageParam}${filter ? "&type=" + filter : ""}`,
    );
    return res.data;
  },
  getCategories: async () => {
    const res = await api.get(`/vehicle_category/all?per_page=10000`);
    return res.data;
  },
  getCategory: async (id) => {
    const res = await api.get(`/vehicle_category/` + id);
    return res.data;
  },
  getBankDetails: async (id) => {
    const res = await api.get(`/bank-account/all`);
    return res.data;
  },
  validateBankDetails: async (payload) => {
    const res = await api.post(`/bank-account/validate`, payload);
    // console.log("res", res.data, payload);
    return res.data;
  },
  setBankDetails: async (payload) => {
    const res = await api.post(`/bank-account/add`, payload);
    return res.data;
  },
  getVehicle: async (id) => {
    const res = await api.get(`/vehicle/` + id);
    return res.data;
  },
  getOrder: async (id) => {
    const res = await api.get(`/order/` + id);
    return res.data;
  },
  cancelOrder: async (id, payload) => {
    const res = await api.post(`/order/${id}/cancel_order`, payload);
    return res.data;
  },
  setUserStatus: async (payload) => {
    const { data } = await api.post(`/user/set-status`, payload);
    return data;
  },
  declineOrder: async (id, payload) => {
    const res = await api.get(`/order/${id}/decline_order`);
    return res.data;
  },
  activateVehicle: async (id) => {
    const res = await api.get(`/vehicle/${id}/activate`);
    return res.data;
  },
  acceptOrder: async (id) => {
    const res = await api.get(`/order/rider/accept/${id}`);
    return res.data;
  },
  updateOrder: async (id, status) => {
    const res = await api.put(`/order/${id}/status`, {
      status,
    });
    return res.data;
  },
  setCurrentCordinates: async (payload) => {
    const res = await api.put(`/user/set-cordinates`, payload);
    return res.data;
  },
  setPushToken: async (payload) => {
    const res = await api.put(`/user/set-push-token`, payload);
    return res.data;
  },
  setServices: async (payload) => {
    const res = await api.post("rider/set-services", payload);
    return res.data;
  },
  openChat: async (payload) => {
    const res = await api.post("chat/open", payload);
    return res.data;
  },
  getAlerts: async () => {
    const res = await api.get(`/user/notification/all`);
    return res.data;
  },
  getVehicles: async () => {
    const res = await api.get(`/vehicle/all?per_page=10000`);
    return res.data;
  },
  addVehicle: async (payload) => {
    const res = await api.post("vehicle/create", payload);
    return res.data;
  },
  editVehicle: async (id, payload) => {
    const res = await api.put("vehicle/" + id, payload);
    return res.data;
  },
  deleteVehicle: async (id) => {
    const res = await api.delete("vehicle/" + id);
    return res.data;
  },
  uploadVehicleImage: async (payload, setProgress) => {
    const res = await api.post("vehicle/image/upload", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (event) => {
        if (!event.total) return;

        const progress = Math.round((event.loaded * 100) / event.total);

        setProgress(progress);
      },
    });
    return res.data;
  },
};
