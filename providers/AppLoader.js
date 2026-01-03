import { appSlice } from "@/store/appSlice";
import { getToken } from "@/utils/secureStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AppLoader({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAuth = async () => {
      const token = await getToken();

      if (token) {
        dispatch(appSlice.actions.setLoggedIn(true));
      }

      //   dispatch(setLoading(false));
    };

    loadAuth();
  }, []);

  return children;
}
