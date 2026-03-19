import HomeTopCards from "./components/top-cards";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <HomeTopCards />
    </div>
  );
};

export default Home;
