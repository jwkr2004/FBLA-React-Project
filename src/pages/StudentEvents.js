import '../css/StudentEvents.css';
import SportTest from './Images/Basketball-Team-Silhouette-PNG.png'
import NonSportTest from './Images/6fdd91a26c292c6f5a03f3d9e539bbea.png'
function StudentEvents() {
    return (
        <div id="StudentEvents">
            <h1 className='Headingg'>Sports</h1>
            <div className='BoxSE3' id= 'BoxSE33'>
                <img  src={SportTest} alt='Students' width='20%' height='50%' className='StudentEventIMG' />
                <p className='pushinpp'>Join your Home Schools Art Club This will be rewarded 25 points!</p>
                <br></br>
                <a className='button289' href='/AdminStudents'>View Event</a>
            </div>
            <h1 className='Headingg'>Non-Sports</h1>
            <div className='BoxSE2' id= 'BoxSE22'>
                <img src={NonSportTest} alt='Students' width='20%' height='50%' className='StudentEventIMG' />
                <p className='pushinpp'>Join your Home Schools Art Club This will be rewarded 25 points!</p>
                <br></br>
                <a className='button289' href='/AdminStudents'>View Event</a>
            </div>
        </div>
       
        
    );
}
export default StudentEvents;