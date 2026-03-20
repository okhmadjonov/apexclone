import styles from "./Footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <p>© {currentYear} Apex Clone Dashboard. All rights reserved.</p>
    </div>
  );
};

export default Footer;
