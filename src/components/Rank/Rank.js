import React from "react";


const Rank = ({name, entries}) => {
    return(
       <div>
            <div >
                <div className='white f3'> 
                    {`Hello, ${name} the current entry count is:`}
                </div>
            </div>
            <div >
                <div className='white f3'> 
                    {entries}
                </div>
            </div>
        </div>
    );

}

export default Rank;