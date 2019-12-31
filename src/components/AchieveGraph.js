import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {connect} from "react-redux";

class AchieveGraph extends React.Component {
    render(){
        let total_attendance_count=0;
        let today_attendance_count=0;
        const total_attendance = 21 * 24;
        const today_attendance = 24; 

        const attendance_data  = this.props.attendance;
        // 최적화 어떻게 하면 좋을지???
        // console.log(attendance_data);

        const today = new Date();
        const todayString = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());

        for(let i=0; i<attendance_data.length; ++i){
            total_attendance_count += Object.keys(attendance_data[i]['attendance']).length;
            if(todayString in attendance_data[i]['attendance']){
                today_attendance_count += 1;
            }
        }

        return (
            <div
                style={{
                    backgroundColor: '#BBB',
                    padding: '20px'
                }}
            >
                <CustomGraph title="나의" color="#99c0ff" percentage={18}/>
                <CustomGraph title="오늘" color="#fc857e" percentage={Math.floor(today_attendance_count/today_attendance*100)}/>
                <CustomGraph title="전체" color="#84db87" percentage={Math.floor(total_attendance_count/total_attendance*100)}/>
            </div>
        )
    }
}

class CustomGraph extends React.Component{
    render(){
        const percentage = this.props.percentage;
        const thisColor = this.props.color;
        const thisWidth = window.innerWidth > 700 ? '20vw' : '70vw';
        return (
            <div style={{margin:'10px', width: {thisWidth}, display:'inline-block'}}>
                <CircularProgressbarWithChildren
                    value={percentage}
                    // text={`달성률 ${percentage}%`}
                    background='1'
                    backgroundPadding='3'
                    styles={buildStyles({
                        backgroundColor: thisColor,
                        strokeLinecap: "butt",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                        })}
                >
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black' }}>
                        {this.props.title}
                        <br/>
                        달성률 {percentage}%
                    </div>
                </CircularProgressbarWithChildren>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users,
    attendance: state.attendance,
});

export default connect(
    mapStateToProps,
)(AchieveGraph);