import React from 'react'
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Label, Legend} from 'recharts'


const DataVis = (props) => {
    return (
        <div className="container-fluid" style={{wordWrap: "break-word"}}>
        {/* create responsive container which adjust the whole chart to current media */}
        <ResponsiveContainer  minHeight="750px">
            
            {/* setting margin and chartype */}
            <AreaChart
                data={props.compList}
                margin={{top: 50, right: 20, left: 20, bottom: 50}}
            >

            <XAxis  dataKey="name" 
                    type="category" 
                    textAnchor="end"
                    scaleToFit={true}
                    height={120}
                    width={20}
                    angle={-75}
                    interval={0}
                    minTickGap={10}
                    wrap={true}
                    tickFormatter={val => val.replace(/ \((.*)/g,"")}
            />

            <YAxis tickLine={false} type="number" domain={[0, 600]} > 
                <Label value="Overall Power" offset={-5} position="insideLeft" angle="-90" />
            </YAxis>

            {/* change the order of data set*/}
            <Tooltip itemSorter={() => -1} />
            <Legend align="center" verticalAlign="top" iconType="circle" height={40} iconSize={10} />

            {/* plt dataset */}
            <Area type="monotone" dataKey="intelligence" stackId="1" connectNulls={true} stroke="#41bebc" fill="#41bebc" />
            <Area type="monotone" dataKey="strength"     stackId="1" connectNulls={true} stroke="#3884d8" fill="#3884d8" />
            <Area type="monotone" dataKey="speed"        stackId="1" connectNulls={true} stroke="#d9b026" fill="#d9b026" />
            <Area type="monotone" dataKey="durability"   stackId="1" connectNulls={true} stroke="#5ba45b" fill="#5ba45b" />
            <Area type="monotone" dataKey="power"        stackId="1" connectNulls={true} stroke="#dd2a22" fill="#dd2a22" />
            <Area type="monotone" dataKey="combat"       stackId="1" connectNulls={true} stroke="#873ec1" fill="#873ec1" />
            </AreaChart>
            
        </ResponsiveContainer>
        </div>
    ) 
}
  
export default DataVis