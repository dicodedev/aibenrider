import { emailOrange } from "@/icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const products = [
  require("@/assets/images/landing/Shoe.png"),
  require("@/assets/images/landing/Bag.png"),
  require("@/assets/images/landing/Jug.png"),
  require("@/assets/images/landing/Banana.png"),
  require("@/assets/images/landing/Orange.png"),
  require("@/assets/images/landing/Nike.png"),
];

export default function Index() {
  const app = useSelector((state: any) => state.app);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 10,
      }}
      edges={["left", "right", "top"]}
    >
      <View
        style={{
          paddingTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 29,
            fontFamily: "HostGroteskBold",
            textAlign: "center",
          }}
        >
          Customer Support
        </Text>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: 40,
            borderRadius: 10,
          }}
        >
          <Card
            icon={
              <Svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                <Path
                  d="M9.67578 7.87499V7.42499V7.87499ZM13.2758 7.87499V7.42499V7.87499ZM6.07578 7.87499V7.42499V7.87499ZM1.99338 13.1202C0.675781 12.0663 0.675781 11.2689 0.675781 7.87499C0.675781 4.48109 0.675781 2.78369 1.99338 1.72979C3.31278 0.674988 5.43318 0.674988 9.67578 0.674988C13.9184 0.674988 16.0397 0.674988 17.3573 1.72979C18.6758 2.78369 18.6758 4.48109 18.6758 7.87499C18.6758 11.2689 18.6758 12.0663 17.3573 13.1202C16.0406 14.175 13.9184 14.175 9.67578 14.175C7.41678 14.175 6.25578 15.7392 4.27578 16.875V13.9842C3.29118 13.8375 2.56668 13.5792 1.99338 13.1202Z"
                  fill="#FFE9CE"
                />
                <Path
                  d="M9.67578 7.87499V7.42499M13.2758 7.87499V7.42499M6.07578 7.87499V7.42499M1.99338 13.1202C0.675781 12.0663 0.675781 11.2689 0.675781 7.87499C0.675781 4.48109 0.675781 2.78369 1.99338 1.72979C3.31278 0.674988 5.43318 0.674988 9.67578 0.674988C13.9184 0.674988 16.0397 0.674988 17.3573 1.72979C18.6758 2.78369 18.6758 4.48109 18.6758 7.87499C18.6758 11.2689 18.6758 12.0663 17.3573 13.1202C16.0406 14.175 13.9184 14.175 9.67578 14.175C7.41678 14.175 6.25578 15.7392 4.27578 16.875V13.9842C3.29118 13.8375 2.56668 13.5792 1.99338 13.1202Z"
                  stroke="#D88814"
                  stroke-width="1.35"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            }
            heading="Leave us a message"
            subHeading="We usually reply in 2-5 minutes"
            link="/account/support/message"
          />
          <View
            style={{
              height: 1,
              backgroundColor: "#E7E7E7",
            }}
          ></View>
          <Card
            icon={
              <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                <Path
                  d="M3.71484 0C4.11241 0 4.47947 0.152618 4.68359 0.435547C4.90067 0.735698 7.00148 3.92244 7.23242 4.28711C7.47834 4.67373 7.4437 5.24714 7.14062 5.82129C6.98059 6.12592 6.45535 7.05046 6.19727 7.50293C6.47901 7.90378 7.20319 8.84829 8.66992 10.3145C10.1459 11.7919 11.0827 12.5101 11.4814 12.79C11.9341 12.5314 12.8584 12.0048 13.1641 11.8438C13.4774 11.6788 13.7989 11.5948 14.0889 11.5947C14.3137 11.5947 14.521 11.6453 14.6904 11.749C15.0807 11.9875 18.253 14.097 18.543 14.3008C19.0196 14.6351 19.2106 15.4582 18.6875 16.2061C18.6682 16.2333 16.6724 18.986 15.5371 18.9863H15.5098C12.2673 18.8826 8.47109 15.7435 5.85645 13.1279C3.24183 10.5123 0.103996 6.71692 0.000976562 3.4873C-0.036056 2.33752 2.75242 0.315748 2.78027 0.295898C3.06877 0.0951067 3.40118 2.41463e-05 3.71484 0ZM3.71484 1.18555C3.62685 1.18555 3.53249 1.21582 3.45605 1.26855C2.42481 2.01431 1.33793 3.08766 1.1875 3.50684C1.2906 5.72192 3.24305 8.83752 6.69434 12.29C10.1458 15.7421 13.2648 17.6953 15.4873 17.7998C15.905 17.6442 16.973 16.5567 17.7246 15.5156C17.814 15.387 17.8215 15.2837 17.8135 15.2363C17.3248 14.9012 14.5593 13.0658 14.1045 12.7803C14.1004 12.7797 14.0948 12.7793 14.0889 12.7793C14.0515 12.7793 13.9151 12.7876 13.7158 12.8926C13.467 13.0232 12.7024 13.4567 12.0693 13.8184L11.416 14.1914L10.7998 13.7598C10.3439 13.4392 9.35233 12.6742 7.83105 11.1523C6.31645 9.63741 5.54985 8.64227 5.22754 8.18457L4.79492 7.56934L5.16797 6.91602C5.64683 6.07675 5.98352 5.47664 6.0918 5.27051C6.19323 5.07771 6.21107 4.94222 6.20996 4.88867C5.88534 4.3825 4.09759 1.6748 3.76367 1.18945C3.75096 1.18709 3.73428 1.18556 3.71484 1.18555Z"
                  fill="#D88814"
                />
              </Svg>
            }
            heading="Call us"
            subHeading="We are available Mon-Fri, 24/7"
            link="/account/support/call"
          />
        </View>

        <View
          style={{
            marginTop: 60,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Outfit",
              marginBottom: 3,
              color: "#8C8C8C",
            }}
          >
            Other Options
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <Card
            link="mailto:support@aibenmart.com"
            icon={<SvgXml xml={emailOrange()} width={22} height={19} />}
            heading="Email us"
            subHeading="We are available Mon-Fri, 24/7"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const Card = ({ icon, heading, subHeading, link }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(link)}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
    >
      <View style={{ flexDirection: "row", gap: 20 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: "100%",
            backgroundColor: "#FFE9CE",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "OutfitBold",
              marginBottom: 3,
            }}
          >
            {heading}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Outfit",
              color: "#8C8C8C",
            }}
          >
            {subHeading}
          </Text>
        </View>
      </View>

      <Svg width="12" height="24" viewBox="0 0 12 24" fill="none">
        <Path
          d="M1.99886 6.98081L3.05986 5.92081L8.83886 11.6978C8.93202 11.7904 9.00595 11.9005 9.05639 12.0217C9.10684 12.143 9.13281 12.273 9.13281 12.4043C9.13281 12.5356 9.10684 12.6657 9.05639 12.7869C9.00595 12.9082 8.93202 13.0182 8.83886 13.1108L3.05986 18.8908L1.99986 17.8308L7.42386 12.4058L1.99886 6.98081Z"
          fill="black"
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0E0E0E",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 45,
    width: 45,
  },
  banner: {
    height: 114,
    width: "100%",
  },
  sectionTabText: {
    color: "#B0B0B0",
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "MontserratItalic",
  },
  btn: {
    backgroundColor: "#08A9D2",
    borderRadius: 5,
    paddingTop: 10,
    paddingHorizontal: 10,
    height: 40,
    fontFamily: "Montserrat",
    marginHorizontal: 20,
  },
  categoryView: {
    borderBottomColor: "#B0B0B0",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
});
