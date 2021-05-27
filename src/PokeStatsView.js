import styles from './App.module.css';

function PokeStatsView(props) {
    return (
        <div className={styles.dexscreen}>
            <div>
                <h2>You chose Pokemon 
                    <span className={styles.capitalize}> No.{props.id} {props.name}</span>
                </h2>
            </div>
            <div className={styles.float}>
                <img className={styles.image} src={props.sprite} alt={props.name}/>
            </div>
            <div className={styles.float}>
                <ul className={styles.stats}>
                    <li>Height: {props.height/10} m</li>
                    <li className={styles.capitalize}>Type: {props.type}</li>
                    <li>Weight: {props.weight/10} kg</li>
                </ul>
            </div>
            <div>
                <button className={styles.float} onClick={props.viewstatsfalse}>Go Back</button>
            </div>
        </div>
    )
}

export default PokeStatsView;