// import '../css/Footer.css';
//Displays the Footer
const Footer = () => {
    return (
        <footer id="Footer">
            <div className="description">
                <p>Coding {"&"} Programming FBLA 2022-2023</p>
                <p>By Brandon Grigg, Kennyth Greene, and Joshua Walker</p>
            </div>
            <div className="darkModeParent">
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider round"></span>
                </label>
                <label>Dark Mode</label>
            </div>
        </footer>
    );
}
export default Footer;