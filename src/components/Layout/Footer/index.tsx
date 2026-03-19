import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      CI ©{new Date().getFullYear()} created by sololearn.uz team
    </div>
  );
};

export default Footer;
