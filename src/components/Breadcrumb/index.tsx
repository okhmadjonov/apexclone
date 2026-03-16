import { useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.scss";

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className={styles.breadcrumb}>
      {paths.map((path, index) => (
        <span key={index}>{path}</span>
      ))}
    </div>
  );
};

export default Breadcrumb;
