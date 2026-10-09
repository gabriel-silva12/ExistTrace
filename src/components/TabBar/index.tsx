import { useRouter } from "expo-router";
import { Alert, Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";
import { Propiedades } from "./types";

const TabBar = ({ activeTab = "home" }: Propiedades) => {
  const router = useRouter();

  return (
    <View style={styles.tabBar}>
      <Pressable
        style={styles.tabItem}
        onPress={() => router.replace("/dashboard")}
      >
        {activeTab === "home" && (
          <View style={styles.tabActiveIndicator} />
        )}

        <MaterialCommunityIcons
          name="home"
          size={32}
          color="#ffffff"
        />
      </Pressable>

      <Pressable
        style={styles.tabItem}
        onPress={() => router.replace("/pacientes")}
      >
        {activeTab === "pacientes" && (
          <View style={styles.tabActiveIndicator} />
        )}

        <MaterialCommunityIcons
          name="account-outline"
          size={32}
          color="#ffffff"
        />
      </Pressable>

      <Pressable
        style={styles.tabItem}
        onPress={() =>
          Alert.alert(
            "Em breve",
            "Tela de configurações ainda não disponível."
          )
        }
      >
        {activeTab === "configuracoes" && (
          <View style={styles.tabActiveIndicator} />
        )}

        <MaterialCommunityIcons
          name="cog-outline"
          size={32}
          color="#ffffff"
        />
      </Pressable>
    </View>
  );
};

export default TabBar;