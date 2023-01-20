import '../css/AdminHome.css';
import { useLocation } from 'react-router-dom'
function AdminHome() {
    return (
        <div id="AdminHome">
            <h2 id="head">Welcome, Admin</h2>
            {/* Veiw Students Button */}
            <div className='Box' id='box1'>
                <img src="https://freesvg.org/img/Three-Children-Holding-Up-Arms.png" alt='Students' width='100%' height='300px' className='Images' />
                <a className='button' href='/AdminStudents'>View Students</a>
            </div>
            {/* Veiw Events Button */}
            <div className='Box' id='box2'>
                <img src="https://freesvg.org/img/rollerCoaster2.png" alt='Events' width='100%' height='300px' className='Images' />
                <a className='button' href='/AdminEvents'>View Events</a>
            </div>
        </div>
    );
}
export default AdminHome;