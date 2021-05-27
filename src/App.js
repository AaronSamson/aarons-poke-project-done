import Header from './Header';
import PokeSearch from './PokeSearch';
import styles from './App.module.css';

function App() {
  return (
    <div className="App" >
      <div className={styles.pixeltext}>
        <div className={styles.pixelart} /> {/* background art */}
        <Header />
        <PokeSearch />
      </div>
    </div>
  );
}

export default App;
