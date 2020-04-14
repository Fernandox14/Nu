import * as React from 'react';
import { Image, StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import logo from './src/logo.png';
import qr from './src/qr.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import All from './data.js';

export default function App() {


  let offset = 0;
  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );

  function onHandlerStateChange(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;
      offset += translationY;
     

      if (translationY >= 100) {
        opened = true;
    
      }else{
        translateY.setOffset(0);
        translateY.setValue(offset);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ?  450 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 450 : 0;
          translateY.setOffset(offset);
          translateY.setValue(0);
      }); 


    }
  }
  return (
    <View style={styles.container} >
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.welcome}>Fernando</Text>
        </View>
        <Icon name="keyboard-arrow-down" size={23} color="#FFF"></Icon>
      </View>
      <View style={styles.MenuVertical}>

        <Animated.ScrollView style={{ opacity: translateY.interpolate({ inputRange: [0, 150], outputRange: [0, 1], }) }}>
          <View style={styles.content}>
            <Image source={qr} style={styles.qr} />
            <Text style={{ marginTop: 15, color: "#FFF" }}>Banco <Text style={styles.bold}>284</Text> - Nu Pagamentos S.A.</Text>
            <Text style={styles.textTop}>Agência <Text style={styles.bold}>0000</Text></Text>
            <Text style={styles.textTop}>Conta <Text style={styles.bold}>000000-0</Text></Text>
          </View>
          <FlatList
            data={All.menuVertical}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Icon name={item.icon.toString()}  size={20} color="#FFF"></Icon>
                <View style={styles.positionElement}>
                  <Text style={{ color: "#FFF" }}>{item.text}</Text>
                  <Icon name="keyboard-arrow-right" size={20} color="#FFF"></Icon>
                </View>
              </View>
            )} keyExtractor = { (item, index) => index.toString() } />

          <TouchableOpacity style={styles.Button}>
            <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>Sair da Conta</Text>
          </TouchableOpacity>

        </Animated.ScrollView>

      </View>

      <Animated.View style={[styles.scrollView,
      {
        transform: [{
          translateY: translateY.interpolate({
            inputRange: [0, 450], outputRange: [0, 30], extrapolate: 'clamp',
          }),
        }]
      },
      {
        opacity: translateY.interpolate({
          inputRange: [0, 450], outputRange: [1, 0.1], extrapolate: 'clamp',
        })
      }]}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ paddingLeft: 10, paddingRight: 20 }}
          showsHorizontalScrollIndicator={false}>
          <FlatList horizontal={true}
            data={All.menuHorizontal}
            renderItem={({ item }) => (
              <View style={styles.Item}>
                <Icon name={item.icon.toString()} size={30} color="#FFF"></Icon>
                <Text style={{ color: "#FFF" }}>{item.text}</Text>
              </View>
            )} keyExtractor = { (item, index) => index.toString() } />
        </ScrollView>
      </Animated.View>

      <PanGestureHandler
        onGestureEvent={animatedEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[styles.card, {
          transform: [{
            translateY: translateY.interpolate({
              inputRange: [-350, 0, 450],
              outputRange: [-50, 0, 450],
              extrapolate: 'clamp',
            })
          }]
        }]}>
          <View style={styles.card_header}>
            <Icon name="attach-money" size={23} color="#000"></Icon>
            <Text style={{ textAlign: "left", fontSize: 16, width: 400 }}>Conta</Text>
            <Icon name="visibility" size={23} color="#000"></Icon>
          </View>
          <View style={styles.card_body}>
            <Text style={styles.saldo}>Saldo Disponivel</Text>
            <Text style={styles.price}>R$ 2.000,00</Text>
          </View>
          <View style={styles.card_footer}>
            <Icon name="credit-card" size={40} color="#000"></Icon>
            <Text style={{ marginLeft: 30, fontSize: 22 }}>Função débito ativada</Text>
            <Icon name="keyboard-arrow-right" size={25} color="#000"></Icon>
          </View>
        </Animated.View>
      </PanGestureHandler>


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A05BE',
    paddingTop: 15
  },
  content: {
    alignItems: 'center',
    marginBottom: 15
  },
  header: {
    flexDirection: "row",
    padding: 0,
  },
  logo: {
    height: 40,
    width: 80,
  },
  qr: {
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'left',
    color: '#FFF',
    marginTop: 7,
    fontWeight: "bold",
  },
  card: {
    left: 0,
    right: 0,
    top: 0,
    marginTop: 85,
    position: 'absolute',
    height: "62vh",
    margin: 15,
    backgroundColor: "#FFF",
    borderRadius: "4px",
  },
  card_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
  },
  card_body: {
    marginTop: 30,
    padding: 25,
    flex: 1
  },
  saldo: {
    fontSize: 18,
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
  },
  card_footer: {
    flexDirection: "row",
    padding: 25,
    backgroundColor: "#eee",
    borderRadius: 4,
    justifyContent: "flex-end",
  },
  Item: {
    height: 100,
    width: 100,
    backgroundColor: "#aa00ff",
    borderRadius: 3,
    marginLeft: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  scrollView: {
    marginTop: 20,
    marginHorizontal: 0,
    marginBottom: 0,
    justifyContent: "flex-end",
    //position: 'absolute', left: 0, right: 0, bottom: 0, top: "80vh"

  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderColor: "#FFF",
    marginLeft: 30,
    marginRight: 30,
  },
  positionElement: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    flex: 1
  },
  textTop: {
    marginTop: 5, color: "#FFF", alignItems: "center", textAlign: 'center',
  },
  Button: {
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10
  },
  MenuVertical: {
    height: "60vh",
  },
  bold: {
    fontWeight: "bold"
  }
});
