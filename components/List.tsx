import { FC } from "react";
import { useState, useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Platform } from "react-native";
import { useGigs } from "../hooks/useGigs";
import GigsByDay from "./GigsByDay";
import GigsByWeek from "./GigsByWeek";
import { listProps } from "../routes/homeStack";
import { getGigsToday, getGigsThisWeek } from "../util/helperFunctions";
import { format } from "date-fns";

type ListScreenNavigationProp = listProps["navigation"];

interface Props {
  navigation: ListScreenNavigationProp;
}

const ListByDay: FC<Props> = ({ navigation }): JSX.Element => {
  const [showWeek, setShowByWeek] = useState<boolean>(false);
  const currentDateMs: number = Date.now();
  const gigs = useGigs();

  const gigsToday = getGigsToday(gigs, currentDateMs);
  const gigsThisWeek = getGigsThisWeek(gigs, currentDateMs);

  const formattedDay = format(new Date(currentDateMs),'EEEE')
  const formattedWeek = format(new Date(currentDateMs),'LLLL do Y')


  const gigsToRender = showWeek ? (
    <GigsByWeek gigsThisWeek_grouped={gigsThisWeek} navigation={navigation} />
  ) : (
    <GigsByDay navigation={navigation} gigsFromSelectedDate={gigsToday} />
  );

  const showDate = !showWeek ? (
    <View testID="gigMapHeader" style={styles.headerText}>
      <Text style={styles.headerText_main}>{formattedDay}</Text>
      <Text style={styles.headerText_sub}>{formattedWeek}</Text>
    </View>
  ) : (
      null
  );


  return (
    <View style={{ flex: 1 }}>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setShowByWeek(false)}
          style={!showWeek ? styles.touchable : styles.selected}
        >
          <Text style = {!showWeek ? styles.buttonText : styles.buttonTextSelected}>Gigs Today</Text>  
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => setShowByWeek(true)}
          style={showWeek ? styles.touchable : styles.selected}
        >
        <Text style = {showWeek ? styles.buttonText : styles.buttonTextSelected}>Gigs this Week</Text>
        </TouchableOpacity>
      </View>

      {showDate}

      <View style = {styles.listContainer}>
        {gigsToRender}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gigCard: {
    marginBottom: 5,
    padding: 12,
    width: "85%",
  },
  header: {
    padding: 10,
  },
  buttonContainer: {
    marginLeft:'7%',
    marginTop:'5%',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginBottom:'10%'
  },
  touchable: {
    padding: 8,
    backgroundColor:'#377D8A',
    borderRadius:8,
    marginRight:'20%'

  },
  selected: {
    padding: 8,
    backgroundColor:'#F7F6F5',
    borderRadius:8,
    marginRight:'20%',
  },
  buttonText: {
  fontFamily: "NunitoSans",
  color:'#FFFFFF',
  textAlign:'center',
  lineHeight: 21.82
  },
  buttonTextSelected: {
    fontFamily: "NunitoSans",
    color:'#377D8A',
    textAlign:'center',
    lineHeight: 21.82
  },
  headerText: {
    color: "black",
    fontSize: 25,
    marginTop: '0%',
    marginLeft: '7%',
    fontFamily: "NunitoSans",
    marginBottom: 10,
  },
  headerText_main: {
    fontFamily: "NunitoSans",
    fontSize:25,
    lineHeight:34.1
  },
  headerText_sub: {
    fontFamily:'LatoRegular',
    size:14,
    lineHeight:16.8
  },
  gigCard_header: {
    fontFamily: "Sofia-Pro",
    fontSize: 17,
  },
  gigCard_details: {
    fontFamily: "Helvetica-Neue",
    color: "#778899",
    flexShrink: 1,
  },
  date: {
    paddingLeft: 10,
    fontFamily: "Sofia-Pro",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  gigCard_items: {
    flexDirection: "row",
    alignItems: "center",
  },
  gigCard_items_img: {
    height: 30,
    width: 30,
  },
  listContainer: {
    marginTop: 20
  },
});

export default ListByDay;
