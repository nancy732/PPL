import React from 'react'
import Cookies from 'js-cookie'
class Comments extends React.Component{
    render()
    {
        return(
            <div >
               
                    
                <div className="list_image">
                    <div className="image_sec"><img src="/images/post_img.png" /></div>
                    <div className="image_name">{this.props.mailResponse}</div>
                </div>
                <div className="list_info">
                        {this.props.res}
                </div>
            </div>
        )
    }
}
export default Comments

    
                     
                    
                    
                    
                    