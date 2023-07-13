import { FC, useContext, useState, useEffect,useRef } from "react";
import { View, Text, StyleSheet,TouchableOpacity,FlatList, Platform } from 'react-native';
import { AuthContext } from "../AuthContext";
import { useGetUser } from "../hooks/useGetUser";
import { useGigs } from "../hooks/useGigs";
import GigCard from "../components/GigCard";
import { profileProps } from "../routes/homeStack";


type ProfileScreenNavigationProp = profileProps["navigation"];

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const Profile:FC<Props> = ({ navigation }) => {

  const { user } = useContext(AuthContext);
  const userDetails = useGetUser(user?.uid);
  const { firstName, lastName, email } = userDetails || {};

  const gigs = useGigs();
  const gigIDs = userDetails?.likedGigs;
  const savedGigs = gigs.filter((gig) => gigIDs?.includes(gig.id));

  const gigList = (
    <FlatList
    testID='gigs-today'
    data={savedGigs}
    keyExtractor={item => item.id}
    contentContainerStyle={{ paddingBottom: 140 }}
    renderItem={({ item }) => (
      <TouchableOpacity
        testID="gigs-today-card"
        style={styles.gigCard}
        onPress={() =>
          navigation.navigate('GigDetails', {
            venue: item.venue,
            gigName: item.gigName,
            blurb: item.blurb,
            isFree: item.isFree,
            image: item.image,
            genre: item.genre,
            dateAndTime: {...item.dateAndTime},
            tickets: item.tickets,
            ticketPrice: item.ticketPrice,
            address: item.address,
            links: item.links,
            gigName_subHeader:item.gigName_subHeader,
            id:item.id
          })
        }>

        <GigCard item = {item}/>

      </TouchableOpacity>
    )}
  />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{`${firstName} ${lastName}`}</Text>
      <Text style={styles.header}>Saved gigs</Text>
      {gigIDs?.length === 0 ? <Text style={{marginLeft:'7%',fontFamily:'NunitoSans'}}>You haven't saved any gigs yet!</Text> : gigList}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#FFFFFF',
  },
  username: {
    color: "black",
    fontSize: 25,
    marginLeft: '7%',
    fontFamily: "NunitoSans",
    marginBottom: 16,
  },
  header: {
    color: "black",
    fontSize: 18,
    marginLeft: '7%',
    fontFamily: "NunitoSans",
    marginBottom: 16
  },
  gigCard: {
    marginLeft:'7%',
    marginRight:'7%',
    backgroundColor:'#FAF7F2',
    height:'auto',
    marginBottom:16,
    padding:'3%',
    borderRadius:10,
    ...Platform.select({
      ios:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android:{
       elevation: 4,       
      }
    })
  },
});

export default Profile;
