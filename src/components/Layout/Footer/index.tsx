import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      uz ©{new Date().getFullYear()} created by sololearn team
    </div>
  );
};

export default Footer;