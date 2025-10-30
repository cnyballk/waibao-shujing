import { projectNav } from "@/components/navs";
import { useAuth } from "@/hook/useAuth";
import { appStore } from "@/store/appStore";
import { history, Outlet, useLocation } from "umi";

export default (): any => {
  const { isLogin } = useAuth();
  const location = useLocation();
  const { selectedProjectId } = appStore((state) => state);
  console.log("isLogin: ", isLogin)
  if (isLogin) {
    if (projectNav.find((item: any) => item.link === location.pathname)) {
      if (selectedProjectId) {
        return <Outlet />;
      } else {
        return history.replace("/");
      }
    }
    return <Outlet />; // ;
  } else {
    return history.replace("/login"); // ;
  }
};
