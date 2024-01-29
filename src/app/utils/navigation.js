// utils/navigation.js
import { useRouter } from "next/router";

const navigateTo = (path) => {
  const router = useRouter();
  router.push(path);
};

export default navigateTo;
