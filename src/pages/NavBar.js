import '../css/Home.css';
import axios from "axios"

function SetNavBar() {
    function urlGet(url) {
        axios
            .get(`http://localhost:3001${url}`)
            .catch(err => {
                console.error(err);
            });
    }

    var user = "Student";
    var btnArr;

    if(user === "Student") {
        btnArr = [{ title: "Home", Link: "/" }, { title: "Your Points", Link: "/points" }, { title: "Events", Link: "/events" }];
    }

    else if(user === "admin") {
        btnArr = [{ title: "Home", Link: "/" }, { title: "Student List", Link: "/points" }, { title: "Event List", Link: "/events" }];
    }
    
    return (
        <nav>
            {btnArr.map((items, index) => (
                <a id={`navButton${index}`} className="navButton" key={`Button${index}`} href={items.Link} onClick={() => urlGet(items.Link)}>{items.title}</a>
            ))}
        </nav>
    )
}

export default SetNavBar;