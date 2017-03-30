/*jshint ignore:start */
import WorkorderTask from '../../public/js/modules/workorderTask'
import DaysWorkorders from '../../public/js/modules/DaysWorkorders'

const app= document.getElementById('app');

//ReactDOM.render(<WorkorderTask />, app );
ReactDOM.render(<DaysWorkorders crew="Crew 1" date="2017-03-29"/>, app );
