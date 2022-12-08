import '../css/Home.css';
function SetNavBar() {
    var user = "Student";
    var btnArr;

    if(user === "Student") {
        btnArr = [{ title: "Home", Link: "/" }, { title: "Your Points", Link: "/" }, { title: "Events", Link: "/events" }];
    }

    else if(user === "admin") {
        btnArr = [{ title: "Home", Link: "/" }, { title: "Student List", Link: "/" }, { title: "Event List", Link: "/" }];
    }
    
    return (
        <nav>
            {btnArr.map((items, index) => (
                <a id={`navButton${index}`} className="navButton" key={`Button${index}`} href={items.Link}>{items.title}</a>
            ))}
        </nav>
    )
}

export default SetNavBar;