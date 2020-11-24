
import React, { Component } from 'react'

import DeleteJobPost from './DeleteJobPost'



//MUI 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import  Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReplyIcon from '@material-ui/icons/Message';
import MyButton from '../util/MyButton';


import  JobPostDetails  from './JobPostDetails';


const styles = {
    card:{
        display: 'flex',
        marginBottom: 20,

    },
    image:{
        minWidth:200,
    },
    content:{
        padding: 25,
        objectFit: 'cover'
    }
}







 class JobPost extends Component {

    
  

    render() {


      dayjs.extend(relativeTime)
    
 
        const { classes, jobPost : {createdAt,
            jobDescription,
            userImageUrl,
            jobId, jobTitle,username},
            user: {
                authenticated,
                credentials
            },
        } = this.props
           



            const deleteButton = authenticated && username === credentials.username ? (
                <DeleteJobPost jobPostId =
                {jobId}/>
            ) : null
     

        
        
        console.log("this is jobId in JobPost.js: " + jobId)

        return (

            
            <Card className={classes.card}>

                <CardMedia
                image={userImageUrl}
                title="Profile Image"
                className={classes.image}
                />

              <CardContent className={classes.content}>

        
              <Typography variant="h5" component={Link} to={`/users/${username}`} color="primary">
              {username}
              </Typography>

              {/* npm i dayjs */}
              <Typography variant="body2" color="textSecondary">
             
              {dayjs(createdAt).fromNow()}
              </Typography>

              <Typography variant="h5">
              {jobTitle} 
              </Typography>
            



              <Typography variant="body4" color="textSecondary" >
              {jobDescription}
              </Typography>
                 


<div></div>
 { deleteButton }
 <MyButton tip="Reply">
 <ReplyIcon/> 
 </MyButton>
 

<JobPostDetails jobId={jobId} username={username}/>



             </CardContent>
            </Card>
        
        )
    }
}

JobPost.propTypes = {
    user: PropTypes.object.isRequired,
    jobPost: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapActionsToProps = {
    DeleteJobPost,
    
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(JobPost));


