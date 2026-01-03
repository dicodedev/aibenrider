import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const options = [
  {
    heading: "Acceptance of Terms",
    text: `This Agreement constitutes a legal agreement between you and [Your Company Name] (the "Company") and governs your use of the Company's services. By accessing or using the services, you acknowledge that you have read, understood, and agree to be bound by these Terms.`,
  },
  {
    heading: "Changes to Terms",
    text: `The Company reserves the right, at its sole  discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.`,
  },
  {
    heading: "Privacy Policy",
    text: `Your use of the Service is also subject to our Privacy Policy, which is incorporated into these Terms by this reference. Please review our Privacy Policy, which also governs the Service and informs users of our data collection practices.`,
  },
  {
    heading: "User Accounts",
    text: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.`,
  },
  {
    heading: "Intellectual Property",
    text: `The Service and its original content, features, and functionality are and will remain the exclusive property of [Your Company Name] and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Your Country] and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of [Your Company Name].`,
  },
  {
    heading: "Limitation of Liability",
    text: `In no event shall [Your Company Name], nor its  directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.`,
  },
  {
    heading: "Governing Law",
    text: `These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`,
  },
  {
    heading: "Contact Us",
    text: `If you have any questions about these Terms, please contact us at support@[yourcompanyname].com.`,
  },
];

export default function TermsComponent() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 15,
        }}
        edges={["left", "right", "top"]}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          {/* NAV */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => router.back()}
              hitSlop={40}
              style={{
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml xml={arrowLeft()} width={21} height={16} />
            </Pressable>
            <Text
              style={{
                fontFamily: "HostGroteskBold",
                fontSize: 24,
              }}
            >
              Terms & Condition
            </Text>
            <Pressable
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
                backgroundColor: "#FFF7ED",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {}}
            >
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V10C2 6.229 2 4.343 3.172 3.172C4.344 2.001 6.239 2 10.03 2C10.636 2 11.121 2 11.53 2.017C11.5167 2.097 11.51 2.17833 11.51 2.261L11.5 5.095C11.5 6.192 11.5 7.162 11.605 7.943C11.719 8.79 11.98 9.637 12.672 10.329C13.362 11.019 14.21 11.281 15.057 11.395C15.838 11.5 16.808 11.5 17.905 11.5H21.957C22 12.034 22 12.69 22 13.563V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22Z"
                  fill="black"
                />
                <Path
                  d="M19.352 7.61699L15.392 4.05399C14.265 3.03899 13.702 2.53099 13.009 2.26599L13 4.99999C13 7.35699 13 8.53599 13.732 9.26799C14.464 9.99999 15.643 9.99999 18 9.99999H21.58C21.218 9.29599 20.568 8.71199 19.352 7.61699Z"
                  fill="black"
                />
              </Svg>
            </Pressable>
          </View>

          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 10,
              marginTop: 30,
              paddingTop: 20,
              marginBottom: 40,
            }}
          >
            <Text
              style={{
                fontFamily: "HostGrotesk",
                fontSize: 12,
                color: "#7E7E7E",
                marginBottom: 6,
                paddingHorizontal: 12,
                textAlign: "center",
              }}
            >
              Last Updated: October 26, 2023
            </Text>
            <Text
              style={{
                fontFamily: "HostGrotesk",
                fontSize: 13,
                color: "#2A2A2A",
                marginBottom: 6,
                paddingHorizontal: 12,
                lineHeight: 20,
                marginTop: 10,
              }}
            >
              Welcome to Our Service! By using our website or services, you
              agree to comply with and be bound by the following terms and
              conditions of use, which together with our privacy policy govern
              [Your Company Name]'s relationship with you in relation to this
              website. If you disagree with any part of these terms and
              conditions, please do not use our website.
            </Text>
            {options.map((item, key) => (
              <View
                key={key}
                style={[
                  {
                    paddingVertical: 13,
                    paddingHorizontal: 12,
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 16,
                    color: "rgba(42, 42, 42, 1)",
                    fontStyle: "italic",
                  }}
                >
                  {key + 1}. {item.heading}
                </Text>
                <Text
                  style={{
                    fontFamily: "HostGrotesk",
                    fontSize: 13,
                    color: "#2A2A2A",
                    marginBottom: 6,
                    lineHeight: 20,
                    marginTop: 10,
                  }}
                >
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const Delete = ({
  visible,
  setVisible,
  done,
  setDone,
}: {
  visible: boolean;
  setVisible: any;
  done: boolean;
  setDone: any;
}) => {
  const [text, setText] = useState("");
  return (
    <Modal
      animationType="fade" // "none" | "slide" | "fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {done ? <SuccessModal /> : <DeleteModal setDone={setDone} />}
      </View>
    </Modal>
  );
};

const DeleteModal = ({ setDone }) => {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "70%",
        borderRadius: 30,
        padding: 30,
        gap: 30,
        alignItems: "center",
      }}
    >
      <Svg width="78" height="78" viewBox="0 0 78 78" fill="none">
        <Circle
          opacity="0.6"
          cx="38.8433"
          cy="38.8433"
          r="38.8433"
          fill="#FF7979"
        />
        <Circle
          opacity="0.6"
          cx="38.8431"
          cy="38.8432"
          r="31.7161"
          fill="#FF7979"
        />
        <Circle cx="38.8428" cy="38.8433" r="24.5889" fill="#FF7979" />
        <Path
          d="M35.0262 28.5594C35.2207 28.1038 35.6205 27.8196 36.0563 27.8196H40.3931C40.829 27.8196 41.2288 28.1038 41.4233 28.5594L41.6827 29.157H45.1406C45.7781 29.157 46.2932 29.7547 46.2932 30.4945C46.2932 31.2343 45.7781 31.832 45.1406 31.832H31.3089C30.6713 31.832 30.1562 31.2343 30.1562 30.4945C30.1562 29.7547 30.6713 29.157 31.3089 29.157H34.7668L35.0262 28.5594ZM31.3089 33.1694H45.1406V46.5441C45.1406 48.0195 44.1068 49.219 42.8353 49.219H33.6142C32.3427 49.219 31.3089 48.0195 31.3089 46.5441V33.1694ZM34.7668 35.8444C34.4498 35.8444 34.1905 36.1453 34.1905 36.5131V45.8754C34.1905 46.2432 34.4498 46.5441 34.7668 46.5441C35.0838 46.5441 35.3431 46.2432 35.3431 45.8754V36.5131C35.3431 36.1453 35.0838 35.8444 34.7668 35.8444ZM38.2247 35.8444C37.9078 35.8444 37.6484 36.1453 37.6484 36.5131V45.8754C37.6484 46.2432 37.9078 46.5441 38.2247 46.5441C38.5417 46.5441 38.8011 46.2432 38.8011 45.8754V36.5131C38.8011 36.1453 38.5417 35.8444 38.2247 35.8444ZM41.6827 35.8444C41.3657 35.8444 41.1063 36.1453 41.1063 36.5131V45.8754C41.1063 46.2432 41.3657 46.5441 41.6827 46.5441C41.9996 46.5441 42.259 46.2432 42.259 45.8754V36.5131C42.259 36.1453 41.9996 35.8444 41.6827 35.8444Z"
          fill="#A40000"
        />
      </Svg>
      <View>
        <Text
          style={{
            color: "#000000",
            fontFamily: "HostGroteskBold",
            fontSize: 18,
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          Delete Address
        </Text>
        <Text
          style={{
            color: "#000000",
            fontFamily: "HostGroteskBold",
            fontSize: 12,
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          You are about to delete your home address. Do you want to proceed?
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          gap: 20,
          width: "100%",
        }}
      >
        <Pressable
          onPress={() => setVisible(false)}
          style={{
            width: "100%",
            backgroundColor: "#F5F5F5",
            paddingVertical: 18,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 12,
            }}
          >
            CANCEL
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setDone(true)}
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 18,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 12,
            }}
          >
            DELETE
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const SuccessModal = () => {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "70%",
        borderRadius: 30,
        padding: 30,
        gap: 30,
        alignItems: "center",
      }}
    >
      <Svg width="103" height="103" viewBox="0 0 103 103" fill="none">
        <Circle cx="51.5" cy="51.5" r="51.5" fill="#E6F5E0" />
        <Path
          d="M31.3679 48.1029L41.6165 65.4476L76.0661 41.7638"
          stroke="#229D27"
          stroke-width="5.42609"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>

      <Text
        style={{
          color: "#000000",
          fontFamily: "HostGroteskBold",
          fontSize: 24,
          marginBottom: 3,
          textAlign: "center",
        }}
      >
        Successfully Deleted
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "HostGrotesk",
  },
  input: {
    backgroundColor: "rgba(237, 237, 237, 1)",
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "rgba(227, 227, 227, 1)",
    marginTop: 8,
    fontFamily: "HostGrotesk",
  },
});
