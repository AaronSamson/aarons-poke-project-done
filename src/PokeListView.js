import styles from './App.module.css';

function PokeListView({ pokelist, nextbatch, prevbatch, spriteoffset }) {
    return (
        <div>
            <div className={styles.pokelist}>
                {pokelist.map(pokemon => (
                    <div key={pokemon} className={styles.pokefloat}>
                        <button className={styles.tinybutton} value={pokemon}>{pokemon}</button>
                        {/* originally able to click button to search pokemon... but had issue */}
                        <br/>
                        <img className={styles.tinyimage} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokelist.indexOf(pokemon) + spriteoffset + 1}.png`} alt={pokemon} />
                    </div>
                ))}
            </div>
            <div className={styles.nextprevbuttons}>
                {/* if batch is null do not render button */}
                {prevbatch && <button onClick={prevbatch}>View Pokemon No. {spriteoffset - 5} to {spriteoffset}</button>}
                {nextbatch && <button onClick={nextbatch}>View Pokemon No. {spriteoffset + 7} to {spriteoffset + 13}</button>}
            </div>
        </div>
    )
}

export default PokeListView;