import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from 'moti';
import { useState } from "react";
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const { startOAuthFlow: startGoogle } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startApple } = useOAuth({ strategy: "oauth_apple" });

  const handleSignIn = async (provider: "google" | "apple") => {
    try {
      const { createdSessionId, setActive } =
        provider === "google" ? await startGoogle() : await startApple();

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace("/");
      } else {
        Alert.alert("Error", "OAuth flow failed");
      }
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", "Something went wrong during sign in");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <MotiView
          from={{ rotate: '0deg' }}
          animate={{ rotate: '360deg' }}
          transition={{ type: 'timing', duration: 1500 }}
        >
          <Image
            source={require('../assets/images/logo.png')}
            resizeMode="contain"
            style={styles.imagelogo}
          />
        </MotiView>
        <Text style={styles.logotext}>Where every chat matters.</Text>
      </View>
      {/* Welcome text sliding in */}
      <MotiText
        from={{ translateX: -200, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 12 }}
        style={styles.welcome}
      >
        Welcome!
      </MotiText>

      {/* Sign in card */}
      <View style={styles.login}>
        <Text style={styles.signintext}>Sign in to Convo</Text>
        <Text style={styles.signcontinue}>Please sign in to continue</Text>

        {/* Google login */}
        <TouchableOpacity style={styles.googlelogincontainer} onPress={() => handleSignIn("google")}>
          <Image source={require('../assets/images/google.png')} resizeMode='contain' style={styles.googlelogo} />
          <Text style={styles.continueText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.line}>
          <View style={styles.divider} />
          <Text style={{ marginHorizontal: 10 }}>or</Text>
          <View style={styles.divider} />
        </View>

        {/* Apple login */}
        <TouchableOpacity style={styles.applelogincontainer} onPress={() => handleSignIn("apple")}>
          <Image source={require('../assets/images/apple.png')} resizeMode='contain' style={styles.googlelogo} />
          <Text style={styles.appleText}>Sign in with Apple</Text>
        </TouchableOpacity>

        {/* Terms of Service */}
        <View style={styles.bottom}>
          <Text style={{ marginTop: 20, marginRight: 5 }}>By continuing you agree to our</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{ fontWeight: 'bold', marginTop: 20, textDecorationLine: 'underline' }}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Terms of Service Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Convo - Terms of Service</Text>
            <ScrollView style={{ marginVertical: 10 }}>
              <Text style={styles.modalText}>
                Welcome to Convo! By using our messaging app, you agree to the following terms:
                {"\n\n"}1. **Use of Service**: Convo is a secure chat platform designed for personal and group communication. You agree not to misuse the service for spam, illegal activities, or harassment.
                {"\n\n"}2. **Privacy**: We respect your privacy. Your messages are encrypted and we do not sell your data to third parties. However, standard usage data may be collected to improve our services.
                {"\n\n"}3. **Account Responsibility**: You are responsible for keeping your account secure. Sharing accounts is not allowed.
                {"\n\n"}4. **Content**: You agree not to share harmful, offensive, or unlawful content on Convo.
                {"\n\n"}5. **Termination**: We reserve the right to suspend accounts that violate these terms.
                {"\n\n"}By continuing to use Convo, you confirm that you have read and agree to these Terms.
              </Text>
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2B70F1' },
  logoContainer: { flex: 1, alignItems: 'center', marginTop: 60 },
  imagelogo: { width: 100, height: 100, borderRadius: 90 },
  logotext: { marginTop: 10, fontWeight: 'bold', color: 'white', fontSize: 20 },
  welcome: { paddingLeft: 20, fontSize: 32, color: 'white', marginBottom: 20 },
  login: {
    borderRadius: 45, height: '50%', width: '100%', alignSelf: 'center',
    elevation: 16, shadowRadius: 16, shadowColor: "black", shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 8 }, backgroundColor: 'white'
  },
  signintext: { alignSelf: 'center', marginTop: 40, fontWeight: 'bold', fontSize: 22, marginBottom: 10 },
  signcontinue: { alignSelf: 'center', color: 'gray', marginBottom: 10 },
  googlelogo: { width: 32, marginRight: 10 },
  googlelogincontainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 20, height: 45, width: '80%', alignSelf: 'center', borderRadius: 10,
    elevation: 8, shadowRadius: 8, shadowColor: "black", shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 }, backgroundColor: 'white', marginBottom: 20
  },
  continueText: { fontWeight: '600' },
  line: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center' },
  divider: { height: 1, backgroundColor: 'gray', width: 150 },
  appleText: { fontWeight: '600', color: 'white' },
  applelogincontainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 20, height: 45, width: '80%', alignSelf: 'center', borderRadius: 10,
    elevation: 8, shadowRadius: 8, shadowColor: "black", shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 }, backgroundColor: 'black', marginBottom: 30
  },
  bottom: { marginTop: 80, justifyContent: 'center', flexDirection: 'row', flex: 1 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'
  },
  modalView: {
    width: '85%', backgroundColor: 'white', borderRadius: 20, padding: 20,
    elevation: 10, maxHeight: '80%'
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  modalText: { fontSize: 14, color: '#333', lineHeight: 22 },
  closeButton: {
    backgroundColor: '#2B70F1', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 15
  }
});
