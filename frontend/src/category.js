import React from 'react'
import axios from 'axios'
import Onload from './onload posts'

class Category extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={    
            click:false,
            check:false,
            data:'',
            postArray:[],
            buttonCategory:''
        }
    }
    componentDidMount=()=>
    {
        this.props.handleClicks(true);
        axios.get('http://localhost:8081/onload')
        .then((data)=>{
            console.log("onload",data.data)
            this.setState({postArray:data.data})
          })
          .catch(err=>console.log(err));     
    }
     

    createPost=()=>{
      console.log("createpost");
      const res = this.state.postArray
      if(this.state.buttonCategory === '')
      {
      const result = res.map((res)=>
            { 
              return(
                <div >
                <Onload res = {res}/>
                </div>
            )
          });   

          return result
        }
        else{
          const result = res.filter(res =>
            {
             return res.category == this.state.buttonCategory
              
            })
            const results = result.map((res)=>
            { 
              return(
              <div >
                <Onload res = {res}/>
              </div>
              )
 
          });   

          return results
      
        }
    }

    buttoncategory=(e)=>
    {
      this.setState({
        buttonCategory:e.target.name
      })
    }

    handleUploadClick=(e)=>
    {
        this.setState({
            click:e
        })
    }
    handleUploadCheck=(e,data)=>
    {
        this.setState({
            check:e,
            data:data
        })
    }

    
    render(){
      
      return (
        <div>
          <meta charSet="utf-8" />
          <title>Home</title>
          <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
          <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div onClick={this.handleUploadClick}  className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a>Upload Post</a> </div>
                <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a onClick={this.buttoncategory} name="">Categories</a> </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                  <div className="rght_list">
                    <ul>
                      <li><a   onClick={this.buttoncategory} name="Cats"><span className="list_icon"><img src="images/icon_01.png" alt="up" /></span> Cats</a></li>
                      <li><a  onClick={this.buttoncategory}  name="Dogs"><span className="list_icon"><img src="images/icon_02.png" alt="up"  /></span> Dogs</a></li>
                      <li><a  onClick={this.buttoncategory} name="Birds" ><span className="list_icon"><img src="images/icon_03.png" alt="up"  /></span> Birds</a></li>
                      <li><a  onClick={this.buttoncategory} name="Rabbits"><span className="list_icon"><img src="images/icon_04.png" alt="up"  /></span> Rabbit</a></li>
                      <li><a  onClick={this.buttoncategory} name="Others"><span className="list_icon"><img src="images/icon_05.png" alt="up"  /></span> Others</a></li>
                    </ul>
                  </div>
                </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                  <div className="sub_dwn">
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Cats</div>
                      </div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Dogs</div>
                      </div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Rabbits</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
            <div className="clear" />
          </div>
        </div>
      );
    }
  };
  export default Category