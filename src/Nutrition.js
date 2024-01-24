export const Nutrition = ({ label, quantity, unit,index}) =>{
    return(
        <div key={index}>
            {/* <div>
            <h2>Nutrition Facts</h2>
            </div> */}
               <p><b>{label}</b> - {quantity.toFixed(0)} {unit}</p>

        </div>
    )
}
