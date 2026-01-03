import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

function CustomDrawer(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="Trips"
        onPress={() => props.navigation.navigate("Trips")}
      />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate("Settings")}
      />
    </DrawerContentScrollView>
  );
}

<Drawer.Navigator
  drawerContent={(props) => <CustomDrawer {...props} />}
></Drawer.Navigator>;
