import '../css/AdminHome.css';
import Students from './Images/pngtree-graduation-season-student-silhouette-university-png-image_7609944.png';
import Events from './Images/6fdd91a26c292c6f5a03f3d9e539bbea.png';
function AdminHome() {
    return (
        <div id="AdminHome">
            <h2 id="head">Welcome, Admin</h2>
            <div className='Box' id='box1'>
                <img src={Events} alt='Students' width='100%' height='300px' className='Images' />
                <a className='button' href='/AdminStudents'>View Students</a>
            </div>
            <div className='Box' id='box2'>
                <img src={Students} alt='Events' width='100%' height='300px' className='Images' />
                <a className='button' href='/AdminEvents'>View Events</a>
            </div>
        </div>
    );
}
export default AdminHome;