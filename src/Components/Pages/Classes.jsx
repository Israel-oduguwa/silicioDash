
// #32FF99 
// #08905B

import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {Helmet} from "react-helmet";
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import firebase from 'firebase';
import { db, auth } from "../../Service/firebase";

import Payment from "../Payment";
const useStyles = makeStyles((theme) => ({
  media: {
    height: 157,
    // paddingTop: '56.25%', 16:9
  },
  cardText:{
  	fontWeight:600,
  },
  sub:{
  	fontWeight:400,
  },
}));
 
export default function Classes() {
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
		{
		 course:"Data Science",
		 icon:"https://firebasestorage.googleapis.com/v0/b/silicio-c7dc1.appspot.com/o/data%20science.jpg?alt=media&token=f053df6e-12ec-41f1-b2d5-3019e7af27d7",
		 Description:"Data Science involves analysis of data, visualizing and making prediction of analytical data using artificial intelligence, data mining, machine learning and models with the instrumentality of Python, SQL, ETL ,to mention a few."
		}, 
		{
		 course:"UI/Ux Design",
		 icon:"https://firebasestorage.googleapis.com/v0/b/silicio-c7dc1.appspot.com/o/Ui%20ux.jpeg?alt=media&token=5349fb23-236b-4478-880c-97484ac71d2f",
		 Description:"UI design means ‘user interface design’ while UX design means ‘user experience design.’ These designs are for computers, mobile devices and other electronic devices which are focused on maximizing usability and user experience.Software: Figma or Adobe XD"
		}, 
		{
		 course:"Graphic Design",
		 icon:"https://firebasestorage.googleapis.com/v0/b/silicio-c7dc1.appspot.com/o/Graphic%20design.jpg?alt=media&token=f946d9c4-d229-44ec-82b0-a3a207023345",
		 Description:"Graphic design is the profession and academic discipline whose activity includes projecting visual communications intended to transmit specific messages to social groups with specific objectives."
		}, 
		{
		 course:"Animation Graphics",
		 icon:"https://firebasestorage.googleapis.com/v0/b/silicio-c7dc1.appspot.com/o/Animation%20Graphics.jpg?alt=media&token=9d1101c8-54ec-4cec-a278-2e1bdf96d47a",
		 Description:"Graphic animation is a variation of stop-motion consisting of the animation of photographs (as a whole or in parts) and other non-drawn flat visual graphic materials such as newspapers and magazine clippings."
		}, 
		{
		 course:"Brand Identity Design",
		 icon:"https://firebasestorage.googleapis.com/v0/b/silicio-c7dc1.appspot.com/o/Brand%20Identity.jpg?alt=media&token=2fbb9f4a-e122-4d93-b8cd-50e8ed28c037",
		 Description:"A brand identity designer uses strategy to create the visual elements of a brand. These elements include: logo, color palette, typography, image style, and general look and feel."
		}, 
	]
	const currentUser = false
	const classes = useStyles();
  
	return (
		<div>
		<Helmet>
			<title>
				Silicio | Classes
			</title>
		</Helmet>
			<div className="row">
				<div className="col-md-12 mt-4">
					<Typography variant="h6" className={classes.cardText} color="secondary" gutterBottom>
						 Choose a course to register 
					</Typography>
			<div className="div">
				<div className="row">
					{
						courses.map((c,index) =>(
							<div key={index} className="col-md-4 mb-4 mt-3">
								<Payment course={c.course}>
									<Card style={{boxShadow:"rgb(149 157 165 / 20%) 0px 8px 24px", borderRadius:"10px"}} >
										<CardActionArea>
											<CardMedia
										        className={classes.media}
										        image={c.icon}
										        title="Paella dish"
										      />
										      <CardContent>
										      	<Typography color="primary" className={classes.cardText}  gutterBottom variant="body2">
										      		{c.course}
										      	</Typography>
										      	<Typography variant="caption" className={classes.sub}>
										      		{c.Description}
										      	</Typography>
										      </CardContent>
										</CardActionArea>
								</Card>
								</Payment>
							</div>
						))
					}
				</div>
			</div>
				</div>
			</div>	
		</div>
	)
}