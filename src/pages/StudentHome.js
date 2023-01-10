import '../css/StudentHome.css';
import Band from './Images/6fdd91a26c292c6f5a03f3d9e539bbea.png';
import Art from './Images/3406665-e1544725991391.png';
import Basketball from './Images/Basketball-Team-Silhouette-PNG.png';
function StudentHome() {
    return (
        <div id="StudentHome">
            <h2 id='SHead'>Welcome, Student</h2>
            <div className='Box2' id= 'Box23'>
                <p>Join your Home Schools Basketball Team! This will be rewarded 25 points!</p>
                <img src={Basketball} alt='Students' width='100%' height='70%' className='Images' />
                <br></br>
                <a className='button2' href='/StudentEvents'>View Event</a>
            </div>
            <div className='Box2' id= 'Box22'>
                <p>Join your Home Schools Marching Band! This will be rewarded 25 points!</p>
                <img src={Band} alt='Events' width='100%' height='70%' className='Images' />
                <br></br>
                <a className='button2' href='/StudentEvents'>View Event</a>
            </div>
            <div className='Box2' id= 'Box224'>
                <p>Join your Home Schools Art Club! This will be rewarded 10 points!</p>
                <img src={Art} alt='Events' width='100%' height='70%' className='Images' />
                <br></br>
                <a className='button2' href='/StudentEvents'>View Event</a>
            </div>
        </div>
    );
}
       
        

export default StudentHome;