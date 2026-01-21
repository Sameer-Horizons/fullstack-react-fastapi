import { useContext, useState } from "react"
import { AppContext } from "../Context/AppContext"
import axios from "axios";

export default function Starrating({ starCount = 5, productId }) {
    const [savedStarValue, setSavedStarValue] = useState(0);
    const [pendingStarValue, setPendingStarValue] = useState(0);
    const [starvalue, setStarvalue] = useState(0);
    const [hovervalue, setHovervalue] = useState()
    const { backendurl } = useContext(AppContext)
    console.log(starvalue)

    const saveRatingToDatabase = async () => {
        if (pendingStarValue === 0) {
            alert("Please select a rating before saving.");
            return;
        }
        try {
            const ratingData = {
                productId: productId,
                rating: pendingStarValue,
            };
            let requestPromise;
            if (savedStarValue > 0) {
                requestPromise = axios.post(backendurl + "/rating", ratingData);
            } else {

            }
            const data = await requestPromise
            const response = await requestPromise;
            setSavedStarValue(pendingStarValue);
            alert("Rating saved successfully!");
        }
        catch (error) {

            console.error("Error saving rating:", error);
            if (error.response) {
                console.error("Backend Error Message:", error.response.data.message); // <-- This will now show the detailed error
                alert("Can't change once done " );
            } else {
                alert("Failed to save rating .");
            }
        }
    };

    const handleStarClick = (index) => {
        setPendingStarValue(index + 1);
    };

    const displayValue = hovervalue || pendingStarValue || savedStarValue;

    return (
        <>
            <div>
                {
                    new Array(starCount).fill(0).map((value, index) => {
                        return <span key={index}
                            className={
                                index < displayValue ? "gold" : ""
                            }
                            onClick={() => { handleStarClick(index) }}
                            onMouseEnter={() => { setHovervalue(index + 1) }}
                            onMouseLeave={() => { setHovervalue(0) }}
                            style={{ cursor: 'pointer' }}
                        >
                            &#9733;
                        </span>
                    })
                }
            </div>
            <button onClick={saveRatingToDatabase}>
                {savedStarValue > 0 ? "done" : "Submit Rating"}
            </button>
            <p>Current pending selection: {pendingStarValue || 'None'}</p>
        </>
    )
}