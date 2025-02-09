 import { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { A } from "@expo/html-elements";
import { gigDetailsProps } from "../routes/homeStack";
import { format } from "date-fns";


type GigDetailsScreenProp = gigDetailsProps['route']

interface Props {
  route:GigDetailsScreenProp
}

const GigDetails: FC<Props> = ({ route }): JSX.Element => {
  const { venue, gigName, image, isFree, genre, address, links, gigName_subHeader, blurb, dateAndTime, tickets, ticketPrice } =
    route.params;


  const free = isFree ? "|  Free Entry" : "";

  const isTicketed = tickets ? (
    <View style = {{borderRadius:26}}>
          <A style={styles.link} href={tickets}> 
      Find Tickets
    </A>
    </View>

  ) : null;

  const isTicketPrice = !isFree ? (
    <View style={styles.text_icon}>
    <Entypo  name="ticket" size={15} color="#778899" />
    <Text style={styles.details_text}> ${ticketPrice}</Text>
  </View>
  ) : (
    <View style={styles.text_icon}>
    <Entypo  name="ticket" size={15} color="#778899" />
    <Text style={styles.details_text}> Free Entry</Text>
  </View>
  )


  const date: string = format(
    new Date(dateAndTime.seconds * 1000),
    "EEE LLL do Y"
  );


  const eventLinks = links?.map((link:string, i:number) => {
    return (
      <A key ={i} href = {link} style = {styles.links}>
        <Text  style={styles.details_text}>{link}</Text>
      </A>
    )
  })

  const linksElement = links ? (
    <View style={styles.details}>
    <Text style={styles.details_blurb}>Links</Text>
    {eventLinks}
  </View>
  ) : null

  const subHeader = gigName_subHeader ? (
    <Text style={{padding:0,margin:0,fontFamily:'LatoRegular', fontSize:18,paddingBottom:'5%'}}>{gigName_subHeader}</Text>
  ) : null

  const time: string = format(new Date(dateAndTime.seconds * 1000), "h:mm a");


  return (
    <View style={styles.screen}>
      <View style={styles.elipse_container}>
        <Image
          style={styles.elipse}
          source={require("../assets/Ellipse_29.png")}
        />
      </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <Image style={styles.img} source={{ uri: image }} />
          <View>
            <Text style={styles.header_text}>{gigName}</Text>
            {subHeader}

            <View style={styles.subheader}>

              <View style={styles.text_icon}>
                <Entypo
                  style={styles.icon}
                  name="location-pin"
                  size={15}
                  color="#778899"
                />
                <Text style={styles.details_text}>{`${venue}  |  ${address}`}</Text>
              </View>

              <View style={styles.text_icon}>
                <Ionicons
                  style={styles.icon}
                  name="time-outline"
                  size={15}
                  color="#778899"
                />
                <Text style={styles.details_text}>{`${date}  ${time}`}</Text>
              </View>

              {isTicketPrice}

            </View>

            <View style={styles.details}>
              <Text style={styles.details_blurb}>Event Details</Text>
              <Text style={styles.details_text}>{blurb}</Text>
            </View>

            {linksElement}

          <View>
            {isTicketed}
          </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    backgroundColor: '#F7F6F5',
    position: 'relative',
  },
  img: {
    height: 200,
    width: "auto",
    marginTop: 0,
    borderRadius:26
  },
  container: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: "azure",
    padding: 15,
  },
  scrollview: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    marginLeft:'2%',
    marginRight:'2%',
  },
  header_text: {
    fontSize: 25,
    fontFamily: "NunitoSans",
    marginTop:'5%'
  },
  details: {
    flexDirection: "column",
    marginTop: 30,
  },
  details_text: {
    fontFamily: "LatoRegular",
    fontSize: 14,
    color: "#000000",
  },
  details_links: {
    fontFamily: "LatoRegular",
    fontSize: 14,
    color: "#000000",
    marginBottom:'5%'
  },
  details_text_genre: {
    fontFamily: "LatoRegular",
    fontSize: 14,
    color: "#4B4B4B",
  },
  details_blurb: {
    fontFamily: "NunitoSans",
    fontSize: 20,
    color: "#000000",
    marginBottom:'2%'
  },
  text_icon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom:'2%'
  },
  subheader: {
    marginTop: 10,
  },
  icon: {
    marginRight: 2,
  },
  link: {
    backgroundColor: "#BB9456",
    color: "white",
    fontFamily: "NunitoSans",
    width: 120,
    textAlign: "center",
    marginTop: 20,
    borderRadius: 8,
    padding:8
  },
  links:{
    marginBottom:'2%'
  },
  linkText:{
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  elipse:{
   height:250,
   width:'100%'
  },
  elipse_container:{
    flexDirection:'row',
    justifyContent:'center',
    transform: [{translateY:-80}]
  }
});

export default GigDetails;
