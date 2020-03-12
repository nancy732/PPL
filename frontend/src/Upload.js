import React from 'react'

class Upload extends React.Component{
    
    render(){
        return(
                <div >
                <div className="contnt_2">
                  <div className="div_a">
                    <div className="div_title">{this.props.data.PostName}</div>
                    <div className="btm_rgt">
                    <div className="btm_arc">{this.props.data.category}</div>
                    </div>
                    <div className="div_top">
                      <div className="div_top_lft"><img src="images/img_6.png" />{this.props.data.email}</div>
                      <div className="div_top_rgt"><span className="span_date">{new Date(this.props.data.date).toLocaleDateString()}</span><span className="span_time">{new Date(this.props.data.date).toLocaleTimeString()}</span></div>
                    </div>
                    <div className="div_image"><img src={`http://localhost:8081/profile/${this.props.data.fileName}`}  alt="pet" /></div>
                    <div className="div_btm">
                      <div className="btm_list">
                        <ul>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>0 Comments</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Likes</a></li>
                          <div className="like_count" style={{marginRight: '10px'}}><span className="lft_cnt" /><span className="mid_cnt">0</span><span className="rit_cnt" /></div>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Unlike</a></li>
                          <div className="like_count"><span className="lft_cnt" /><span className="mid_cnt">0</span><span className="rit_cnt" /></div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                               
                </div>
        )
    }
}
export default Upload