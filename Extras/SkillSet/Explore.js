import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const AnimatablePressable = Animatable.createAnimatableComponent(Pressable);

const { width, height } = Dimensions.get("window");

const startingDotAnimation = {
  0: { scale: 1, opacity: 0.3 },
  1: { scale: 20, opacity: 1 },
};

const Topics = [
  "recomended",
  "sports",
  "learning",
  "facts",
  "crafts",
  "art",
  "boxing",
  "driving",
];

const tempData = [
  {
    id: 1,
    title: "Photo Editing",
    coverImage:
      "https://images.unsplash.com/photo-1520594621440-776be874fba2?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw3MjAxN3wwfDF8c2VhcmNofDJ8fGxhcHRvcCUyMHdpdGglMjBjYW1lcmF8ZW58MHx8fHwxNjI1ODQwNzAz&ixlib=rb-1.2.1&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450",
    categories: ["codesandbox", "camera"],
    creators: [
      {
        name: "Petric Jane",
        avatarUrl:
          "https://ui-avatars.com/api/?background=random&name=PetricJane",
      },
    ],
  },
  {
    id: 2,
    title: "Personal photography",
    coverImage:
      "https://images.unsplash.com/photo-1625816615218-a026e9543bce?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw3MjAxN3wwfDF8YWxsfDM1fHx8fHx8Mnx8MTYyNTgzNzQ4MA&ixlib=rb-1.2.1&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450",
    categories: ["codesandbox", "camera"],
    creators: [
      {
        name: "Petric Jane",
        avatarUrl:
          "https://ui-avatars.com/api/?background=random&name=PetricJane",
      },
      {
        name: "Simon Gary",
        avatarUrl:
          "https://ui-avatars.com/api/?background=random&name=SimonGary",
      },
    ],
  },
  {
    id: 3,
    title: "Painting",
    coverImage:
      "https://images.unsplash.com/photo-1520420097861-e4959843b682?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw3MjAxN3wwfDF8c2VhcmNofDE1fHxwYWludGluZ3xlbnwwfHx8fDE2MjU4MzY1MDk&ixlib=rb-1.2.1&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450",
    categories: ["codesandbox", "edit-2"],
    creators: [
      {
        name: "Alice simson",
        avatarUrl:
          "https://ui-avatars.com/api/?background=random&name=alicesimson",
      },
      {
        name: "Albert norton",
        avatarUrl:
          "https://ui-avatars.com/api/?background=random&name=abertnorton",
      },
    ],
  },
];

const Explore = ({ navigation }) => {
  const [currentTopic, setCurrentTopic] = useState(Topics[0]);
  const [currentList, setCurrentList] = useState(tempData);
  return (
    <View style={styles.container}>
      <View style={styles.startingDotCont}>
        <Animatable.View
          animation={startingDotAnimation}
          durtion={500}
          useNativeDriver
          easing="ease-in-out"
          style={styles.startingDot}
        >
          <LinearGradient
            colors={["skyblue", "#97aEfB"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={[StyleSheet.absoluteFillObject]}
          ></LinearGradient>
        </Animatable.View>
      </View>
      <View style={styles.headingCont}>
        <AnimatablePressable
          animation="fadeIn"
          duration={500}
          delay={500}
          style={styles.backCont}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" color="white" size={24} />
        </AnimatablePressable>
        <Animatable.Text
          animation="fadeIn"
          duration={500}
          delay={700}
          style={styles.heading}
        >
          Explore skills
        </Animatable.Text>
      </View>
      <View style={styles.topicsCont}>
        {Topics.map((topic, index) => {
          return (
            <AnimatablePressable
              key={index}
              animation="fadeIn"
              duration={500}
              delay={1000 + index * 150}
              onPress={() => setCurrentTopic(topic)}
              style={[
                styles.topicCont,
                currentTopic === topic ? styles.activeTopicCont : {},
              ]}
            >
              <Text
                style={[
                  styles.topic,
                  currentTopic === topic ? styles.activeTopic : {},
                ]}
              >
                {topic}
              </Text>
            </AnimatablePressable>
          );
        })}
      </View>
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {currentList.map((cardinfo, index) => {
          return (
            <AnimatablePressable
              animation={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
              duration={750}
              easing="ease-in"
              delay={1500 + index * 200}
              style={styles.cardCont}
              key={index}
            >
              <Image
                source={{ uri: cardinfo.coverImage }}
                style={styles.cardImage}
              />
              <View style={styles.cardHeadingCont}>
                <Text style={styles.cardHeading}>{cardinfo.title}</Text>
                <Pressable style={styles.cardOptionCont}>
                  <Feather name="more-horizontal" color="white" size={20} />
                </Pressable>
              </View>
              <View style={styles.cardFooterCont}>
                <View style={styles.cardCategoriesCont}>
                  {cardinfo.categories.map((category, index) => (
                    <Pressable style={styles.cardCategoryCont} key={index}>
                      <Feather name={category} color="white" size={20} />
                    </Pressable>
                  ))}
                </View>
                <View style={styles.cardByCont}>
                  <Text style={styles.cardBy}>By:</Text>
                  <Text style={styles.cardByLine}>
                    {cardinfo.creators.map((creator, index) => {
                      if (index === cardinfo.creators.length - 1)
                        return creator.name;
                      return creator.name + " & ";
                    })}
                  </Text>
                </View>
                <View style={styles.cardAvatarsCont}>
                  {cardinfo.creators.map((creator, index) => (
                    <Pressable style={styles.cardAvatarCont} key={index}>
                      <Image
                        style={[styles.cardAvatar]}
                        source={{ uri: creator.avatarUrl }}
                      />
                    </Pressable>
                  ))}
                </View>
              </View>
            </AnimatablePressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: width,
    height: height,
  },
  startingDotCont: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  startingDot: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "skyblue",
    overflow: "hidden",
  },
  headingCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  backCont: {
    padding: 5,
  },
  heading: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontFamily: "SourceCodePro",
  },
  topicsCont: {
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 20,
  },
  topicCont: {
    padding: 5,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    borderRadius: 30,
    borderColor: "white",
    backgroundColor: "#fff9",
    marginHorizontal: 5,
  },
  topic: {
    color: "black",
    fontFamily: "RobotoAdded",
    textTransform: "capitalize",
  },
  activeTopicCont: {
    backgroundColor: "#0009",
  },
  activeTopic: {
    color: "white",
  },
  list: {
    alignItems: "center",
  },
  cardCont: {
    width: "90%",
    height: 180,
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
  },
  cardHeadingCont: {
    width: "100%",
    height: 45,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#0006",
  },
  cardHeading: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontFamily: "RobotoAdded",
    textTransform: "capitalize",
  },
  cardOptionCont: {
    padding: 5,
  },
  cardFooterCont: {
    width: "100%",
    height: 45,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#0006",
  },
  cardCategoriesCont: {
    flexDirection: "row",
  },
  cardCategoryCont: {
    padding: 5,
    paddingHorizontal: 3,
  },
  cardByCont: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10,
  },
  cardBy: {
    color: "white",
    fontFamily: "RobotoAdded",
    fontSize: 12,
  },
  cardByLine: {
    color: "white",
    fontFamily: "RobotoAdded",
    fontSize: 12,
    textTransform: "capitalize",
  },
  cardAvatarsCont: {
    flexDirection: "row",
  },
  cardAvatarCont: {
    width: 30,
    height: 30,
    margin: 1,
  },
  cardAvatar: {
    borderRadius: 30,
    width: "100%",
    height: "100%",
  },
});
