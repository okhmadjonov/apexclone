import { useTranslation } from "react-i18next";
import styles from "./Topcards.module.scss";
import {
  IoWalletOutline,
  IoPeopleOutline,
  IoCartOutline,
  IoEyeOutline,
  IoArrowUpOutline,
  IoArrowDownOutline,
} from "react-icons/io5";

const HomeTopCards = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.hometopcards}>
      <h3>{t("dashboard")}</h3>
      <p>{t("welcomeBack")}</p>
      <div className={styles.statisticCards}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{t("totalRevenue")}</span>
            <span className={styles.cardIcon}>
              <IoWalletOutline />
            </span>
          </div>
          <div className={styles.cardValue}>$48,295</div>
          <div className={styles.cardFooter}>
            <span className={`${styles.trend} ${styles.positive}`}>
              <IoArrowUpOutline />
              +12.5%
            </span>
            <span className={styles.trendLabel}>{t("vsLastMonth")}</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{t("activeUsers")}</span>
            <span className={styles.cardIcon}>
              <IoPeopleOutline />
            </span>
          </div>
          <div className={styles.cardValue}>2,847</div>
          <div className={styles.cardFooter}>
            <span className={`${styles.trend} ${styles.positive}`}>
              <IoArrowUpOutline />
              +8.2%
            </span>
            <span className={styles.trendLabel}>{t("vsLastMonth")}</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{t("totalOrders")}</span>
            <span className={styles.cardIcon}>
              <IoCartOutline />
            </span>
          </div>
          <div className={styles.cardValue}>1,432</div>
          <div className={styles.cardFooter}>
            <span className={`${styles.trend} ${styles.negative}`}>
              <IoArrowDownOutline />
              -3.1%
            </span>
            <span className={styles.trendLabel}>{t("vsLastMonth")}</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{t("pageViews")}</span>
            <span className={styles.cardIcon}>
              <IoEyeOutline />
            </span>
          </div>
          <div className={styles.cardValue}>284K</div>
          <div className={styles.cardFooter}>
            <span className={`${styles.trend} ${styles.positive}`}>
              <IoArrowUpOutline />
              +24.7%
            </span>
            <span className={styles.trendLabel}>{t("vsLastMonth")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTopCards;
