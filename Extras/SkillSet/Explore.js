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
import CategoryIcon from "../../Components/SkillSet/CategoryIcon";

const AnimatablePressable = Animatable.createAnimatableComponent(Pressable);

const { width, height } = Dimensions.get("window");

const startingDotAnimation = {
  0: { scale: 1, opacity: 0.3 },
  1: { scale: 20, opacity: 1 },
};

const Topics = [
  "recomended",
  "camera",
  "painting",
  "sports",
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
    categories: ["recomended", "camera"],
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
    categories: ["recomended", "camera"],
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
    categories: ["recomended", "painting"],
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
  {
    id: "eb4f18c6-22dd-4727-a110-33f22506b1f8",
    title: "Senior Mobility Executive",
    coverImage: "https://picsum.photos/640/480/?random=4",
    creators: [
      {
        name: "Caterina Kunde",
        avatarUrl: "https://picsum.photos/640/640/?random=4",
      },
      {
        name: "Oral Hayes",
        avatarUrl: "https://picsum.photos/640/640/?random=7",
      },
    ],
    categories: ["recomended", "painting"],
  },
  {
    id: "adb77fff-483c-4e75-b230-79a79b5fd21f",
    title: "Legacy Division Specialist",
    coverImage: "https://picsum.photos/640/480/?random=5",
    creators: [
      {
        name: "Sven Reynolds",
        avatarUrl: "https://picsum.photos/640/640/?random=2",
      },
    ],
    categories: ["painting", "camera"],
  },
  {
    id: "c60e1d13-a39b-408c-9740-619cbb04da39",
    title: "Dynamic Markets Producer",
    coverImage: "https://picsum.photos/640/480/?random=6",
    creators: [
      {
        name: "Orie Stehr",
        avatarUrl: "https://picsum.photos/640/640/?random=4",
      },
    ],
    categories: ["sports", "recomended"],
  },
  {
    id: "c3d043ee-066d-4f7d-a6e1-7f72d7821077",
    title: "Future Functionality Agent",
    coverImage: "https://picsum.photos/640/480/?random=7",
    creators: [
      {
        name: "Cletus O'Hara",
        avatarUrl: "https://picsum.photos/640/640/?random=7",
      },
      {
        name: "Randi Buckridge",
        avatarUrl: "https://picsum.photos/640/640/?random=8",
      },
    ],
    categories: ["recomended", "camera"],
  },
  {
    id: "eef4c276-be25-4daa-99b7-c9d910b628d1",
    title: "Legacy Assurance Coordinator",
    coverImage: "https://picsum.photos/640/480/?random=8",
    creators: [
      {
        name: "Conrad Carter",
        avatarUrl: "https://picsum.photos/640/640/?random=8",
      },
    ],
    categories: ["facts", "sports"],
  },
  {
    id: "6519af0a-88dc-4d39-b762-457918ebc948",
    title: "Product Marketing Engineer",
    coverImage: "https://picsum.photos/640/480/?random=9",
    creators: [
      {
        name: "Janae Renner",
        avatarUrl: "https://picsum.photos/640/640/?random=9",
      },
      {
        name: "Darrell Paucek",
        avatarUrl: "https://picsum.photos/640/640/?random=9",
      },
    ],
    categories: ["crafts", "facts"],
  },
  {
    id: "ead208a0-949a-4e81-b8a5-9a57b5f0aef0",
    title: "Principal Mobility Planner",
    coverImage: "https://picsum.photos/640/480/?random=10",
    creators: [
      {
        name: "Emiliano Sanford",
        avatarUrl: "https://picsum.photos/640/640/?random=10",
      },
      {
        name: "Blair Jerde",
        avatarUrl: "https://picsum.photos/640/640/?random=11",
      },
    ],
    categories: ["painting", "facts"],
  },
  {
    id: "f1c5ab3d-c987-4015-be96-0218291dfacf",
    title: "District Integration Assistant",
    coverImage: "https://picsum.photos/640/480/?random=11",
    creators: [
      {
        name: "Marcus Mueller",
        avatarUrl: "https://picsum.photos/640/640/?random=11",
      },
      {
        name: "Roslyn Stracke",
        avatarUrl: "https://picsum.photos/640/640/?random=51",
      },
    ],
    categories: ["sports", "crafts"],
  },
  {
    id: "8fa09b7b-047a-4479-bb46-ecc394ae1551",
    title: "Investor Integration Consultant",
    coverImage: "https://picsum.photos/640/480/?random=12",
    creators: [
      {
        name: "Otho Leannon",
        avatarUrl: "https://picsum.photos/640/640/?random=12",
      },
      {
        name: "Orie Trantow",
        avatarUrl: "https://picsum.photos/640/640/?random=52",
      },
    ],
    categories: ["crafts", "painting"],
  },
  {
    id: "748dcec9-d735-4a4b-877d-5f0cd8388e08",
    title: "Product Research Strategist",
    coverImage: "https://picsum.photos/640/480/?random=13",
    creators: [
      {
        name: "Ebony Brakus",
        avatarUrl: "https://picsum.photos/640/640/?random=13",
      },
    ],
    categories: ["painting", "facts"],
  },
  {
    id: "2b4ea381-9720-43f1-930b-4e176f0bb06c",
    title: "Product Interactions Analyst",
    coverImage: "https://picsum.photos/640/480/?random=14",
    creators: [
      {
        name: "Jeremie Keebler",
        avatarUrl: "https://picsum.photos/640/640/?random=14",
      },
      {
        name: "Joel Kuvalis",
        avatarUrl: "https://picsum.photos/640/640/?random=54",
      },
    ],
    categories: ["sports", "crafts"],
  },
  {
    id: "2792c4d6-3603-46ba-a611-2ae09d5c2d59",
    title: "Lead Creative Analyst",
    coverImage: "https://picsum.photos/640/480/?random=15",
    creators: [
      {
        name: "Darrell Schimmel",
        avatarUrl: "https://picsum.photos/640/640/?random=15",
      },
    ],
    categories: ["crafts", "painting"],
  },
  {
    id: "7eb7af58-8cc6-44eb-8afd-67cecd09a600",
    title: "Internal Solutions Coordinator",
    coverImage: "https://picsum.photos/640/480/?random=16",
    creators: [
      {
        name: "Manuel Gutkowski",
        avatarUrl: "https://picsum.photos/640/640/?random=16",
      },
    ],
    categories: ["crafts", "sports"],
  },
  {
    id: "e969a98b-364e-403e-89d2-e9313383d157",
    title: "Senior Branding Engineer",
    coverImage: "https://picsum.photos/640/480/?random=17",
    creators: [
      {
        name: "Nestor Bernhard",
        avatarUrl: "https://picsum.photos/640/640/?random=17",
      },
    ],
    categories: ["crafts", "painting"],
  },
  {
    id: "8c4d2e27-65d4-4401-81c8-5e23d7fef47c",
    title: "Senior Optimization Agent",
    coverImage: "https://picsum.photos/640/480/?random=18",
    creators: [
      {
        name: "Maurine Wiegand",
        avatarUrl: "https://picsum.photos/640/640/?random=18",
      },
      {
        name: "Jerrell Swaniawski",
        avatarUrl: "https://picsum.photos/640/640/?random=58",
      },
    ],
    categories: ["facts", "recomended"],
  },
  {
    id: "689716d1-c6ed-40d8-9248-67fac73c765b",
    title: "Internal Program Planner",
    coverImage: "https://picsum.photos/640/480/?random=19",
    creators: [
      {
        name: "Larue Reichert",
        avatarUrl: "https://picsum.photos/640/640/?random=19",
      },
    ],
    categories: ["painting", "recomended"],
  },
  {
    id: "08056eee-86ba-4d9d-8afc-77faa96a4c5e",
    title: "Regional Accounts Producer",
    coverImage: "https://picsum.photos/640/480/?random=20",
    creators: [
      {
        name: "Genesis Schumm",
        avatarUrl: "https://picsum.photos/640/640/?random=20",
      },
    ],
    categories: ["painting", "facts"],
  },
  {
    id: "c475bec8-2dbb-4449-a118-2a8c14ce9b6e",
    title: "International Communications Developer",
    coverImage: "https://picsum.photos/640/480/?random=21",
    creators: [
      {
        name: "Stephanie White",
        avatarUrl: "https://picsum.photos/640/640/?random=21",
      },
      {
        name: "Tanner Torp",
        avatarUrl: "https://picsum.photos/640/640/?random=41",
      },
    ],
    categories: ["crafts", "facts"],
  },
  {
    id: "0b723bfa-2c3b-45d7-98bd-7a1edb78368f",
    title: "District Communications Liason",
    coverImage: "https://picsum.photos/640/480/?random=22",
    creators: [
      {
        name: "Vivienne Strosin",
        avatarUrl: "https://picsum.photos/640/640/?random=22",
      },
    ],
    categories: ["sports", "crafts"],
  },
  {
    id: "0d49a199-9081-4a99-9265-7783602390f7",
    title: "Chief Accounts Assistant",
    coverImage: "https://picsum.photos/640/480/?random=23",
    creators: [
      {
        name: "Germaine Nikolaus",
        avatarUrl: "https://picsum.photos/640/640/?random=23",
      },
      {
        name: "Sherman Moen",
        avatarUrl: "https://picsum.photos/640/640/?random=43",
      },
    ],
    categories: ["facts", "sports"],
  },
];

const Explore = ({ navigation }) => {
  const [currentTopic, setCurrentTopic] = useState(Topics[0]);
  const [currentList, setCurrentList] = useState(tempData);

  useEffect(() => {
    const list = [];
    for (let i = 0; i < tempData.length; i++) {
      const card = tempData[i];
      if (card.categories.includes(currentTopic)) {
        list.push(card);
      }
    }
    setCurrentList(list);
  }, [currentTopic]);

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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        </ScrollView>
      </View>
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {currentList.map((cardinfo, index) => {
          return (
            <AnimatablePressable
              animation="fadeIn"
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
                <Text
                  style={styles.cardHeading}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                >
                  {cardinfo.title}
                </Text>
                <Pressable style={styles.cardOptionCont}>
                  <Feather name="more-horizontal" color="white" size={20} />
                </Pressable>
              </View>
              <View style={styles.cardFooterCont}>
                <View style={styles.cardCategoriesCont}>
                  {cardinfo.categories.map((category, index) => (
                    <Pressable style={styles.cardCategoryCont} key={index}>
                      <CategoryIcon
                        category={category}
                        size={20}
                        color="white"
                      />
                    </Pressable>
                  ))}
                </View>
                <View style={styles.cardByCont}>
                  <Text style={styles.cardBy}>By:</Text>
                  <Text
                    style={styles.cardByLine}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                  >
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
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "white",
    padding: 5,
    borderRadius: 30,
    overflow: "hidden",
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
    marginVertical: 10,
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
    height: 40,
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
    height: 40,
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
    marginRight: 4,
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
