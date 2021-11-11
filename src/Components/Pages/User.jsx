import React from 'react'
// import { useAuth } from "../../Context/AuthContext"
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import CircularProgress from '@material-ui/core/CircularProgress';
import CardActionArea from '@material-ui/core/CardActionArea';
import {Helmet} from "react-helmet";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  media: {
    height: 157,
    // paddingTop: '56.25%', 16:9
  },
  cardText:{
  	fontWeight:600,

  },
  head:{
  	color:"white",
  	// fontWeight:600,
  },
  sub:{
  	fontWeight:400,
  },
  fw6:{
  	fontWeight:600,
  }
}));

const User = () => {
	const classes = useStyles();
	const user = useSelector((state) => state);
	const courses = [
		{
		 course:"Mobile Application Development",
		 icon:"https://firebasestorage.googleapis.com/v0/b/silicio-c7dc1.appspot.com/o/mobile%20development.jpg?alt=media&token=ce27b235-5914-46e3-bcc8-16963fb011f0",
		 Description:"Mobile App Development is the act or process by which a mobile app is developed for mobile devices such as Personal Digital Assistants(PDAs), Enterprise Digital Assistants(EDAs) or mobile phones. Softwares: GIT, Android Studio, Visual Studio Code, Android/IOS emulator/devices "
		},
		{
		 course:"Front End Development",
		 icon:"https://firebasestorage.googleapis.com/v0/b/silicio-c7dc1.appspot.com/o/frontend.png?alt=media&token=fcb4b718-2693-4a11-b7fd-c8653291d332",
		 Description:"A front-end developer ‘architects’ and develops websites and applications using website technologies (i.e., HTML, CSS, DOM, and JavaScript ).Front-end web is the part the user sees."
		}, 
		{
		 course:"Back End Development",
		 icon:"https://firebasestorage.googleapis.com/v0/b/silicio-c7dc1.appspot.com/o/Back%20end%20design.jpg?alt=media&token=6b056b4c-39dc-4d57-89ee-7d2d13d2aa3f",
		 Description:"Back-End Web Development lays the foundational code that enables websites, Web Applications, and Mobile Applications to run. Back-end web development is all of the behind-the-scene digital operations that it takes to keep the front end of a website running such as the coding style and plugins."
		}, 
		// {
		//  course:"Data Science",
		//  icon:"http://demo.foxthemes.net/courseplus-v4.3.1/assets/images/courses/img-5.jpg",
		//  Description:"A brand identity designer uses strategy to create the visual elements of a brand. These elements include: logo, color palette, typography, image style, and general look and feel."
		// }, 
		
	]
	// const {currentUser, userData} = useAuth()
	// const {course, date, email, fullName, subscribed} = userData
	return (
		<div className="contaihner mt-4">
			{
				!user.auth.loading ?
				<>
					{
						user.auth.errors && !user.auth.details ?
						<>{
							user.auth.errors.code === "unavailable" ?
							<div className="row text-center mb-4 mt-4">
								<Typography variant="h4">Network Not Available, Please Check your interet Connection and refresh your Browser </Typography>
							</div>:
							<Typography>Error SomeWhere, try Reloading the Page</Typography>
						}</>:
						<>
							<div className="row">
							<Helmet>
                <title>Silicio | {user.auth.details.firstName} {user.auth.details.lastName} </title>
                
            </Helmet>
								<div className="col-md-8 mb-3 mt-4">
									<div className="row">
										<Card style={{boxShadow:"rgb(149 157 165 / 20%) 0px 8px 24px", borderRadius:"15px"}} color="background.papers">
											<Box style={{padding:'50px 40px 30px 20px'}}>
												<div className="row">
												
													<div className="col-md-6">
														<Box>
															<div className="row">
																<div className="col-md-12">
																	<Typography className={classes.fw6} gutterBottom color="secondary" variant="h4">
															Hi, Welcome back, {user.auth.details.firstName} {user.auth.details.lastName}
														</Typography>
																</div>
															</div>
														</Box>
														<Typography gutterBottom  className="mb-3" color="secondary"   variant="body2">
															{user.auth.details.subscribed ? `Thanks for registering for the ${user.auth.details.course} course`: 'register for a course now, click to check the course you want to register for'}
														</Typography>
														{
															!user.auth.details.subscribed ?
															<Link to="classes/"><Button variant="contained" disableElevation color="primary">Check Courses Now</Button></Link>:<></>
														}
													</div>	
													<div className="col-md-6">
														<img src="https://image.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg"  width="100%" alt="..." />
													</div>
												
												</div>
											</Box>
										</Card>
										
									</div>
								</div>
								<div className="col-md-4 mt-4">
									<Card style={{boxShadow:"rgb(149 157 165 / 20%) 0px 8px 24px", borderRadius:"15px"}} >
										<div className="row" style={{padding:'50px 10px 30px 20px'}}>
											<div className="col-md-12">
												<Typography gutterBottom variant="body1" className={classes.fw6} color="primary">Class starts on</Typography>
												<Typography gutterBottom color="secondary" variant="h3">Nov 22, 2021 </Typography>
											</div>
										</div>
									</Card>
								</div>
								<div className="col-md-12 mt-4">
									<div className="paymentStatus">
										{
											user.auth.details.subscribed ?
											<>
												<div className="space mt-4">
													<Helmet>
                <title>Silicio | {user.auth.details.firstName} {user.auth.details.lastName} </title>
                
            </Helmet>
													<Typography className={classes.fw6} variant="body1" color="secondary" gutterBottom>
														You have registerd for the {user.auth.details.course}  class
													</Typography>
																										<Link to="classes/">
														<Button variant="contained" className=" mb-4 mt-2" color="primary">Change course Here</Button>
													</Link>
												</div>
											</>
											:
											<>
												<div className="courses-list">
												<div className="row">
												<div className="col-md-12 mb-3 mt3">
													<Typography color="secondary" className={classes.fw6} variant="h6">
														Feautured Courses
													</Typography>
												</div>
															{
															courses.map((c, index) =>{
																return(
																	<div key={index} className="col-md-4 mb-4 mt-3">
														<Link to="classes/">
															<Card style={{boxShadow:"rgb(149 157 165 / 20%) 0px 8px 24px", borderRadius:"10px"}} >
														<CardActionArea>
															<CardMedia
														        className={classes.media}
														        image={c.icon}
														        title="Paella dish"
														      />
														      <CardContent>
														      	<Typography color="secondary" className={classes.cardText}  gutterBottom variant="body2">
														      		{c.course}
														      	</Typography>
														      	<Typography variant="subtitle2" className={classes.sub} >
														      		{c.Description}
														      	</Typography>
														      </CardContent>
														</CardActionArea>
														</Card>
														</Link>
													</div>
																	)
															})
														}	
													<div className="col-md-4">
														<Link to="classes/">
														<Button variant="outlined" color="primary" className=" mb-4">See more courses</Button>
													</Link>
													</div>
											</div>
											</div>
											</>
										}
									</div>
								</div>
							</div>
						</>
					}
				</>
				:
				<div className="row mt-4" style={{marginTop:"20vh"}} >
					<div className="col-md-12 text-center">
						<CircularProgress size={60} />
					</div>
				</div>
			}
		</div>
	)
}

export default User