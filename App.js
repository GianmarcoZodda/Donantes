import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { AuthProvider } from "./context/AuthContext";
import PerfilScreen from "./screens/PerfilScreen";
import DonarScreen from "./screens/DonarScreen";
import { CentroProvider } from "./context/CentroContext";
import AddCentroScreen from "./screens/centroScreens/AddCentroScreen";
import IndexCentroScreen from "./screens/centroScreens/IndexCentroScreen";
import DetailsCentroScreen from "./screens/centroScreens/DetailsCentroScreen";
import EditCentroScreen from "./screens/centroScreens/EditCentroScreen";
import DeleteCentroScreen from "./screens/centroScreens/DeleteCentroScreen";
import { UserProvider } from "./context/UserContext";
import { TurnoProvider } from "./context/TurnoContext";
//import NewsScreen from './screens/NewsScreen';

const Stack = createStackNavigator();

//existe para hacer mas prolijo el app
//screen options le saca el header
function CentroStack() {
  return (
    <Stack.Navigator initialRouteName="IndexCentro" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddCentro" component={AddCentroScreen} />
      <Stack.Screen name="IndexCentro" component={IndexCentroScreen} />
      <Stack.Screen name="DetailsCentro" component={DetailsCentroScreen} />
      <Stack.Screen name="EditCentro" component={EditCentroScreen} />
      <Stack.Screen name="DeleteCentro" component={DeleteCentroScreen} />
    </Stack.Navigator>
  );
}

//headershown false oculta el texto superior que aparece en la pantalla
export default function App() {
  return (
    <AuthProvider>
      <CentroProvider>
        <UserProvider>
          <TurnoProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Donar" component={DonarScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={PerfilScreen} />
              <Stack.Screen name="CentroStack" component={CentroStack}/>
            </Stack.Navigator>
          </NavigationContainer>
          </TurnoProvider>
        </UserProvider>
      </CentroProvider>
    </AuthProvider>
  );
}
