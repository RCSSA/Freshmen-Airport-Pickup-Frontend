import React, {useEffect, useState} from 'react'
import { Line } from 'rc-progress';

export default function ProgressBar(props) {
    const progresses = [3, 33, 69, 100]
    const [progressColors, setProgressColors] = useState(["blue", "grey", "grey", "grey"])

    useEffect(()=>{
        if (props.progress === 0){
            setProgressColors(["blue", "grey", "grey", "grey"])
        }
        else if (props.progress === 1) {
            setProgressColors(["blue", "blue", "grey", "grey"])
        }
        else if (props.progress === 2) {
            setProgressColors(["blue", "blue", "blue", "grey"])
        }
        else if (props.progress === 3) {
            setProgressColors(["blue", "blue", "blue", "blue"])
        }
    }, [props.progress])
    
  return (
    <div className='position-relative full-width'>
        <div className='d-flex justify-content-between align-items-end p-0 position-relative p-0 px-lg-4'>
            <div>等待审核</div>
            <div>审核完成，<br/>等待验证</div>
            <div>验证成功，<br/>等待匹配</div>
            <div>匹配成功</div>
        </div>
        <div className="full-width p-0 px-lg-5 mb-5 position-relative">
            <div className='position-relative full-width'>
                <Line percent={progresses[props.progress]} strokeWidth={0.5} strokeColor="#1976d2" trailWidth={0.5} className="position-relative"/>
            </div>
            
            <div className='d-flex justify-content-between progress-node-frame p-0 px-lg-5 mt-1'>
                <div className={"progress-node bg-light-" + progressColors[0]}></div>
                <div className={"progress-node bg-light-" + progressColors[1]}></div>
                <div className={"progress-node bg-light-" + progressColors[2]}></div>
                <div className={"progress-node bg-light-" + progressColors[3]}></div>
            </div>
        </div>
    </div>
    
  )
}
