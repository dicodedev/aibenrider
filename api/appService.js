import api from "./client";

export const appService = {
  getUserDetails: async () => {
    const res = await api.get(`/user/details`);
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
  activateVehicle: async (id) => {
    const res = await api.get(`/vehicle/${id}/activate`);
    return res.data;
  },
  setServices: async (payload) => {
    const res = await api.post("rider/set-services", payload);
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
