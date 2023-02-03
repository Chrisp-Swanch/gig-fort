
import { FC } from "react";
import { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { mapStyle } from "../util/mapStyle";
import { useGigs } from "../hooks/useGigs";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";
import { mapProps } from "../routes/homeStack";

type MapScreenNavgationProp = mapProps['navigation']

interface Props {
    navigation: MapScreenNavgationProp
}

const GigMap:FC<Props> = ({ navigation }):JSX.Element => {
  const [selectedDateMs, setSelectedDateMs] = useState<number>(Date.now());
  const gigs = useGigs();

  //generates current date in format DD/MM/YYYY
  const selectedDateString:string = useMemo(() => {
    const formattedDate = format(new Date(selectedDateMs),'EEE LLL do Y')
    return formattedDate
  }, [selectedDateMs]);

  //Filtering through gigs to return only current day's gigs
  const gigsToday = gigs.filter((gig) => {
    const formattedGigDate = format(new Date(gig.dateAndTime.seconds * 1000), 'EEE LLL do Y')
    return formattedGigDate === selectedDateString;
  });
  

  //increments date by amount
  const addDays = (amount:number):void => {
    setSelectedDateMs((curr) => curr + 1000 * 60 * 60 * 24 * amount);
  };


  return (
    <View style={styles.container}>
      <Text testID="gigMapHeader" style={styles.headerText}>{`Gigs on ${selectedDateString}`}</Text>

      <View style={styles.imageText}>
        <Text style={styles.subHeader}>Tap on</Text>
        <Image
          style={styles.image}
          source={require("../assets/Icon_Gold_48x48.png")}
        />
        <Text style={styles.subHeader}> to see gig info</Text>
      </View>

      <MapView
        initialRegion={{
          latitude: -41.29416,
          longitude: 174.77782,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        style={styles.map}
        customMapStyle={mapStyle}
      >
        {gigsToday.map((gig, i) => {
          let venueName:string;
          if (gig.venue.length > 12) {
            venueName = `${gig.venue.substring(0, 12)}...`;
          } else {
            venueName = gig.venue;
          }
          return (
            <Marker
              style={{ flexDirection: "column"}}
              key={i}
              coordinate={{
                latitude: gig.location.latitude,
                longitude: gig.location.longitude,
              }}
              icon={require("../assets/Icon_Gold_48x48.png")}
              onPress={() => {
                navigation.navigate("GigDetails", {
                  venue: gig.venue,
                  gigName: gig.gigName,
                  image: gig.image,
                  blurb: gig.blurb,
                  isFree: gig.isFree,
                  genre: gig.genre,
                  dateAndTime: {...gig.dateAndTime},
                  tickets: gig.tickets,
                });
              }} 
            >
             <Text style = {{color:'white', marginTop:20, textShadowColor: 'black',textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>{venueName}</Text>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.buttonOptions}>
        <TouchableOpacity onPress={() => addDays(-1)} style={styles.touchable}>
          <AntDesign name="caretleft" size={36} color="#778899" />
          <Text style={{ fontFamily: "Helvetica-Neue", color: "#778899" }}>
            Previous day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addDays(1)} style={styles.touchable}>
          <AntDesign name="caretright" size={36} color="#778899" />
          <Text style={{ fontFamily: "Helvetica-Neue", color: "#778899" }}>
            Next day
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  map: {
    height: 450,
    width: "100%",
    margin: 10,
  },
  gigInfo: {
    // backgroundColor: '#68912b',
    // marginTop:20
  },
  gigInfo_text: {
    color: "white",
    fontFamily: "Helvetica-Neue",
    fontSize: 12,
    paddingTop: 22,
  },
  gigInfo_text_genre: {
    color: "white",
    fontFamily: "Helvetica-Neue",
    transform: [{ translateY: -5 }],
  },
  headerText: {
    color: "black",
    fontSize: 25,
    marginTop: 5,
    fontFamily: "Sofia-Pro",
    marginBottom: 10,
  },
  callout: {
    width: "auto",
    height: "auto",
    backgroundColor: "azure",
  },
  buttonOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "92%",
  },
  buttonOptionsText: {
    margin: 5,
  },
  image: {
    height: 20,
    width: 20,
    paddingBottom: 10,
    margin: 0,
  },
  imageText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    flexDirection: "column",
    alignItems: "center",
  },
  subHeader: {
    fontStyle: "italic",
    fontFamily: "Helvetica-Neue",
    color: "#778899",
  },
});

export default GigMap;
